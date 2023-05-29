import styles from './EmptyContent.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
export default function EmptyContent({ type }) {
  const navigate = useNavigate();
  return (
    <div className={styles.empty}>
      {type === 'cart' && (
        <>
          <p>장바구니에 담긴 상품이 없습니다.</p>
          <Button type='accent' onClick={() => navigate('/')}>
            쇼핑하러 가기
          </Button>
        </>
      )}
    </div>
  );
}
