import { useCartContext } from '../../context/CartContext';
import styles from './CartList.module.css';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function CartList({ item }) {
  const { cartItems, setCartItems } = useCartContext();
  const handleQuantity = (id, quantity) => {
    const updatedCarts = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, count: quantity };
      } else {
        return item;
      }
    });

    if (quantity <= 0) {
      setCartItems(deleteCartItem(cartItems, id));
      return;
    }
    setCartItems(updatedCarts);
  };
  const handleDelete = (id) => {
    setCartItems(deleteCartItem(cartItems, id));
  };
  return (
    <li key={item.id} className={styles.item}>
      <div className={styles.image}>
        <Link
          to={`/${
            item.category.includes('clothing') ? 'fashion' : item.category
          }/product/${item.id}`}
        >
          <img src={item.image} alt={item.title} />
        </Link>
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.price}>
          $ {Math.round(item.price * item.count).toLocaleString()}
        </p>
        <div className={styles.buttons}>
          <button
            onClick={() => handleQuantity(item.id, item.count - 1)}
            className={styles.minus}
          >
            <AiOutlineMinus />
          </button>
          <span className={styles.count}>{item.count}</span>
          <button
            onClick={() => handleQuantity(item.id, item.count + 1)}
            className={styles.plus}
          >
            <AiOutlinePlus />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className={styles.trash}
          >
            <BsTrashFill />
          </button>
        </div>
      </div>
    </li>
  );
}

// 아이템삭제
function deleteCartItem(cartItems, id) {
  return cartItems.filter((item) => item.id !== id);
}
