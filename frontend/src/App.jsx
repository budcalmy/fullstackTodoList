
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login";
import Registration from "./routes/Registration";
import Home from "./routes/Home";

import { store } from "./redux/store";
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/reg',
    element: <Registration />
  },
  {
    path: '/:userId/home',
    element: <Home />
  }
])

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}