import { useCartContext } from '../context/CartContext';

export default function Cart() {
  const { cartItems } = useCartContext();

  console.log(cartItems);
  return (
    <div>
      {cartItems.length < 1 && <p>장바구니에 담긴 상품이 없습니다</p>}
      {cartItems && (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title}
              {item.count}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
