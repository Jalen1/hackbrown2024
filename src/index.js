// index.js or index.jsx
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home'
import reportWebVitals from './reportWebVitals';
import CurrentLocation from './CurrentLocation'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "card",
    element: <App/>,
    children: [
      {
        index: true,
        element: <CurrentLocation />,
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router = {router} />
);
