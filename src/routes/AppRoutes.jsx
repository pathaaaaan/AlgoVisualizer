import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Learn from '../pages/Learn';
import TopicPage from '../pages/TopicPage';
import AlgorithmPage from '../pages/AlgorithmPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:topic" element={<TopicPage />} />
        <Route path="/learn/:topic/:subtopic" element={<TopicPage />} />
        <Route path="/algorithm/:name" element={<AlgorithmPage />} />
      </Route>
    </Routes>
  );
}
