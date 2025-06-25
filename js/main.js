function Card(name, price, image, available) {
  let list = document.getElementById('list');
  let div = document.createElement('article');
  div.className = `product ${available}`;

  div.innerHTML = `
    <img
      src="${image}"
      alt="Perfume"
      class="product__img"
      width="150"
      height="150"
      loading="lazy"
    />
    <h2 class="product__price">€${price}</h2>
    <h3 class="product__title">${name}</h3>
    <p class="product__rating" aria-label="Five star rating">★★★★★</p>
    <button class="product__button" type="button">Add to Cart</button>
    <button class="product__remove-button" type="button" title="Remove from cart">Remove</button>
  `;

  list.appendChild(div);

  const addButton = div.querySelector('.product__button');
  const removeButton = div.querySelector('.product__remove-button');

  addButton.addEventListener('click', onAddToCartClick);
  removeButton.addEventListener('click', onRemoveFromCartClick);
}

async function fetchProducts() {
  const response = await fetch('js/info.json');
  const data = await response.json();
  let prod = data.Products;

  prod.forEach(prod => {
    Card(prod.name, prod.price, prod.image, prod.available);
  });
} 

const cartCountEl = document.getElementById('cart-count');
let cartCount = 0;

function updateCartCount() {
  cartCountEl.textContent = cartCount;
  const cart = document.querySelector('.cart');
  cart.setAttribute('aria-label', `Shopping cart with ${cartCount} item${cartCount !== 1 ? 's' : ''}`);
}

function showAddedAlert(productName) {
  alert(`Product "${productName}" is toegevoegd aan het winkelmandje.`);
}

function onAddToCartClick(event) {
  const product = event.target.closest('.product');
  if (!product || product.classList.contains('product--not-available')) return;
  const titleEl = product.querySelector('.product__title');
  const productName = titleEl ? titleEl.textContent.trim() : 'Product';
  cartCount++;
  updateCartCount();
  showAddedAlert(productName);
}

function onRemoveFromCartClick(event) {
  if (cartCount === 0) return;
  cartCount--;
  updateCartCount();
}

fetchProducts();
updateCartCount();
