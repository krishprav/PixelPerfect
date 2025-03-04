import SessionWrapper from './components/SessionWrapper';
import AppContent from './components/AppContent';

export default function Page() {
  return (
    <SessionWrapper>
      <AppContent />
    </SessionWrapper>
  );
}