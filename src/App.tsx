import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { AppShell } from './layouts/AppShell';
import { MetadataAnalysis } from './pages/MetadataAnalysis';
import { MediaPlannerV2 } from './pages/MediaPlannerV2';
import { ContextualAdDemos } from './pages/ContextualAdDemos';
import { NewContentUpload } from './pages/NewContentUpload';
import { TaxonomyExplorer } from './pages/TaxonomyExplorer';
import { MediaPlannerV1 } from './pages/MediaPlannerV1';

function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <LoginScreen />;
  }

  // Default landing
  if (location.pathname === '/') {
    return <Navigate to="/media-planner-v2" replace />;
  }

  return (
    <AppShell>
      <Routes>
        <Route path="/media-planner-v2" element={<MediaPlannerV2 />} />
        <Route path="/contextual-ad-demos" element={<ContextualAdDemos />} />
        {/* Other features kept as stubs but not currently in the nav: */}
        <Route path="/metadata-analysis" element={<MetadataAnalysis />} />
        <Route path="/sdt-content-form" element={<NewContentUpload />} />
        <Route path="/taxonomy-showcase" element={<TaxonomyExplorer />} />
        <Route path="/media-planner" element={<MediaPlannerV1 />} />
        <Route path="*" element={<Navigate to="/media-planner-v2" replace />} />
      </Routes>
    </AppShell>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
