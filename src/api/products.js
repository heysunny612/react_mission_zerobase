import axios from 'axios';

export default class ProductsApi {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://fakestoreapi.com/products/',
    });
  }
  //카테고리가 있다면 -> 예외처리 / 없다면 -> 모두 보여주기
  async getProducts(category) {
    return category
      ? this.#productsFromCategory(category)
      : this.#allProducts();
  }

  //특정카테고리 상품
  async #productsFromCategory(category) {
    // 카테고리가 패션이라면 예외적 처리
    if (category === 'fashion') {
      return this.httpClient
        .get()
        .then((data) => data.data)
        .then((products) =>
          products.filter((p) => p.category.includes('clothing'))
        );
    }
    if (category) {
      return this.httpClient
        .get(`category/${category}`)
        .then((data) => data.data);
    }
  }

  async #allProducts() {
    return this.httpClient.get().then((data) => data.data);
  }

  //상품 상세페이지
  async getProductDetail(id) {
    return this.httpClient.get(`${id}`).then((data) => data.data);
  }
}
