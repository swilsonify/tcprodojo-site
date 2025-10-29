import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = () => {
  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: '#000',
        backgroundImage: 'url(/images/cross-pattern.jpg)',
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px'
      }}
    >
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;