import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout />
      <ToastContainer />
    </div>
  );
}

export default App;
