import { useQuery } from 'react-query';
import ProductCard from './ProductCard';
import styles from './Products.module.css';
import ProductsApi from '../../api/products';
import 'react-loading-skeleton/dist/skeleton.css';
import Loading from '../Loading/Loading';

export default function Products({ category, breadcrumbs }) {
  const api = new ProductsApi();
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(
    ['products', category],
    async () => await api.getProducts(category)
  );

  return (
    <>
      {isLoading && <Loading />}
      {error && <p>에러</p>}
      {products && (
        <ul className={styles.products}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              breadcrumbs={breadcrumbs}
            />
          ))}
        </ul>
      )}
    </>
  );
}
