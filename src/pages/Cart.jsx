import CartList from '../components/Cart/CartList';
import { useCartContext } from '../context/CartContext';
import '../stylesheets/pages/Cart.scss';
import CartPrice from '../components/Cart/CartPrice';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import EmptyContent from '../components/EmptyContent/EmptyContent';

export default function Cart() {
  const { cartItems } = useCartContext();

  return (
    <section className='cart_wrap common_inner'>
      <Breadcrumbs breadcrumbs={['장바구니']} />
      {cartItems.length < 1 && <EmptyContent type='cart' />}
      {cartItems.length >= 1 && (
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
