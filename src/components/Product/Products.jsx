import { useQuery } from 'react-query';
import ProductCard from './ProductCard';
import styles from './Products.module.css';
import ProductsApi from '../../api/products';

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
      {isLoading && <p>로딩중...</p>}
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
