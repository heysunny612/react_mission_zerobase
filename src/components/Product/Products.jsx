import { useQuery } from 'react-query';
import ProductCard from './ProductCard';
import styles from './Products.module.css';
import ProductsApi from '../../api/products';
import 'react-loading-skeleton/dist/skeleton.css';
import Loading from '../Loading/Loading';

export default function Products({ category, scrollX, max, filter, skeleton }) {
  const api = new ProductsApi();
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(
    ['products', category],
    async () => await api.getProducts(category)
  );
  const maxItems = products && products.slice(0, max); // 메인페이지 MAX 4개
  const filteredItems = products && getFilteredItems(products, filter); // 카테고리 페이지 아이템 정렬순
  return (
    <>
      {isLoading && <Loading type='list' count={skeleton} />}
      {error && <p>에러</p>}
      {products && (
        <ul className={`${styles.products} ${scrollX ? styles.scrollX : null}`}>
          {max &&
            maxItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                category={category}
              />
            ))}
          {filter &&
            filteredItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                category={category}
                filter
              />
            ))}
        </ul>
      )}
    </>
  );
}

function getFilteredItems(products, filter) {
  switch (filter) {
    case '인기순':
      return products;
    case '평점순':
      return products.sort((a, b) => b.rating.rate - a.rating.rate);
    case '낮은가격순':
      return products.sort((a, b) => a.price - b.price);
    case '높은가격순':
      return products.sort((a, b) => b.price - a.price);
  }
}
