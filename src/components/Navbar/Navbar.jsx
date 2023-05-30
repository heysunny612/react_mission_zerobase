import styles from './Navbar.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext';
import { useCartContext } from '../../context/CartContext';
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineShoppingCart,
  MdSearch,
} from 'react-icons/md';
import { GrMenu } from 'react-icons/gr';
import { categories } from '../../Categories';
import { useState } from 'react';
import { useBodyScrollLock } from '../../hooks/useLockBodyScroll';
import Search from '../Search/Search';

export default function Navbar() {
  const [mobileNav, setMobileNav] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const { cartItems } = useCartContext();
  const { mode, toggleMode } = useThemeContext();
  const cartTotal = getCartTotalCount(cartItems);

  const { lockScroll, unLockScroll } = useBodyScrollLock();
  const toggleNav = () => {
    if (window.innerWidth > 768) return;
    mobileNav ? unLockScroll() : lockScroll();
    setMobileNav((prev) => !prev);
  };

  const handleSearch = () => {
    setMobileSearch((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.common_inner}>
        <div className={styles.logo_area}>
          <button className={styles.toggle} onClick={toggleNav}>
            <GrMenu />
          </button>
          <h1 className={styles.logo}>
            <Link to='/'>React Shop</Link>
          </h1>
        </div>
        <nav className={`${styles.nav} ${mobileNav && styles.active}`}>
          <div className={styles.nav_bg} onClick={toggleNav}></div>
          <ul>
            {categories.map((category) => (
              <li key={category.path}>
                <NavLink
                  className={({ isActive }) => (isActive ? styles.active : '')}
                  to={category.path}
                  onClick={toggleNav}
                >
                  {category.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.side_area}>
          <button onClick={toggleMode}>
            {mode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </button>
          <button className={styles.btn_search} onClick={handleSearch}>
            <MdSearch />
          </button>
          <Search mobileSearch={mobileSearch} />
          <div className={styles.cart}>
            <Link to='/cart'>
              <MdOutlineShoppingCart />
              <span>{cartTotal}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
//장바구니 총 count 구하기
const getCartTotalCount = (cartItems) => {
  return cartItems.reduce((prev, curr) => {
    return prev + curr.count;
  }, 0);
};
