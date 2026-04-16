import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import MainLayout from './components/layouts/MainLayout';
import { AdsProvider } from './contexts/AdsContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import './index.css';
import { CampaignPage, ChatPage, ProfilePage } from './pages';

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
                <Route path="/campaigns" element={<CampaignPage />} />
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
