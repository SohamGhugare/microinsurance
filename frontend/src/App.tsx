import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import PurchasePolicy from './pages/PurchasePolicy';
import MyPolicies from './pages/MyPolicies';
import SubmitClaim from './pages/SubmitClaim';
import Navbar from './components/Navbar';

function App() {
  const [account, setAccount] = useState<string | null>(null);

  // Protected Route wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!account) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <Navbar account={account} />
      <Routes>
        <Route path="/" element={<LandingPage account={account} setAccount={setAccount} />} />
        <Route
          path="/purchase"
          element={
            <ProtectedRoute>
              <PurchasePolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/policies"
          element={
            <ProtectedRoute>
              <MyPolicies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/claims/new/:policyId"
          element={
            <ProtectedRoute>
              <SubmitClaim />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App; 