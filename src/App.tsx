import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Scale, BookOpen, Users, FileText } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import Documents from './pages/Documents';
import Clients from './pages/Clients';
import AuthForm from './components/AuthForm';
import ProtectedRoute from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Scale },
  { name: 'Cases', href: '/cases', icon: BookOpen },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Clients', href: '/clients', icon: Users },
];

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <div className="flex">
                    <Sidebar navigation={navigation} />
                    <main className="flex-1 p-8">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/cases" element={<Cases />} />
                        <Route path="/documents" element={<Documents />} />
                        <Route path="/clients" element={<Clients />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </ErrorBoundary>
  );
}

export default App;