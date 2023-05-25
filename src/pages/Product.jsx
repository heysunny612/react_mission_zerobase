import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import ProductsApi from '../api/products';

export default function Product() {
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
          </article>
        </>
      )}
    </section>
  );
}
