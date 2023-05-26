import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { ThemeContextProvider } from './context/ThemeContext';
import { CartContextProvider } from './context/CartContext';

function App() {
  return (
    <ThemeContextProvider>
      <CartContextProvider>
        <Navbar />
        <Outlet />
      </CartContextProvider>
      <Footer />
    </ThemeContextProvider>
  );
}

export default App;
