import React from "react";
import { Outlet, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import TablePage from "./pages/TablePage";
import CryptoDetail from "./pages/DetailsPage";
import Navbar from "./components/Navbar";
import Error from "./components/Error";

// Component for the layout of the app, including the Navbar and Outlet for nested routes
const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

// Create a browser router with routes configuration
const router = createBrowserRouter([
  {
    path: "/", // Base path
    element: <AppLayout />, // Layout component with Navbar
    children: [
      {
        path: "/crypto-dashboard", // Path for the table page
        element: <TablePage />, // Component to render for the table page
      },
      {
        path: "/crypto-dashboard/details/:id", // Path for the details page with dynamic id
        element: <CryptoDetail />, // Component to render for the details page
      },
    ],
    errorElement: <Error />, // Component to render for invalid routes
  },
]);

// Main App component
const App: React.FC = () => {
  return (
    <div className="App">
      <RouterProvider router={router} /> {/* RouterProvider to handle routing */}
    </div>
  );
};

export default App;
