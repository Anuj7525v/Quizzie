import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Analytics from "./Pages/Analytics/Analytics";
import QuestionWiseAnalysis from  "./Pages/QuestionWiseAnalysis/QuestionWiseAnalysis";
import PlayQuiz from "./Pages/PlayQuiz/PlayQuiz";
import PageNotFound from './Pages/NotFound/PageNotFound';
import Auth from "./Pages/Auth/Auth";

function App() {
  const userState = useSelector((state) => state.user);
  const currentUser = userState?.currentUser;

  const AuthLayout = () => (
    <div className="App">
      <Outlet />
    </div>
  );

  const HomeLayout = () => (
    <div className="App">
      <Outlet />
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <Auth isSignUp={false} />, // Show Login by default
        },
        {
          path: "login",
          element: <Auth isSignUp={false} />, // Login route
        },
        {
          path: "signup",
          element: <Auth isSignUp={true} />, // Signup route
        },
      ],
    },
    {
      path: "/home",
      element: currentUser ? <HomeLayout /> : <AuthLayout />,
      children: [
        {
          path: "", // This will match /home
          element: currentUser ? <Home /> : <Auth isSignUp={false} />, // Show Home if authenticated
        },
        {
          path: "dashboard", // Relative path
          element: <Dashboard />, // Dashboard route inside Home
        },
        {
          path: "analytics", // Relative path
          element: <Analytics />, // Analytics route inside Home
        },
      ],
    },
    {
      path: "/dashboard/analytics/questionwise/:quizId",
    //  element: currentUser ? <QuestionWiseAnalysis /> : <Auth isSignUp={false} />,
     element : <QuestionWiseAnalysis/>

  },
    {
      path: "/playquiz/:quizId",
      element: <PlayQuiz />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;


