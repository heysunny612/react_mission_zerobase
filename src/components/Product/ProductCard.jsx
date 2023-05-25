import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

export default function ProductCard({
  product: { id, title, price, image },
  breadcrumbs,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${id}`, { state: breadcrumbs });
  };
  return (
    <li className={styles.product} role='button' onClick={handleClick}>
      <div className={styles.img_area}>
        <img src={image} alt='' width='100' />
      </div>
      <div className={styles.info_area}>
        <p className={styles.title}>{title}</p>
        <p>${price}</p>
      </div>
    </li>
  );
}
