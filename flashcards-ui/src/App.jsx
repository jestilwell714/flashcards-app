import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Explorer from './pages/Explorer';
import CramMode from './components/CramMode';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      
        return <Navigate to="/login" replace />;
    }

    return children;
};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/explorer/:mode/:type/:id" element={<ProtectedRoute><Explorer /></ProtectedRoute>}/>
        <Route path="/explorer/:mode/:type/:id/card/:cardId" element={<Explorer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
