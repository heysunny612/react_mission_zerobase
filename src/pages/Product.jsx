import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import ProductsApi from '../api/products';
import { useCartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Product() {
  //TODO : 로컬스토리지에 저장한 setCount 값 불러와야함
  const { cartItems, setCartItems } = useCartContext();
  const navigate = useNavigate();
  const api = new ProductsApi();
  const { productId } = useParams();
  const {
    isLoading,
    error,
    data: product,
  } = useQuery(['product', productId], async () =>
    api.getProductDetail(productId)
  );
  const { state: breadcrumbs } = useLocation();
  let count = 1;
  // 같은 상품이 카드에 들어온다면?
  const handleQuantity = (id, quantity) => {
    const found = cartItems.filter((item) => item.id === id)[0];
    const idx = cartItems.indexOf(found);
    const cartItem = {
      ...product,
      count: quantity,
    };
    setCartItems([
      ...cartItems.slice(0, idx),
      cartItem,
      ...cartItems.slice(idx + 1),
    ]);
  };
  //카트에추가
  const handleCart = () => {
    const cartItem = { ...product, count };
    const found = cartItems.find((item) => item.id === cartItem.id);
    if (found) {
      //중복된다면
      handleQuantity(cartItem.id, found.count + count);
    } else {
      setCartItems([...cartItems, cartItem]);
    }
    const isMoveCart = window.confirm(
      `장바구니에 ${product.title}추가되었습니다. 장바구니로 이동할까요?`
    );
    if (!isMoveCart) return;
    navigate('/cart');
  };

  return (
    <section className='common_inner'>
      {isLoading && <p>로딩중입니다</p>}
      {error && <p>에러입니다</p>}
      {product && (
        <>
          <Breadcrumbs breadcrumbs={[breadcrumbs, product.title]} />
          <article>
            {product.title}
            <img src={product.image} alt='' width='100' />
            <button onClick={handleCart}>장바구니 담기</button>
          </article>
        </>
      )}
    </section>
  );
}
