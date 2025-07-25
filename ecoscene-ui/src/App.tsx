import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { theme } from './styles/theme';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Feed from './pages/social/Feed';
import Profile from './pages/social/Profile';
import Marketplace from './pages/commerce/Marketplace';
import Product from './pages/commerce/Product';
import Cart from './pages/commerce/Cart';
import Guilds from './pages/guilds/Guilds';
import GuildDetail from './pages/guilds/GuildDetail';
import Wallet from './pages/currency/Wallet';
import Courses from './pages/learning/Courses';
import CourseDetail from './pages/learning/CourseDetail';
import Dashboard from './pages/Dashboard';

// Mock auth check (replace with real auth logic)
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Main App Routes */}
            <Route
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile/:userId?" element={<Profile />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/guilds" element={<Guilds />} />
              <Route path="/guild/:guildId" element={<GuildDetail />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:courseId" element={<CourseDetail />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App
