import React from 'react';
import { Outlet, RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import TablePage from './pages/TablePage';
import CryptoDetail from './pages/DetailsPage';
import Navbar from './components/Navbar'; // Adjust the path according to your directory structure
import Error from './components/Error';


const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  );
}



const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <TablePage />,
        errorElement: <Error />,
      },
      {
        path: "/details/:id",
        element: <CryptoDetail />,
      },

    ],
    errorElement: <Error />,
  }
]);

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">

      </header>
        <RouterProvider router={router} />
    </div>
  );
};

export default App;
