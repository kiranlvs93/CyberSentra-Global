import { Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import { AcademyPage } from './pages/AcademyPage';
import { CommunityPage } from './pages/CommunityPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { LabsPage } from './pages/LabsPage';
import { ServicesPage } from './pages/ServicesPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}> 
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="academy" element={<AcademyPage />} />
        <Route path="labs" element={<LabsPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
