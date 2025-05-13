// ✅ Added imports for React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Registration from './registration.jsx';

function App() {
  return (
    // ✅ Wrapped everything inside <Router> to enable routing
    <Router>
      {/* ✅ Defined app routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
