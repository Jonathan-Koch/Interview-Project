import React from 'react';
import { RouterProvider ,BrowserRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';

import PathConstants from "./pathConstants"
import BurgerMenu from '../components/burgerMenu';
import AboutComponent from '../pages/AboutComponent';
import AjaxComponent from '../pages/Home';
import { Switch } from '@syncfusion/ej2-react-buttons';


const Home = React.lazy(() => import("../pages/Home"))
const About = React.lazy(() => import("../pages/AboutComponent"))



const routes = [
    { path: PathConstants.Home, element: <Home />},
    { path: PathConstants.About, element: <AboutComponent />}
]

export default routes;