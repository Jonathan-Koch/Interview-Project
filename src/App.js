import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Page404 from './pages/Page404';
import Layout from './components/Layout';
import routes from './routes/router';

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Page404 />,
      children: routes
    }
  ])

  return <RouterProvider router={router} />
}

export default App;
