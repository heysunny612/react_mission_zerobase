import styles from './Search.module.css';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import ProductsApi from '../../api/products';

export default function Search() {
  const [keyword, setKeyword] = useState(''); // 사용자가 입력하는 키워드
  const [searchItems, setSearchItems] = useState([]); // 검색된 리스트
  const [selectedItem, setSelectedItem] = useState(-1); // 키보드로 선택된 아이템
  const hasSearchItems = searchItems.length > 0; // 검색된 리스트가 있을 경우

  const inputRef = useRef();
  const ulRef = useRef();
  const navigate = useNavigate();
  const api = new ProductsApi();

  // 모든 상품 가져와서 필요한 데이터로만 배열 만들기
  const { data: keyItems } = useQuery([], async () => {
    return api.getProducts('all').then((products) =>
      products.map((product) => ({
        id: product.id,
        title: product.title,
        category: product.category.includes('clothing')
          ? 'fashion'
          : product.category,
      }))
    );
  });

  //사용자가 keyword를 완성할때까지 기다렸다 이벤트 (연속이벤트 최소화)
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!keyword) return;
      const found = keyItems.filter(
        (item) =>
          item.title.toLowerCase().includes(keyword.toLowerCase()) === true
      );
      setSearchItems(found);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword, keyItems]);

  //상세페이지 이동 후, 상태 초기화
  const handleinit = () => {
    setSearchItems([]);
    setKeyword('');
    setSelectedItem(-1);
  };

  //마우스 이벤트
  const handleKeyDown = (event) => {
    if (searchItems.length === 0) return;
    switch (event.key) {
      case 'ArrowDown':
        if (selectedItem < searchItems.length - 1) {
          setSelectedItem((prev) => prev + 1);
          Array.from(ulRef.current.children)[selectedItem + 1].scrollIntoView({
            block: 'end',
          });
        }
        break;

      case 'ArrowUp':
        if (selectedItem > 0) {
          setSelectedItem((prev) => prev - 1);
          Array.from(ulRef.current.children)[selectedItem - 1].scrollIntoView({
            block: 'nearest',
          });
        }
        break;

      case 'Enter':
        if (selectedItem !== -1) {
          const item = searchItems[selectedItem];
          navigate(`/${item.category}/product/${item.id}`);
          handleinit();
        }
        break;
    }
  };

  //input 외 클릭시 Search 닫기
  const onCloseSearch = (event) => {
    if (event.activeElement !== inputRef.current) {
      setSearchItems([]);
    }
  };

  //이벤트는 계속 렌더링 되지 않아도됨
  useEffect(() => {
    if (!hasSearchItems) return;
    document.addEventListener('click', onCloseSearch);
  }, [hasSearchItems]);

  return (
    <div className={styles.search}>
      <input
        type='text'
        placeholder='검색'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      {hasSearchItems && keyword && (
        <div className={styles.search_list}>
          <ul ref={ulRef}>
            {searchItems.map(({ id, category, title }, index) => (
              <li
                key={id}
                onClick={handleinit}
                className={selectedItem === index ? styles.active : ''}
              >
                <Link to={`/${category}/product/${id}`}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
