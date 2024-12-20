import React from 'react';
import { Layout } from './components/Layout';
import { AuthForm } from './components/AuthForm';
import { useAuth } from './store';

function App() {
  const user = useAuth((state) => state.user);
  return user ? <Layout /> : <AuthForm />;
}

export default App;