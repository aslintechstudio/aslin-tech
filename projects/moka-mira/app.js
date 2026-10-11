'use strict';

const storageKey = 'moka-mira-sepet-v1';
const productById = new Map(products.map(product => [product.id, product]));
const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });
const money = cents => currency.format(cents / 100);
const $ = selector => document.querySelector(selector);
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));
const normalize = value => value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').trim();

let storageAvailable = true;
let activeCategory = 'Tümü';
let currentProduct = null;
let detailQuantity = 1;
let selectedOptions = {};
let orderSnapshot = null;
let toastTimer;

function defaultOptions(product) {
  return Object.fromEntries(product.groups.map(group => [group, optionGroups[group].values[0].id]));
}

function validOptions(product, options) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) return false;
  if (Object.keys(options).length !== product.groups.length) return false;
  return product.groups.every(group => optionGroups[group].values.some(value => value.id === options[group]));
}

function unitPrice(product, options) {
  return product.price + product.groups.reduce((sum, group) =>
    sum + optionGroups[group].values.find(value => value.id === options[group]).extra, 0);
}

function itemKey(product, options) {
  return [product.id, ...product.groups.map(group => `${group}:${options[group]}`)].join('|');
}

function optionsText(product, options) {
  return product.groups.map(group => optionGroups[group].values.find(value => value.id === options[group]).label).join(' · ') || 'Standart servis';
}

// Depolanan fiyatlara güvenilmez: her açılışta menü verisinden hesaplanır.
function sanitizeCart(input) {
  if (!Array.isArray(input)) return [];
  const clean = new Map();
  input.slice(0, 300).forEach(item => {
    if (!item || typeof item !== 'object') return;
    const product = productById.get(item.productId);
    if (!product || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99 || !validOptions(product, item.options)) return;
    const key = itemKey(product, item.options);
    const existing = clean.get(key);
    if (existing) existing.quantity = Math.min(99, existing.quantity + item.quantity);
    else clean.set(key, { productId: product.id, options: { ...item.options }, quantity: item.quantity });
  });
  return [...clean.values()];
}

function readCart() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return [];
    try { return sanitizeCart(JSON.parse(stored)); }
    catch { localStorage.removeItem(storageKey); return []; }
  } catch {
    storageAvailable = false;
    return [];
  }
}

let cart = readCart();

function saveCart() {
  try { localStorage.setItem(storageKey, JSON.stringify(cart)); storageAvailable = true; }
  catch { storageAvailable = false; }
  updateCartCount();
}

function cartTotal(items = cart) {
  return items.reduce((sum, item) => sum + unitPrice(productById.get(item.productId), item.options) * item.quantity, 0);
}

function updateCartCount() {
  $('#cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function announce(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').hidden = false;
  toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 4500);
}

function productCard(product) {
  return `<article class="product-card">
    <div class="product-photo"><img src="assets/${product.image}.webp" width="1200" height="900" alt="${escapeHTML(product.name)} için temsili ürün fotoğrafı" loading="lazy">${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}</div>
    <div class="product-body"><p class="product-category">${escapeHTML(product.category)}</p><h3>${escapeHTML(product.name)}</h3><p class="product-description">${escapeHTML(product.description)}</p><div class="product-bottom"><span class="product-price">${money(product.price)}${product.groups.some(group => optionGroups[group].values.some(value => value.extra)) ? '<small>başlangıç fiyatı</small>' : '<small>bir porsiyon</small>'}</span><button class="add-product" data-product="${product.id}" type="button" aria-label="${escapeHTML(product.name)} seçeneklerini aç">+</button></div></div>
    <button class="card-link" data-product="${product.id}" type="button" aria-label="${escapeHTML(product.name)} ürününü incele"></button>
  </article>`;
}

function renderMenu() {
  const query = normalize($('#search').value);
  const filtered = products.filter(product => (activeCategory === 'Tümü' || product.category === activeCategory) && normalize(`${product.name} ${product.description} ${product.category}`).includes(query));
  $('#menu-products').innerHTML = filtered.map(productCard).join('');
  $('#result-count').textContent = `${filtered.length} ürün ${query || activeCategory !== 'Tümü' ? 'bulundu' : 'menüde'}`;
  $('#no-results').hidden = filtered.length !== 0;
  $('#categories').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === activeCategory)));
}

