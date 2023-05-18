import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './pages/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
