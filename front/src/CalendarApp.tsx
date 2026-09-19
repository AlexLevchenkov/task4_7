import { Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import AuthPage from './components/Auth/AuthPage';
import ProtectedRoute from './ProtectedRoute';

const CalendarApp = () => {
  return (
    <Routes>
      <Route path="/signin" element={<AuthPage mode="signin" />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/calendar" element={<App />} />
      </Route>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
};

export default CalendarApp;
