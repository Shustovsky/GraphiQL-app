import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import NotFonundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import WelcomePage from '../pages/WelcomePage';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../pages/ProtectedRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="*" element={<NotFonundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
