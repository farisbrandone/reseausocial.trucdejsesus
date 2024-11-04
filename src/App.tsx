import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./mycomponents/mainPage/MainPage";
import ErrorPage from "./mycomponents/errorPage/ErrorPage";
import { Toaster } from "./components/ui/toaster";
import AcceuilPage from "./mycomponents/acceuilPage/AcceuilPage";
import GroupeCards from "./mycomponents/groupeCards/GroupeCards";

const router = createBrowserRouter([
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
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
