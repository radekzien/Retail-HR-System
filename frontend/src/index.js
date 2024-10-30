import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ShiftsContextProvider } from './contexts/shiftsContext';
import { PayslipContextProvider } from './contexts/payslipContext';
import { AuthContextProvider } from './contexts/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ShiftsContextProvider>
        <PayslipContextProvider>
          <App />
        </PayslipContextProvider>
      </ShiftsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


reportWebVitals();
