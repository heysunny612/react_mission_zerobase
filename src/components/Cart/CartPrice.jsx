import { useState } from 'react';
import Button from '../Button/Button';
import styles from './CartPrice.module.css';
import Modal from '../Modal/Modal';

export default function CartPrice({ items }) {
  const [modal, setModal] = useState(false);
  const totalPrice = items.reduce((prev, curr) => {
    return prev + curr.price * curr.count;
  }, 0);

  const toggleModal = () => setModal((prev) => !prev);
  return (
    <div className={styles.cart_price}>
      <span>총 :{Math.round(totalPrice).toLocaleString()}</span>
      <Button type='accent' onClick={() => setModal(true)}>
        구매하기
      </Button>
      {modal === true ? <Modal toggleModal={toggleModal} /> : null}
    </div>
  );
}
