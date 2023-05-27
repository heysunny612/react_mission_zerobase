import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './Carousels.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const carousel = [
  {
    id: 1,
    image: 'src/assets/img_shop_fashion.jpeg',
    title: '패션',
    text: {
      title: '물빠진 청바지!',
      subText: '이제 막 도착한 패션 청바지를 구경해보세요',
    },
    path: 'fashion',
  },
  {
    id: 2,
    image: 'src/assets/img_shop_acc.jpg',
    title: '악세사리',
    text: {
      title: '반짝반짝 당신을 빛나게 해줄 악세사리!',
      subText: '다양한 악세사리 상품을 둘러보세요',
    },
    path: 'jewelery',
  },
  {
    id: 3,
    image: 'src/assets/img_shop_digital.jpeg',
    title: '디지털',
    text: {
      title: '신속한 업무처리!',
      subText: '다양한 디지털 상품을 둘러보세요',
    },
    path: 'electronics',
  },
];

export default function Carousels() {
  const navigate = useNavigate();
  return (
    <Carousel autoPlay showThumbs={false}>
      {carousel.map((item) => (
        <div className='carousel_description' key={item.id}>
          <img alt={item.title} src={item.image} />
          <div className='text_area'>
            <p className='title'>{item.text.title}</p>
            <p>{item.text.subText}</p>
            <Button
              type='accent'
              onClick={() => navigate(`/${item.path}`, { state: item })}
            >
              바로가기 &nbsp;&nbsp;
              <BsArrowRight />
            </Button>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
