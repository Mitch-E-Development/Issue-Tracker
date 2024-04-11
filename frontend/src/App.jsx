import React from 'react';
import { Routes, Route}  from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateIssue from './pages/CreateIssues';
import ShowIssue from './pages/ShowIssue';
import EditIssue from './pages/EditIssue';
import DeleteIssue from './pages/DeleteIssue';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/issues/create' element={<CreateIssue />} />
        <Route path='/issues/details/:id' element={<ShowIssue />} />
        <Route path='/issues/edit/:id' element={<EditIssue />} />
        <Route path='/issues/delete/:id' element={<DeleteIssue />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
