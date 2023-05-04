import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProtectedPage from './pages/ProtectedPage';
import PublicPage from './pages/PublicPage';
import RequireAuth from './RequiredAuth';

export default function App() {
  return (
    <AuthProvider>
      <h1>Hello GraphiQL</h1>
      <Routes>
        <Route element={<MainPage />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
