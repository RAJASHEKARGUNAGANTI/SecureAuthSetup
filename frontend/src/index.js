import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this import
import App from './App';
import { AuthProvider } from './context/AuthContext';

// Old React 17 syntax:
// ReactDOM.render(<App />, document.getElementById('root'));

// New React 18 syntax:
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
    <App />
    </AuthProvider>
);
