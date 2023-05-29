import '../stylesheets/pages/Category.scss';
import { useParams } from 'react-router-dom';
import Products from '../components/Product/Products';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { categories } from '../Categories';
import { useState } from 'react';

const filters = ['인기순', '평점순', '낮은가격순', '높은가격순'];

export default function Category() {
  const { category } = useParams();
  const found = categories.find((c) => c.path === category);
  const [filter, setFilter] = useState(filters[0]);

  return (
    <section className='common_inner'>
      <Breadcrumbs breadcrumbs={[found.title]} />
      <h2>{found.title}</h2>
      {filters && (
        <ul className='sort_list'>
          {filters.map((value, index) => (
            <li
              key={index}
              onClick={() => setFilter(value)}
              role='button'
              className={value === filter ? 'active' : null}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
      <Products category={category} filter={filter} />
    </section>
  );
}
