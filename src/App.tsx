import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/pages/Main';
import EditAgent from './components/pages/EditAgent';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/edit-agent/:id" element={<EditAgent />} />
      </Routes>
    </Router>
  );
};

export default App;
