import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Home'
import Waiting from './waiting'
import Winner from './winner'
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
  },
  {
    path: 'waiting',
    element: <Waiting/>
  },
  {
    path: 'winner',
    element: <Winner/>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router = {router} />
);
