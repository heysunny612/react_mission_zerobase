import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const categories = [
  { path: 'all', title: '모든 상품' },
  { path: 'fashion', title: '패션' },
  { path: 'jewelery', title: '액세서리' },
  { path: 'electronics', title: '디지털' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const handleClick = (category) => {
    navigate(`/${category.path}`, { state: category });
  };
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to='/'>React Shop</Link>
      </h1>
      <nav className={styles.nav}>
        <ul>
          {categories.map((category) => (
            <li
              key={category.path}
              role='button'
              onClick={() => handleClick(category)}
            >
              {category.title}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.search}>
        <button>Dark Mode</button>
        <form>
          <input type='text' />
        </form>
        <Link to='/cart'>장바구니</Link>
      </div>
    </header>
  );
}
