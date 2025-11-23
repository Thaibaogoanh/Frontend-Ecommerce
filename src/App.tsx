import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ShopSustainableBlanks } from './components/ShopSustainableBlanks';
import { DiscoverDesigns } from './components/DiscoverDesigns';
import { GreenCommitment } from './components/GreenCommitment';
import { VoucherCoins } from './components/VoucherCoins';
import { ProductRecommendations } from './components/ProductRecommendations';
import { Footer } from './components/Footer';
import { BlanksListingPage } from './components/BlanksListingPage';
import { BlankDetailPage } from './components/BlankDetailPage';
import { DesignGalleryPage } from './components/DesignGalleryPage';
import { DesignDetailPage } from './components/DesignDetailPage';
import { ShoppingCartPage } from './components/ShoppingCartPage';
import { UserDashboardPage } from './components/UserDashboardPage';
import { CustomizerPage } from './components/CustomizerPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderSuccessPage } from './components/OrderSuccessPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { AboutGreenPage } from './components/AboutGreenPage';
import { HelpPage } from './components/HelpPage';
import { ContactPage } from './components/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useState, useEffect } from 'react';

type PageType = 
  | 'home' 
  | 'blanks' 
  | 'blank-detail' 
  | 'designs' 
  | 'design-detail' 
  | 'cart' 
  | 'dashboard'
  | 'customizer'
  | 'checkout'
  | 'order-success'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'about-green'
  | 'help'
  | 'contact'
  | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Listen to hash changes for simple routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage((hash as PageType) || 'home');
    };

    handleHashChange(); // Initial check
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple router - you can switch pages using hash
  switch (currentPage) {
    case 'blanks':
      return <BlanksListingPage />;
    case 'blank-detail':
      return <BlankDetailPage />;
    case 'designs':
      return <DesignGalleryPage />;
    case 'design-detail':
      return <DesignDetailPage />;
    case 'cart':
      return <ShoppingCartPage />;
    case 'dashboard':
      return <UserDashboardPage />;
    case 'customizer':
      return <CustomizerPage />;
    case 'checkout':
      return <CheckoutPage />;
    case 'order-success':
      return <OrderSuccessPage />;
    case 'login':
      return <LoginPage />;
    case 'register':
      return <RegisterPage />;
    case 'forgot-password':
      return <ForgotPasswordPage />;
    case 'about-green':
      return <AboutGreenPage />;
    case 'help':
      return <HelpPage />;
    case 'contact':
      return <ContactPage />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return (
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <HeroSection />
            <ShopSustainableBlanks />
            <DiscoverDesigns />
            <GreenCommitment />
            <VoucherCoins />
            <ProductRecommendations />
          </main>
          <Footer />
        </div>
      );
  }
}