function openProduct(id) {
  const product = productById.get(id);
  if (!product) return;
  currentProduct = product;
  selectedOptions = defaultOptions(product);
  detailQuantity = 1;
  $('#product-detail').innerHTML = `<div class="product-detail-grid"><img class="detail-image" src="assets/${product.image}.webp" alt="${escapeHTML(product.name)} için temsili fotoğraf"><div class="detail-copy"><p class="eyebrow">${escapeHTML(product.category)}</p><h2 id="product-title">${escapeHTML(product.name)}</h2><p class="detail-description">${escapeHTML(product.description)}</p><p class="allergen-note">${escapeHTML(product.note)}</p><form id="product-form">
    ${product.groups.map(group => `<fieldset class="option-group"><legend>${optionGroups[group].label}</legend><div class="option-choices">${optionGroups[group].values.map((value, index) => `<label class="option-choice"><input type="radio" name="${group}" value="${value.id}" ${index === 0 ? 'checked' : ''}><span>${value.label}${value.extra ? ` <small>+${money(value.extra)}</small>` : ''}</span></label>`).join('')}</div></fieldset>`).join('')}
    <div class="detail-purchase"><div class="price-row"><span>Seçiminizin toplamı</span><strong id="detail-total" role="status" aria-live="polite"></strong></div><div class="purchase-row"><div class="quantity-control"><button type="button" data-detail-quantity="-1" aria-label="Ürün miktarını azalt">−</button><output id="detail-quantity" aria-label="Ürün miktarı">1</output><button type="button" data-detail-quantity="1" aria-label="Ürün miktarını artır">+</button></div><button class="button primary" type="submit">Sepete ekle <span aria-hidden="true">+</span></button></div></div></form><p class="detail-note">Temsili fotoğraf · Kurgusal ürün · Gerçek satış yapılmaz.</p></div></div>`;
  $('#product-form').addEventListener('change', event => {
    if (product.groups.includes(event.target.name)) {
      selectedOptions[event.target.name] = event.target.value;
      updateDetailPrice();
    }
  });
  $('#product-form').addEventListener('submit', event => {
    event.preventDefault();
    addToCart(product.id, selectedOptions, detailQuantity);
    $('#product-dialog').close();
  });
  updateDetailPrice();
  $('#product-dialog').showModal();
}

function updateDetailPrice() {
  $('#detail-total').textContent = money(unitPrice(currentProduct, selectedOptions) * detailQuantity);
  $('#detail-quantity').textContent = detailQuantity;
  $('[data-detail-quantity="-1"]').disabled = detailQuantity <= 1;
  $('[data-detail-quantity="1"]').disabled = detailQuantity >= 99;
}

function addToCart(productId, options, quantity) {
  const product = productById.get(productId);
  if (!product || !validOptions(product, options) || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) return;
  const key = itemKey(product, options);
  const existing = cart.find(item => itemKey(productById.get(item.productId), item.options) === key);
  const capped = existing && existing.quantity + quantity > 99;
  if (existing) existing.quantity = Math.min(99, existing.quantity + quantity);
  else cart.push({ productId, options: { ...options }, quantity });
  saveCart();
  announce(capped ? 'Bir ürün seçimi için en fazla 99 adet eklenebilir.' : `${product.name} sepete eklendi.${storageAvailable ? '' : ' Tarayıcı depolaması kapalı; sepet yalnızca bu oturumda korunur.'}`);
}

function storageNotice() {
  return storageAvailable ? '' : '<p class="storage-note" role="status">Tarayıcı depolaması kullanılamıyor. Sepet bu oturumda çalışır; sayfa yenilendiğinde korunmayabilir.</p>';
}

function totalsMarkup(items = cart) {
  const total = money(cartTotal(items));
  return `<div class="totals"><div><span>Ara toplam</span><span>${total}</span></div><div><span>Ek ücret</span><span>${money(0)}</span></div><div class="grand-total"><strong>Genel toplam</strong><strong>${total}</strong></div></div>`;
}

