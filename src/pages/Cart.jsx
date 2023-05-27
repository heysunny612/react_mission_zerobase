import CartList from '../components/Cart/CartList';
import { useCartContext } from '../context/CartContext';
import '../stylesheets/pages/Cart.scss';
import CartPrice from '../components/Cart/CartPrice';

export default function Cart() {
  const { cartItems } = useCartContext();

  return (
    <section className='cart_wrap common_inner'>
      {cartItems.length < 1 && <p>장바구니에 담긴 상품이 없습니다</p>}
      {cartItems && (
        <>
          <ul>
            {cartItems.map((item) => (
              <CartList key={item.id} item={item} />
            ))}
          </ul>
          <CartPrice items={cartItems} />
        </>
      )}
    </section>
  );
}
