import { useLocation } from 'react-router-dom';
import Products from '../components/Product/Products';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
export default function Category() {
  const {
    state: { path, title },
  } = useLocation();

  return (
    <section className='common_inner'>
      <Breadcrumbs breadcrumbs={[title]} />
      <h2>{title}</h2>
      <Products category={path === 'all' ? '' : path} breadcrumbs={title} />
    </section>
  );
}
