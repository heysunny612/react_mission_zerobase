import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './Loading.module.css';

export default function Loading({ type, count }) {
  switch (type) {
    case 'list':
      return (
        <ul className={styles.products}>
          {new Array(count).fill(1).map((_, i) => {
            return (
              <li key={i} className={styles.product}>
                <Skeleton
                  count={1}
                  height='280px'
                  borderRadius={'20px 20px 0 0'}
                />
                <div className={styles.info_area}>
                  <Skeleton count={1} height='25px' />
                  <Skeleton count={1} height='25px' width='70%' />
                  <Skeleton count={1} height='25px' width='30%' />
                </div>
              </li>
            );
          })}
        </ul>
      );
    case 'detail':
      return (
        <div className={styles.detail}>
          <div className={styles.detail_img}>
            <Skeleton count={1} height='300px' />
          </div>
          <div className={styles.detail_info}>
            <p>
              <Skeleton count={1} height='40px' width='70%' />
            </p>
            <p>
              <Skeleton count={2} height='25px' />
            </p>
            <p>
              <Skeleton count={1} height='140px' width='50%' />
            </p>
          </div>
        </div>
      );

    default:
      throw Error('없는 타입입니다. list 또는 detail을 사용해주세요');
  }
}
