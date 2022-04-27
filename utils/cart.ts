export function save2localStorage(product) {
  const lc = localStorage.getItem('cart');
  let localCart = [];
  if (lc) {
    localCart = JSON.parse(lc);
  }
  const indexProduct = localCart.findIndex(
    (localProduct) =>
      localProduct.id === product.id &&
      localProduct.option.id === product.option.id
  );
  console.log(indexProduct);
  if (indexProduct === -1) {
    localCart.push(product);
  } else {
    localCart[indexProduct].quantity = product.quantity;
  }
  localStorage.setItem('cart', JSON.stringify(localCart));
}
