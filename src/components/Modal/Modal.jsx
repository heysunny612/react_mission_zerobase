import styles from './Modal.module.css';
import Button from '../Button/Button';
import { useCartContext } from '../../context/CartContext';
export default function Modal({ toggleModal }) {
  const { setCartItems } = useCartContext();
  const handlePay = () => {
    setCartItems([]);
    toggleModal();
  };
  return (
    <>
      <div className={styles.modal_bg}></div>
      <div className={styles.modal}>
        <div className={styles.modal_box}>
          <p className={styles.title}>정말로 구매하시겠습니까?</p>
          <p>장바구니의 모든 상품들이 삭제됩니다.</p>
          <div className={styles.buttons}>
            <Button type='accent' onClick={handlePay}>
              네
            </Button>
            <Button onClick={toggleModal}>아니오</Button>
          </div>
        </div>
      </div>
    </>
  );
}
