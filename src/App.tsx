import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ExhibitionsPage from "./pages/ExhibitionsPage";
import DiscoverPage from "./pages/DiscoverPage";
import LearnPage from "./pages/LearnPage";
import AboutPage from "./pages/AboutPage";
import VisitPage from "./pages/VisitPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/exhibitions" element={<ExhibitionsPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/visit" element={<VisitPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
