import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "./mycomponents/mainPage/MainPage";
import ErrorPage from "./mycomponents/errorPage/ErrorPage";
import { Toaster } from "./components/ui/toaster";
import AcceuilPage from "./mycomponents/acceuilPage/AcceuilPage";
import GroupeCards from "./mycomponents/groupeCards/GroupeCards";
import { requestTogetAllGroupeData } from "../seedAndGetData/seedData";

interface mymy {
  path: string;
  element: JSX.Element;
}

interface RouteData {
  path: string;
  element: JSX.Element;
  errorElement: JSX.Element;
  children: mymy[];
}

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

function App() {
  const [routes, setRoutes] = useState<RouteObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getGroupeData = async () => {
      const result = await requestTogetAllGroupeData();
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
      ];

      result.forEach((value) => {
        const newValue = {
          path: `/${value.titleGroupe}`,
          element: (
            <GroupeCards groupeId={value.id} groupeName={value.titleGroupe} />
          ),
        };
        principalRoute[0].children.push({ ...newValue });
      });
      setRoutes([...principalRoute]);
      setLoading(false);
    };

    getGroupeData();
  }, []);

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
