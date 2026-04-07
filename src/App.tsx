import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdsProvider } from './contexts/AdsContext';
import { ChatProvider } from './contexts/ChatContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import MainLayout from './components/layouts/MainLayout';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <AdsProvider>
        <ChatProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />

              {/* Protected Routes nested under MainLayout */}
              <Route element={<MainLayout />}>
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/chat/:threadId" element={<ChatPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              {/* Default Route */}
              <Route path="/" element={<Navigate to="/chat" replace />} />
              <Route path="*" element={<Navigate to="/chat" replace />} />
            </Routes>
          </Router>
        </ChatProvider>
      </AdsProvider>
    </AuthProvider>
  );
}

export default App;
