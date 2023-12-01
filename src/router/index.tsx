/**
 * router
 */

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from '../pages/index';
import Home from '../pages/home';
import Operation from '../pages/operation';
import Chinese from '../pages/chinese';

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/index" />} />
        <Route path="/index" element={<Index />} />
        <Route path="/operation" element={<Operation />} />
        <Route path="/chinese" element={<Chinese />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </HashRouter>
  )
};