import styles from './Breadcrumbs.module.css';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ breadcrumbs, type }) {
  return (
    <ul className={`${styles.bread} ${type ? styles[type] : null}`}>
      <li>
        <Link to='/'>홈</Link>
      </li>
      {breadcrumbs &&
        breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>{breadcrumb}</li>
        ))}
    </ul>
  );
}
