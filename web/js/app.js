const products = [
  { id: '1', name: 'Esfirra Carne', price: 5.0, quantityAvailable: 20 },
  { id: '2', name: 'Esfirra Queijo', price: 6.0, quantityAvailable: 15 },
  { id: '3', name: 'Esfirra Pizza', price: 6.5, quantityAvailable: 10 },
];

const state = { cart: {} };

function formatPrice(v) { return 'R$ ' + v.toFixed(2).replace('.', ','); }

function renderProducts() {
  const root = document.getElementById('products');
  root.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div>
        <div class="product-name">${p.name}</div>
        <div class="product-meta">${formatPrice(p.price)} • Disponível: ${p.quantityAvailable}</div>
      </div>
      <div>
        <button class="btn btn-primary" data-id="${p.id}">Adicionar</button>
      </div>
    `;
    root.appendChild(card);
  });

  root.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id));
  });
}

function addToCart(productId) {
  state.cart[productId] = (state.cart[productId] || 0) + 1;
  renderCart();
}

function renderCart() {
  const ul = document.getElementById('cart-items');
  ul.innerHTML = '';
  const items = Object.entries(state.cart);
  let total = 0;
  items.forEach(([id, qty]) => {
    const p = products.find(x => x.id === id);
    const li = document.createElement('li');
    li.textContent = `${p.name} x ${qty} — ${formatPrice(p.price * qty)}`;
    ul.appendChild(li);
    total += p.price * qty;
  });
  document.getElementById('total').textContent = 'Total: ' + formatPrice(total);
}

function sendOrder() {
  const items = Object.entries(state.cart).map(([productId, qty]) => {
    const p = products.find(x => x.id === productId);
    return { productId, name: p.name, qty, price: p.price };
  });
  if (items.length === 0) {
    alert('Carrinho vazio');
    return;
  }
  const order = { userId: 'student-placeholder', items, total: items.reduce((s,i)=>s+i.qty*i.price,0), status: 'PENDING', createdAt: new Date().toISOString() };

  // Simular envio — substituir por fetch para backend real (Firebase)
  console.log('Enviando pedido:', order);
  alert('Pedido enviado ao funcionário. (Simulação)');
  state.cart = {};
  renderCart();
}

document.getElementById('send-order').addEventListener('click', sendOrder);
renderProducts();
renderCart();
