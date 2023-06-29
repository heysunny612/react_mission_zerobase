# 리액트 프로젝트 제로베이스 프레임워크 미션 쇼핑몰 만들기 

<p align="center">
    <img src="https://github.com/heysunny612/react_mission_zerobase/assets/127499117/48e87a41-2e34-45fc-8a96-7144a03d50a0" alt="1">
</p>

<br/>

## 로컬스토리지+context를 사용한 장바구니 구현


 <br/>

```js
const CartContext = createContext();

const CART_ITEMS = 'Cart_Items';
const fromLocalStorage = () => {
  const cartItems = localStorage.getItem(CART_ITEMS);
  return cartItems ? JSON.parse(cartItems) : [];
};
export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => fromLocalStorage());

  useEffect(() => {
    localStorage.setItem(CART_ITEMS, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);


```

<br/>
<br/>

<p align="center">
    <img src="https://github.com/heysunny612/react_mission_zerobase/assets/127499117/5f100f85-a004-48ae-bb71-1ee158601195" alt="2">
</p>


<br/>

## 키보드이벤트+includes 메소드를 사용한 검색영역 구현 

```js
export default function Search({ mobileSearch }) {
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
    <div className={`${styles.search} ${mobileSearch ? styles.active : null}`}>
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

```

<br/>

| 제목 | 설명 |
| --- | --- |
| 구현 사항 | -Fake Store API 데이터 사용하여 쇼핑몰 구현  <br/>-키보드 KEY DOWN 이벤트 검색영역에 적용  <br/> -context 를 사용한 전역상태 관리 (장바구니,테마) <br/> -API 로딩시 스켈레톤 구현 |
| 라이브러리 | react-query, react-responsive-carousel, react-router-dom, sass|
| css 및 반응형  | SASS+Post CSS사용 , 반응형 구현  |
| 배포 주소  | Netlify [https://sunny-trello.netlify.app/ ](https://zero-shop.netlify.app/)|
| 소스 코드  | Github [https://github.com/heysunny612/ts-trello](https://github.com/heysunny612/react_mission_zerobase)|


