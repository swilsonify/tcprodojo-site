import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = () => {
  return (
    <div 
      className="min-h-screen relative"
    >
      {/* Background Pattern Layer */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: '#000',
          backgroundImage: 'url(/images/cross-pattern.jpg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.4
        }}
      />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;