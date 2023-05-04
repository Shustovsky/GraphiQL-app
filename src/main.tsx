import React, { StrictMode } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './input.css';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NotFonundPage from './pages/NotFonundPage';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <WelcomePage />,
//     errorElement: <NotFonundPage />,
//     children: [
//       {
//         path: '/',
//         element: <MainPage />,
//       },
//       {
//         path: 'register',
//         element: <RegisterPage />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <RouterProvider router={router}></RouterProvider>
// );

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