function renderCart() {
  updateCartCount();
  if (!cart.length) {
    $('#cart-content').innerHTML = `${storageNotice()}<div class="empty-state"><span aria-hidden="true">☕</span><h3>Henüz bir mola seçmediniz.</h3><p>Menüden kahvenizi ve yanına bir lezzet seçin.</p><button class="button primary" type="button" data-browse>Menüyü İncele <span aria-hidden="true">↗</span></button></div>`;
    return;
  }
  $('#cart-content').innerHTML = `${storageNotice()}<div class="cart-topline"><span>${cart.length} farklı seçim</span><button class="clear-cart" type="button" data-clear-cart>Sepeti boşalt</button></div>${cart.map((item, index) => {
    const product = productById.get(item.productId);
    return `<article class="cart-item"><img src="assets/${product.image}.webp" width="70" height="80" alt="${escapeHTML(product.name)}" loading="lazy"><div><h3>${escapeHTML(product.name)}</h3><p class="cart-options">${escapeHTML(optionsText(product, item.options))}<br>Birim fiyat: ${money(unitPrice(product, item.options))}</p><div class="quantity-control"><button type="button" data-quantity="-1" data-index="${index}" ${item.quantity === 1 ? 'disabled' : ''} aria-label="${escapeHTML(product.name)} miktarını azalt">−</button><output aria-label="Ürün miktarı">${item.quantity}</output><button type="button" data-quantity="1" data-index="${index}" ${item.quantity === 99 ? 'disabled' : ''} aria-label="${escapeHTML(product.name)} miktarını artır">+</button></div></div><div><span class="cart-item-price">${money(unitPrice(product, item.options) * item.quantity)}</span><button class="remove-item" type="button" data-remove="${index}" aria-label="${escapeHTML(product.name)} seçimini sepetten sil">Sil</button></div></article>`;
  }).join('')}${totalsMarkup()}<button class="button primary full-width" type="button" data-checkout>Siparişi Tamamla <span aria-hidden="true">↗</span></button><p class="cart-demo">Yalnızca demo deneyimi. Gerçek sipariş gönderilmez, ödeme alınmaz ve kişisel bilgi istenmez.</p>`;
}

function openCart() {
  renderCart();
  $('#cart-dialog').showModal();
}

function summaryMarkup(items) {
  return items.map(item => {
    const product = productById.get(item.productId);
    return `<div class="summary-item"><div><strong>${item.quantity} × ${escapeHTML(product.name)}</strong><span>${money(unitPrice(product, item.options) * item.quantity)}</span></div><p>${escapeHTML(optionsText(product, item.options))}</p></div>`;
  }).join('') + totalsMarkup(items);
}

function openCheckout() {
  if (!cart.length) return;
  orderSnapshot = JSON.parse(JSON.stringify(cart));
  $('#checkout-title').textContent = 'Sipariş özeti';
  $('#checkout-content').innerHTML = `${summaryMarkup(orderSnapshot)}<p class="cart-demo">Bu özet kurgusal ürünlerden oluşur. Hiçbir ödeme veya gerçek sipariş gerçekleşmez. Demo tamamlandığında sepetiniz temizlenir.</p><div class="checkout-actions"><button class="button secondary" type="button" data-back-cart>Sepete dön</button><button class="button primary" type="button" data-confirm-order>Demo siparişi oluştur</button></div>`;
  $('#cart-dialog').close();
  $('#checkout-dialog').showModal();
}

function completeOrder() {
  if (!orderSnapshot) return;
  // Başka bir sekmede sepet değiştiyse kullanıcı güncel özeti yeniden görür.
  if (JSON.stringify(cart) !== JSON.stringify(orderSnapshot)) {
    $('#checkout-dialog').close();
    openCart();
    announce('Sepetiniz değişti. Güncel seçimlerinizi kontrol edip yeniden devam edin.');
    return;
  }
  const completed = orderSnapshot;
  orderSnapshot = null;
  cart = [];
  saveCart();
  $('#checkout-title').textContent = 'Molanız hazır!';
  $('#checkout-content').innerHTML = `<div class="success-symbol" aria-hidden="true">✓</div><p class="success-text" role="status">Demo siparişiniz oluşturuldu. Bu işlem yalnızca örnek amaçlıdır; gerçek sipariş veya ödeme gerçekleşmemiştir.</p><p class="success-clear">Demo işlemi tamamlandı ve sepetiniz temizlendi.</p><p class="receipt-title">Tamamlanan demo siparişiniz</p>${summaryMarkup(completed)}<button class="button primary full-width" type="button" data-browse>Menüye dön <span aria-hidden="true">↗</span></button>`;
  $('.success-text').setAttribute('tabindex', '-1');
  $('.success-text').focus();
}

