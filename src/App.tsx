import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import MainPage from "./mycomponents/mainPage/MainPage";
import ErrorPage from "./mycomponents/errorPage/ErrorPage";
import { Toaster } from "./components/ui/toaster";
import AcceuilPage from "./mycomponents/acceuilPage/AcceuilPage";
import GroupeCards from "./mycomponents/groupeCards/GroupeCards";
import {
  CommunityDataType,
  GroupeDataType,
  requestTogetAllUniversalData,
} from "../seedAndGetData/seedData";
import MainPageCommunity from "./mycomponents/mainPage/MainPageCommunity";
import AcceuilPageCommunity from "./mycomponents/acceuilPage/AcceuilPageCommunity";
import LoginMother from "./Sign/login/LoginMother";
import Signup from "./Sign/signup/Signup";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "firebaseConfig";

/* interface mymy {
  path: string;
  element: JSX.Element;
} */

/* interface RouteData {
  path: string;
  element: JSX.Element;
  errorElement: JSX.Element;
  children: mymy[];
} */

/* const routeri = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AcceuilPage />,
      },
        {
        path: "/CARTE INTERACTIVE",
        element: <GroupeCards />,
      }, 
    ],
  },
]); */

export const context = createContext<User | null>(null);

const communityDeliverGroupe = (
  user: User,
  value: CommunityDataType,
  result: GroupeDataType[]
) => {
  const res = result.filter((val) => val.communityId === value.id);
  const principalRoute = {
    path: `/community/${value.title}`,
    element: <MainPage groupeData={res} value={value} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: `/community/${value.title}/`,
        element: <AcceuilPage groupeData={res} value={value} />,
      },
    ],
  };

  res.forEach((val) => {
    const newValue = {
      path: `/community/${value.title}/${val.titleGroupe}`,
      element: (
        <context.Provider value={user}>
          <LoginMother
            communityId={value.id as string}
            groupeId={val.id as string}
          >
            <GroupeCards groupeValue={val} />
          </LoginMother>
        </context.Provider>
      ),
    };
    principalRoute.children.push({ ...newValue });
  });

  return principalRoute;
};

function App() {
  //const [routes, setRoutes] = useState<RouteObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [routesTotal, setRoutesTotal] = useState<RouteObject[]>([]);
  const [loadingFail, setLoadingFail] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getGroupeData = async () => {
      try {
        const result = await requestTogetAllUniversalData<GroupeDataType>(
          "GroupeData"
        );
        const communityData =
          await requestTogetAllUniversalData<CommunityDataType>(
            "CommunityData"
          );

        const principalRouteCommunity = [
          {
            path: "/signup/:communityId/:groupeId",
            element: <Signup />,
          },
          {
            path: "/",
            element: (
              <context.Provider value={user as User}>
                <LoginMother>
                  <MainPageCommunity communityData={communityData} />
                </LoginMother>
              </context.Provider>
            ),
            errorElement: <ErrorPage />,
            children: [
              {
                path: "/",
                element: <AcceuilPageCommunity communityData={communityData} />,
              },
            ],
          },
        ];

        communityData.forEach((value) => {
          const newValue = {
            /* path: `/community/${value.title}`,
            element: <CommunityMainCards />, */
            ...communityDeliverGroupe(user as User, value, result),
          };
          principalRouteCommunity.push({ ...newValue });
        });

        setRoutesTotal(principalRouteCommunity);

        /*
         <context.Provider value={data}>
          <LoginMother>
        <GroupeCards groupeValue={val} />
        </LoginMother>
</context.Provider>
        
        const principalRoute: RouteData[] = [
          {
            path: "/",
            element: <MainPage groupeData={result} />,
            errorElement: <ErrorPage />,
            children: [
              {
                path: "/",
                element: <AcceuilPage groupeData={result} />,
              },
            ],
          },
        ]; */

        /*  result.forEach((value) => {
          const newValue = {
            path: `/${value.titleGroupe}`,
            element: <GroupeCards groupeValue={value} />,
          };
          principalRoute[0].children.push({ ...newValue });
        });
  
        setRoutes([...principalRoute]); */
        setLoading(false);
      } catch (error) {
        setLoadingFail(true);
      }
    };

    getGroupeData();
  }, []);

  if (loading && !loadingFail)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (loadingFail) {
    return (
      <div className="w-screen h-screen flex flex-col gap-1 items-center justify-center ">
        <p>
          Une erreur est survenue pendant le chargement ou problème de connexion
        </p>
        <p>Vérifier votre connexion</p>
      </div>
    );
  }

  const router = createBrowserRouter(routesTotal);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
