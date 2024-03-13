import AuthWrapper from "./components/AuthWrapper";
import AppHome from "./layout/AppHome";
import Home from "./layout/Home";
import DetailedArticle from "./layout/DetailedArticle";
import NewPostPage from "./layout/NewPostPage";
import SettingPage from "./layout/SettingPage";
import SignUpPage from "./layout/SignUpPage";
import SignInPage from "./layout/SignInPage";
import UserPage from "./layout/UserPage";
import EditArticle from "./layout/EditArticle";
import NotFoundPage from "./layout/NotFoundPage";

const routers = [
  {
    path: "/",
    Component: AppHome,
    children: [
      {
        path: "/:current?",
        element: <Home />,
      },
      {
        path: "/tag/:nametag/:current?",
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignInPage />,
      },
      {
        path: "/register",
        element: <SignUpPage />,
      },
      {
        path: "/article/:slug",
        element: <DetailedArticle />,
      },
      {
        path: "/article/*",
        element: <NotFoundPage />,
      },
      {
        path: "/profile/:username/:choose?/:current?",
        element: <UserPage />,
      },
      {
        path: "/profile/*",
        element: <NotFoundPage />,
      },
      {
        path: "/",
        element: <AuthWrapper />,
        children: [
          {
            path: "/feed/:current?",
            element: <Home />,
          },
          {
            path: "/newpost",
            element: <NewPostPage />,
          },
          {
            path: "/editor/:slug",
            element: <EditArticle />,
          },
          {
            path: "/editor/*",
            element: <NotFoundPage />,
          },
          {
            path: "/settings",
            element: <SettingPage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

export default routers;
