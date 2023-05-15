/**
 * router
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home'
import Operation from '../pages/operation';

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Operation />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </HashRouter>
  )
};