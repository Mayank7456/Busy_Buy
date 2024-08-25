import Main from "./Components/Hero/Main";
import Navbar from "./Components/Nav/Navbar";
import SignUp from "./Pages/Auth/SignUp/SignUp";
import SignIn from "./Pages/Auth/SignIn/SignIn";
import OrderList from "./Pages/Orders/Order List/OrderList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./Pages/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./Pages/NotFound/NotFound";

function App() {

  const router = createBrowserRouter([
    {
      path: 'Busy_Buy', element: <Navbar />, errorElement: <NotFound/>, children: [
        {
          index: true, element: <Main />
        },
        {
          path: 'Auth/sign-up', element: <SignUp />
        },
        {
          path: 'Auth/sign-in', element: <SignIn />
        },
        {
          path: 'Cart', element: <PrivateRoute> <Cart /> </PrivateRoute> 
        },
        {
          path: 'my-orders/', element: <PrivateRoute> <OrderList /> </PrivateRoute> 
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
