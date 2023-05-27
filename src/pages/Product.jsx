import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import ProductsApi from '../api/products';
import { useCartContext } from '../context/CartContext';
import '../stylesheets/pages/Product.scss';
import Button from '../components/Button/Button';
import Star from '../components/Star/Star';

export default function Product() {
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

  let count = 1; //클릭시 count
  // 같은 상품이 카드에 들어온다면?
  const handleQuantity = (id, quantity) => {
    const foundIdx = cartItems.findIndex((item) => item.id === id);
    const addItem = { ...product, count: quantity };
    setCartItems([
      ...cartItems.slice(0, foundIdx),
      addItem,
      ...cartItems.slice(foundIdx + 1),
    ]);
  };
  //카트에추가
  const handleCart = () => {
    const addItem = { ...product, count };
    const found = cartItems.find((item) => item.id === addItem.id);
    if (found) {
      //중복된다면
      handleQuantity(addItem.id, found.count + count);
    } else {
      setCartItems([...cartItems, addItem]);
    }
    window.alert(`장바구니에 ${product.title}추가되었습니다. `);
  };

  const handleMoveCart = () => navigate('/cart');

  return (
    <section className='common_inner'>
      {isLoading && <p>로딩중입니다</p>}
      {error && <p>에러입니다</p>}
      {product && (
        <article className='detail_wrap'>
          <div className='detail_img'>
            <img src={product.image} alt={product.title} width='100' />
          </div>
          <div className='detail_info'>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <Star stars={product.rating.rate} count={product.rating.count} />
            <p className='detail_price'>${Math.floor(product.price)}</p>
            <Button onClick={handleCart} type='accent'>
              장바구니에 담기
            </Button>
            <Button onClick={handleMoveCart}>장바구니로 이동</Button>
          </div>
        </article>
      )}
    </section>
  );
}
