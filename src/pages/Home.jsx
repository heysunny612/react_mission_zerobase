import Products from '../components/Product/Products';
import '../stylesheets/pages/Home.css';

export default function Home() {
  // TODO: 4개씩만 나오게하기 
  return (
    <div className='common_inner'>
      <section className='main_section'>
        <h2>패션</h2>
        <Products category={`men's clothing`} />
      </section>
      <section className='main_section'>
        <h2>악세사리</h2>
        <Products category='jewelery' />
      </section>
      <section className='main_section'>
        <h2>디지털</h2>
        <Products category='electronics' />
      </section>
    </div>
  );
}