function changeCartQuantity(index, delta) {
  if (!Number.isInteger(index) || !cart[index] || ![-1, 1].includes(delta)) return;
  cart[index].quantity = Math.min(99, Math.max(1, cart[index].quantity + delta));
  saveCart();
  const scroll = $('#cart-dialog').scrollTop;
  renderCart();
  const updated = $(`[data-index="${index}"][data-quantity="${delta}"]`);
  if (updated && !updated.disabled) updated.focus({ preventScroll: true });
  else $(`[data-index="${index}"][data-quantity="${-delta}"]`)?.focus({ preventScroll: true });
  $('#cart-dialog').scrollTop = scroll;
}

function closeMenu() {
  $('#main-nav').classList.remove('open');
  $('#menu-toggle').setAttribute('aria-expanded', 'false');
  $('#menu-toggle').setAttribute('aria-label', 'Menüyü aç');
}

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.hasAttribute('data-product')) openProduct(button.dataset.product);
  else if (button.hasAttribute('data-cart')) { closeMenu(); openCart(); }
  else if (button.hasAttribute('data-close')) document.getElementById(button.dataset.close).close();
  else if (button.hasAttribute('data-detail-quantity')) {
    detailQuantity = Math.min(99, Math.max(1, detailQuantity + Number(button.dataset.detailQuantity)));
    updateDetailPrice();
  } else if (button.hasAttribute('data-quantity')) changeCartQuantity(Number(button.dataset.index), Number(button.dataset.quantity));
  else if (button.hasAttribute('data-remove')) {
    const index = Number(button.dataset.remove);
    cart.splice(index, 1); saveCart(); renderCart();
    ($('#cart-content [data-remove]') || $('#cart-content button'))?.focus();
  } else if (button.hasAttribute('data-clear-cart')) {
    cart = []; saveCart(); renderCart(); $('#cart-content button')?.focus();
  } else if (button.hasAttribute('data-checkout')) openCheckout();
  else if (button.hasAttribute('data-confirm-order')) completeOrder();
  else if (button.hasAttribute('data-back-cart')) { $('#checkout-dialog').close(); openCart(); }
  else if (button.hasAttribute('data-browse')) {
    document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
    $('#menu').scrollIntoView(); $('#search').focus({ preventScroll: true });
  } else if (button.hasAttribute('data-category')) { activeCategory = button.dataset.category; renderMenu(); }
});

$('#menu-toggle').addEventListener('click', () => {
  const open = $('#main-nav').classList.toggle('open');
  $('#menu-toggle').setAttribute('aria-expanded', String(open));
  $('#menu-toggle').setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
});
$('#main-nav').addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
  if (event.key !== 'Tab') return;
  const dialog = document.querySelector('dialog[open]');
  if (!dialog) return;
  const focusable = [...dialog.querySelectorAll('button, input, select, a[href], [tabindex="0"]')].filter(element =>
    !element.disabled && element.getClientRects().length && (element.type !== 'radio' || element.checked));
  const first = focusable[0];
  const last = focusable.at(-1);
  if (!first) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault(); last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault(); first.focus();
  } else if (!dialog.contains(document.activeElement)) {
    event.preventDefault(); first.focus();
  }
});
window.addEventListener('resize', () => { if (innerWidth > 850) closeMenu(); });
$('#search').addEventListener('input', renderMenu);
$('#reset-search').addEventListener('click', () => { activeCategory = 'Tümü'; $('#search').value = ''; renderMenu(); $('#search').focus(); });
$('#show-sweets').addEventListener('click', () => { activeCategory = categories[5]; $('#search').value = ''; renderMenu(); $('#menu').scrollIntoView(); $('#categories button[aria-pressed=true]').focus({ preventScroll: true }); });
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});
window.addEventListener('storage', event => {
  if (event.key !== storageKey && event.key !== null) return;
  cart = readCart();
  updateCartCount();
  if ($('#cart-dialog').open) renderCart();
});

$('#categories').innerHTML = ['Tümü', ...categories].map(category => `<button type="button" data-category="${escapeHTML(category)}" aria-pressed="${category === activeCategory}">${escapeHTML(category)}</button>`).join('');
$('#popular-products').innerHTML = products.filter(product => product.popular).map(productCard).join('');
$('#sweet-products').innerHTML = products.filter(product => product.sweet).map(productCard).join('');
$('#year').textContent = new Date().getFullYear();
renderMenu();
updateCartCount();
