import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/pages/Main';
import EditAgent from './components/pages/EditAgent';
import AddAgent from './components/pages/AddAgent';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/edit-agent/:id" element={<EditAgent />} />
        <Route path="/add-agent/" element={<AddAgent />} />
      </Routes>
    </Router>
  );
};

export default App;
