import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import styles from './Star.module.css';

export default function Star({ stars, count }) {
  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= index + 0.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return (
    <div className={styles.star_rating}>
      {ratingStar}
      <span className={styles.star}>{stars} / </span>
      <span className={styles.count}>{count} 참여</span>
    </div>
  );
}
