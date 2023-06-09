import '../stylesheets/pages/Product.scss';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { categories } from '../Categories';
import ProductsApi from '../api/products';
import Button from '../components/Button/Button';
import Star from '../components/Star/Star';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Loading from '../components/Loading/Loading';

export default function Product() {
  const { cartItems, setCartItems } = useCartContext();
  const navigate = useNavigate();
  const api = new ProductsApi();
  const { category, productId } = useParams();
  const found = categories.find((c) => c.path === category);
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
    setCartItems(
      cartItems.map((item) => {
        if (id) return { ...product, count: quantity };
        else return item;
      })
    );
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
      {isLoading && <Loading type='detail' />}
      {error && <p>에러입니다</p>}
      {product && (
        <>
          <Breadcrumbs
            breadcrumbs={[found.title, product.title]}
            type='detail'
          />
          <article className='detail_wrap'>
            <div className='detail_img'>
              <img src={product.image} alt={product.title} width='100' />
            </div>
            <div className='detail_info'>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <Star stars={product.rating.rate} count={product.rating.count} />
              <p className='detail_price'>${Math.round(product.price)}</p>

              <Button onClick={handleCart} type='accent'>
                장바구니에 담기
              </Button>
              <Button onClick={handleMoveCart}>장바구니로 이동</Button>
            </div>
          </article>
        </>
      )}
    </section>
  );
}
