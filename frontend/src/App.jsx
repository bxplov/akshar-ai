import { useEffect, useState, useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Dashboard } from './components/Dashboard';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { LandingPage } from './components/LandingPage';

const AppContent = () => {
  const [authMode, setAuthMode] = useState('login');
  const [showLanding, setShowLanding] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const authContext = useContext(AuthContext);
  const { isAuthenticated, isLoading } = authContext || { isAuthenticated: false, isLoading: true };

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const handleGoHome = () => {
    setShowLanding(true);
    setAuthMode('login');
  };

  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="flex flex-col items-center gap-5 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 w-10 h-10 rounded-full bg-gold/10 blur-xl animate-breathe" />
            <div
              className="w-10 h-10 rounded-full border-[1.5px] border-cream-300 border-t-charcoal animate-spin"
              style={{ animationDuration: '0.8s' }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg text-charcoal tracking-tight">Akshar</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md font-sans font-semibold tracking-wider bg-gold text-charcoal">AI</span>
          </div>
        </div>
      </div>
    );
  }

  // Already authenticated → dashboard
  if (isAuthenticated) {
    return <Dashboard onGoHome={handleGoHome} />;
  }

  // Landing page
  if (showLanding) {
    return (
      <LandingPage
        onGetStarted={() => {
          setShowLanding(false);
          setAuthMode('register');
        }}
        onSignIn={() => {
          setShowLanding(false);
          setAuthMode('login');
        }}
        onGoHome={handleGoHome}
      />
    );
  }

  // Auth forms
  return authMode === 'login' ? (
    <LoginForm
      onSwitchToRegister={() => setAuthMode('register')}
      onGoHome={handleGoHome}
    />
  ) : (
    <RegisterForm
      onSwitchToLogin={() => setAuthMode('login')}
      onGoHome={handleGoHome}
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#2D2D2D',
            color: '#fff',
            borderRadius: '100px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          },
        }} 
      />
      <AppContent />
    </AuthProvider>
  );
}

export default App;
