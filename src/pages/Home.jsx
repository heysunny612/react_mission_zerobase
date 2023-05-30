import Products from '../components/Product/Products';
import '../stylesheets/pages/Home.css';
import Carousel from '../components/Carousels/Carousels';
import { categories } from '../Categories';

export default function Home() {
  return (
    <>
      <Carousel />
      <div className='common_inner'>
        {categories.map((category) => (
          <section className='main_section' key={category.id}>
            <h2>{category.path === 'all' ? 'NEW ARRIVAL' : category.title}</h2>
            <Products category={category.path} scrollX max={4} skeleton={4} />
          </section>
        ))}
      </div>
    </>
  );
}
