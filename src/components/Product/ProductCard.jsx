import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import Star from '../Star/Star';

export default function ProductCard({
  product: {
    id,
    title,
    price,
    image,
    rating: { rate, count },
  },
  category,
  filter,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${category}/product/${id}`);
  };

  return (
    <li className={styles.product} role='button' onClick={handleClick}>
      <div className={styles.img_area}>
        <img src={image} alt='' width='100' />
      </div>
      <div className={styles.info_area}>
        <p className={styles.title}>{title}</p>
        <div className={styles.price}>
          <p>${Math.round(price)}</p>
          {filter && <Star stars={rate} count={count} small />}
        </div>
      </div>
    </li>
  );
}
