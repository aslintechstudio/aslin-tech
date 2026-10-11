'use strict';

// Statik veri; arama, favoriler ve randevu yalnızca tarayıcıda çalışır.
const $ = (selector, root = document) => root.querySelector(selector);
const properties = NOVA_PROPERTIES;
const propertyById = new Map(properties.map(property => [property.id, property]));
const currency = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
const dateFormat = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
const monthFormat = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' });
const favoritesKey = 'nova-emlak-favoriler-v1';
const filterForm = $('#filter-form');
const detailDialog = $('#property-dialog');
const bookingDialog = $('#booking-dialog');
let detailProperty = null;
let galleryIndex = 0;
let routeClosing = false;
let notificationTimer;
let inputTimer;
let favorites = new Set();

const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const priceText = property => `${currency.format(property.price)} TL`;
const areaText = property => `${currency.format(property.area)} m²`;
const roomText = property => property.rooms === 'Belirtilmemiş' ? 'Oda bilgisi yok' : `${property.rooms} oda`;
const listingURL = id => `?ilan=${encodeURIComponent(id)}`;

function notify(message) {
  const notification = detailDialog.open ? ($('#detail-feedback') || $('#notification')) : $('#notification');
  clearTimeout(notificationTimer);
  $('#notification').hidden = true;
  if ($('#detail-feedback')) $('#detail-feedback').hidden = true;
  notification.textContent = message;
  notification.hidden = false;
  notificationTimer = setTimeout(() => { notification.hidden = true; }, 3500);
}

try {
  const saved = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
  if (Array.isArray(saved)) favorites = new Set(saved.filter(id => propertyById.has(id)));
} catch {
  // Bozuk veri veya kapalı depolama, ilanların kullanımını engellemez.
}

function favoriteLabel(property) {
  return `${property.title}: ${favorites.has(property.id) ? 'favorilerden çıkar' : 'favorilere ekle'}`;
}

function propertyCard(property) {
  const image = property.images[0];
  return `<article class="property-card" data-id="${property.id}">
    <div class="card-image">
      <a href="${listingURL(property.id)}" data-property="${property.id}" aria-label="${escapeHTML(property.title)} ilanını incele"><img src="${image.src}" width="1200" height="800" loading="lazy" alt="${escapeHTML(image.alt)}"></a>
      <span class="card-tag">${property.status} · ${property.type}</span>
      <button class="favorite-button" data-favorite="${property.id}" type="button" aria-pressed="${favorites.has(property.id)}" aria-label="${escapeHTML(favoriteLabel(property))}">${favorites.has(property.id) ? '♥' : '♡'}</button>
    </div>
    <div class="card-body"><p class="card-location"><span aria-hidden="true">⌖</span> ${property.city} / ${property.district}</p>
      <h3 class="card-title"><a href="${listingURL(property.id)}" data-property="${property.id}">${escapeHTML(property.title)}</a></h3>
      <div class="card-specs"><span>${areaText(property)}</span><span>${roomText(property)}</span><span>${property.type}</span></div>
      <div class="card-bottom"><p class="card-price">${priceText(property)}${property.status === 'Kiralık' ? '<small> / ay</small>' : ''}</p><a class="card-open" href="${listingURL(property.id)}" data-property="${property.id}" aria-label="${escapeHTML(property.title)} detaylarını aç">↗</a></div>
    </div></article>`;
}

function renderFavorites() {
  const selected = properties.filter(property => favorites.has(property.id));
  $('#favorites-grid').innerHTML = selected.map(propertyCard).join('');
  $('#empty-favorites').hidden = selected.length > 0;
  $('#favorite-count').textContent = selected.length;
  document.querySelectorAll('[data-favorite]').forEach(button => {
    const property = propertyById.get(button.dataset.favorite);
    if (!property) return;
    const selected = favorites.has(property.id);
    button.setAttribute('aria-pressed', String(selected));
    button.setAttribute('aria-label', favoriteLabel(property));
    button.textContent = button.classList.contains('favorite-button') ? (selected ? '♥' : '♡') : (selected ? '♥ Favorilerden çıkar' : '♡ Favorilere ekle');
  });
}

function toggleFavorite(id) {
  const property = propertyById.get(id);
  if (!property) return;
  const fromFavorites = Boolean(document.activeElement?.closest('#favorites-grid [data-favorite]'));
  const isRemoving = favorites.has(id);
  if (isRemoving) favorites.delete(id); else favorites.add(id);
  let persisted = true;
  try { localStorage.setItem(favoritesKey, JSON.stringify([...favorites])); }
  catch { persisted = false; }
  renderFavorites();
  if (fromFavorites) ($('#favorites-grid [data-favorite]') || $('#empty-favorites a'))?.focus({ preventScroll: true });
  notify(persisted ? (isRemoving ? 'İlan favorilerinizden çıkarıldı.' : 'İlan favorilerinize eklendi.') : 'Tarayıcı kaydı kapalı. Favorileriniz yalnızca bu oturumda tutulacak.');
}

function fillCities() {
  const cities = [...new Set(properties.map(property => property.city))].sort((a, b) => a.localeCompare(b, 'tr'));
  document.querySelectorAll('select[name="city"]').forEach(select => {
    cities.forEach(city => select.add(new Option(city, city)));
  });
}

function updateDistricts() {
  const selectedCity = filterForm.elements.city.value;
  const districtSelect = filterForm.elements.district;
  const previous = districtSelect.value;
  const districts = [...new Set(properties.filter(property => !selectedCity || property.city === selectedCity).map(property => property.district))].sort((a, b) => a.localeCompare(b, 'tr'));
  districtSelect.replaceChildren(new Option('Tüm ilçeler', ''));
  districts.forEach(district => districtSelect.add(new Option(district, district)));
  if (districts.includes(previous)) districtSelect.value = previous;
}

function getFilteredProperties() {
  const form = filterForm.elements;
  const numberFields = ['minPrice', 'maxPrice', 'minArea', 'maxArea'];
  const numbers = {};
  for (const key of numberFields) {
    const input = form[key];
    if (input.validity.badInput) return { error: 'Fiyat ve metrekare alanlarına geçerli bir sayı yazın.', items: [] };
    numbers[key] = input.value === '' ? null : Number(input.value);
    if (numbers[key] !== null && (!Number.isFinite(numbers[key]) || numbers[key] < 0)) return { error: 'Fiyat ve metrekare değerleri sıfır veya daha büyük olmalı.', items: [] };
  }
  if (numbers.minPrice !== null && numbers.maxPrice !== null && numbers.minPrice > numbers.maxPrice) return { error: 'En düşük fiyat, en yüksek fiyattan büyük olamaz.', items: [] };
  if (numbers.minArea !== null && numbers.maxArea !== null && numbers.minArea > numbers.maxArea) return { error: 'En düşük metrekare, en yüksek metrekareden büyük olamaz.', items: [] };
  const items = properties.filter(property =>
    (!form.status.value || property.status === form.status.value) &&
    (!form.type.value || property.type === form.type.value) &&
    (!form.city.value || property.city === form.city.value) &&
    (!form.district.value || property.district === form.district.value) &&
    (!form.rooms.value || property.rooms === form.rooms.value) &&
    (numbers.minPrice === null || property.price >= numbers.minPrice) &&
    (numbers.maxPrice === null || property.price <= numbers.maxPrice) &&
    (numbers.minArea === null || property.area >= numbers.minArea) &&
    (numbers.maxArea === null || property.area <= numbers.maxArea)
  );
  return { error: '', items };
}

function renderCatalog() {
  const { error, items } = getFilteredProperties();
  const order = $('#sort-order').value;
  const sorts = { 'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price, 'area-asc': (a, b) => a.area - b.area, 'area-desc': (a, b) => b.area - a.area };
  if (sorts[order]) items.sort(sorts[order]);
  const errorElement = $('#filter-error');
  errorElement.textContent = error;
  errorElement.hidden = !error;
  $('#property-grid').innerHTML = items.map(propertyCard).join('');
  $('#result-count').textContent = `${items.length} örnek ilan bulundu · ${properties.length} ilan içinde`;
  $('#no-results').hidden = items.length > 0 || Boolean(error);
}

function resetFilters() {
  filterForm.reset();
  $('#sort-order').value = 'recommended';
  $('#hero-search').reset();
  updateDistricts();
  renderCatalog();
}

// Detay URL'si aynı statik dosya üzerinde ?ilan=nova-001 olarak çalışır.
function renderDetail(property) {
  detailProperty = property;
  galleryIndex = 0;
  const similarityScore = candidate => (candidate.type === property.type ? 4 : 0) + (candidate.status === property.status ? 2 : 0) + (candidate.city === property.city ? 1 : 0);
  const similar = properties.filter(candidate => candidate.id !== property.id).sort((a, b) => similarityScore(b) - similarityScore(a)).slice(0, 2);
  $('#property-detail').innerHTML = `<div class="detail-main">
    <div class="detail-gallery"><div class="gallery-stage"><img id="gallery-image" src="${property.images[0].src}" alt="${escapeHTML(property.images[0].alt)}" width="1200" height="800"><div class="gallery-controls"><button class="icon-button" id="gallery-prev" type="button" aria-label="Önceki fotoğraf">‹</button><span class="gallery-count" id="gallery-count" aria-live="polite">1 / ${property.images.length}</span><button class="icon-button" id="gallery-next" type="button" aria-label="Sonraki fotoğraf">›</button></div></div>
      <div class="gallery-thumbnails">${property.images.map((image, index) => `<button class="gallery-thumb" type="button" data-photo="${index}" aria-label="${index + 1}. fotoğrafı göster" aria-pressed="${index === 0}"><img src="${image.src}" width="1200" height="800" alt="" loading="lazy"></button>`).join('')}</div><p class="gallery-note">Görseller temsili stok fotoğraflardır; aynı taşınmazı göstermez.</p>
    </div>
    <div class="detail-copy"><p class="detail-status">${property.status} ${property.type.toLocaleLowerCase('tr-TR')} · ${property.id.toUpperCase()}</p><h2 id="detail-title">${escapeHTML(property.title)}</h2><p class="detail-location">${property.city} / ${property.district}</p><p class="detail-price">${priceText(property)} ${property.status === 'Kiralık' ? '<small>/ ay</small>' : ''}</p>
      <dl class="detail-facts"><div><dt>Alan</dt><dd>${areaText(property)}</dd></div><div><dt>Oda</dt><dd>${property.rooms === 'Belirtilmemiş' ? 'Belirtilmemiş' : property.rooms}</dd></div><div><dt>Gayrimenkul türü</dt><dd>${property.type}</dd></div></dl>
      <div class="detail-actions"><button class="button button-primary" type="button" data-book="${property.id}">Ziyaret planla <span aria-hidden="true">↗</span></button><button class="button button-outline" type="button" data-favorite="${property.id}" aria-pressed="${favorites.has(property.id)}" aria-label="${escapeHTML(favoriteLabel(property))}">${favorites.has(property.id) ? '♥ Favorilerden çıkar' : '♡ Favorilere ekle'}</button></div><p id="detail-feedback" class="detail-feedback" role="status" hidden></p><p class="detail-demo-note">Kurgusal ilan ve örnek fiyat. Gerçek satış veya kiralama teklifi değildir.</p>
    </div></div>
    <div class="detail-lower"><h3>Bu yaşam alanı hakkında</h3><p class="detail-description">${escapeHTML(property.description)}</p><ul class="detail-features">${property.features.map(feature => `<li>${escapeHTML(feature)}</li>`).join('')}</ul></div>
    ${similar.length ? `<div class="detail-lower"><h3>Benzer ilanlar</h3><div class="property-grid related-grid">${similar.map(propertyCard).join('')}</div></div>` : '<div class="detail-lower"><p class="detail-description">Bu türde başka bir örnek ilan bulunmuyor. Diğer seçenekler için ilan listesine dönebilirsiniz.</p></div>'}`;
  document.title = `${property.title} | NOVA Emlak`;
}

function setGallery(index) {
  if (!detailProperty) return;
  galleryIndex = (index + detailProperty.images.length) % detailProperty.images.length;
  const image = detailProperty.images[galleryIndex];
  $('#gallery-image').src = image.src;
  $('#gallery-image').alt = image.alt;
  $('#gallery-count').textContent = `${galleryIndex + 1} / ${detailProperty.images.length}`;
  detailDialog.querySelectorAll('[data-photo]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.photo) === galleryIndex)));
}

function openProperty(id, updateURL = true) {
  const property = propertyById.get(id);
  if (!property) return;
  if (updateURL) {
    const url = new URL(location.href);
    url.searchParams.set('ilan', id);
    url.hash = '';
    history.pushState(null, '', url);
  }
  renderDetail(property);
  if (!detailDialog.open) detailDialog.showModal();
  detailDialog.scrollTop = 0;
}

function clearDetailURL() {
  const url = new URL(location.href);
  if (url.searchParams.has('ilan')) {
    url.searchParams.delete('ilan');
    history.replaceState(null, '', url);
  }
  document.title = 'NOVA Emlak | Yeni yaşamınıza bir adım';
}

function syncRoute() {
  const id = new URLSearchParams(location.search).get('ilan');
  if (id && propertyById.has(id)) openProperty(id, false);
  else {
    routeClosing = true;
    if (bookingDialog.open) bookingDialog.close();
    if (detailDialog.open) detailDialog.close();
    if (id) { clearDetailURL(); notify('Bu örnek ilan bulunamadı. İlan listesinden başka bir seçenek seçebilirsiniz.'); }
    routeClosing = false;
    document.title = 'NOVA Emlak | Yeni yaşamınıza bir adım';
  }
}

// Yerel günler ISO biçiminde karşılaştırılır; arayüzde yalnızca Türkçe tarih gösterilir.
const dayKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const todayKey = () => dayKey(new Date());
let calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let selectedDate = '';

function dateFromKey(key) {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function renderCalendar() {
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const start = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  $('#calendar-month').textContent = monthFormat.format(calendarMonth);
  const now = new Date();
  $('#calendar-prev').disabled = year === now.getFullYear() && month === now.getMonth();
  const cells = Array.from({ length: start }, () => '<span aria-hidden="true"></span>');
  for (let day = 1; day <= days; day += 1) {
    const date = new Date(year, month, day);
    const key = dayKey(date);
    const disabled = key <= todayKey();
    cells.push(`<button class="calendar-day" data-date="${key}" type="button" aria-label="${dateFormat.format(date)}" aria-pressed="${key === selectedDate}" ${disabled ? 'disabled' : ''}>${day}</button>`);
  }
  $('#calendar-days').innerHTML = cells.join('');
}

function clearBookingMessages() {
  $('#booking-error').hidden = true;
  $('#booking-success').hidden = true;
}

function updateBookingSummary() {
  const property = propertyById.get($('#booking-property').value);
  const time = $('#booking-time').value;
  const summary = $('#booking-summary');
  summary.replaceChildren();
  const title = document.createElement('strong');
  title.textContent = 'Örnek ziyaret özeti';
  const line = document.createElement('div');
  line.textContent = property ? `${property.title} · ${property.city} / ${property.district}` : 'Gayrimenkul seçin.';
  const schedule = document.createElement('div');
  schedule.textContent = `${selectedDate ? dateFormat.format(dateFromKey(selectedDate)) : 'Henüz tarih seçilmedi'} · ${time || 'Henüz saat seçilmedi'}`;
  summary.append(title, line, schedule);
}

function openBooking(id) {
  selectedDate = '';
  const now = new Date();
  calendarMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  $('#booking-property').value = propertyById.has(id) ? id : properties[0].id;
  $('#booking-time').value = '';
  clearBookingMessages();
  renderCalendar();
  updateBookingSummary();
  if (!bookingDialog.open) bookingDialog.showModal();
  bookingDialog.scrollTop = 0;
}

// Arayüz olayları
const menuButton = $('#menu-toggle');
const mainNav = $('#main-nav');
function closeMenu() {
  mainNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Menüyü aç');
}
menuButton.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
});
mainNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mainNav.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  const target = event.target.closest('button, a');
  if (!target) {
    const card = event.target.closest('.property-card');
    if (card && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !window.getSelection()?.toString()) openProperty(card.dataset.id);
    return;
  }
  if (target.dataset.favorite) toggleFavorite(target.dataset.favorite);
  if (target.dataset.property && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
    event.preventDefault();
    openProperty(target.dataset.property);
  }
  if (target.dataset.book) openBooking(target.dataset.book);
  if (target.dataset.close) document.getElementById(target.dataset.close).close();
  if (target.dataset.photo !== undefined) setGallery(Number(target.dataset.photo));
  if (target.id === 'gallery-prev') setGallery(galleryIndex - 1);
  if (target.id === 'gallery-next') setGallery(galleryIndex + 1);
});
detailDialog.addEventListener('close', () => { if (!routeClosing) clearDetailURL(); });
window.addEventListener('popstate', syncRoute);
filterForm.addEventListener('submit', event => { event.preventDefault(); renderCatalog(); });
filterForm.addEventListener('change', event => { if (event.target.name === 'city') updateDistricts(); renderCatalog(); });
filterForm.addEventListener('input', event => {
  if (event.target.tagName !== 'INPUT') return;
  clearTimeout(inputTimer);
  inputTimer = setTimeout(renderCatalog, 180);
});
$('#sort-order').addEventListener('change', renderCatalog);
$('#reset-filters').addEventListener('click', resetFilters);
$('#empty-reset').addEventListener('click', resetFilters);
$('#hero-search').addEventListener('submit', event => {
  event.preventDefault();
  filterForm.reset();
  for (const field of ['status', 'type', 'city']) filterForm.elements[field].value = event.currentTarget.elements[field].value;
  updateDistricts();
  renderCatalog();
  $('#ilanlar').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
});
$('#open-booking').addEventListener('click', () => openBooking());
$('#calendar-prev').addEventListener('click', () => {
  if ($('#calendar-prev').disabled) return;
  calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
  renderCalendar();
});
$('#calendar-next').addEventListener('click', () => {
  calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1);
  renderCalendar();
});
$('#calendar-days').addEventListener('click', event => {
  const button = event.target.closest('[data-date]');
  if (!button || button.disabled || button.dataset.date <= todayKey()) return;
  selectedDate = button.dataset.date;
  clearBookingMessages();
  renderCalendar();
  const selectedButton = $(`[data-date="${selectedDate}"]`);
  selectedButton?.focus({ preventScroll: true });
  updateBookingSummary();
});
$('#booking-property').addEventListener('change', () => { clearBookingMessages(); updateBookingSummary(); });
$('#booking-time').addEventListener('change', () => { clearBookingMessages(); updateBookingSummary(); });
$('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const property = propertyById.get($('#booking-property').value);
  const time = $('#booking-time').value;
  const allowedTimes = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];
  const error = $('#booking-error');
  clearBookingMessages();
  let message = '';
  if (!property || !selectedDate || !allowedTimes.includes(time)) message = 'Lütfen bir gayrimenkul, gelecek tarih ve saat seçin.';
  else if (selectedDate <= todayKey()) message = 'Geçmiş bir gün veya bugün seçilemez. Gelecek bir tarih seçin.';
  if (message) { error.textContent = message; error.hidden = false; return; }
  updateBookingSummary();
  const success = $('#booking-success');
  success.textContent = 'Demo randevunuz oluşturuldu. Bu işlem yalnızca örnek amaçlıdır; gerçek bir rezervasyon yapılmamıştır.';
  success.hidden = false;
  success.scrollIntoView({ behavior: 'auto', block: 'nearest' });
});

fillCities();
updateDistricts();
$('#featured-grid').innerHTML = properties.filter(property => property.featured).map(propertyCard).join('');
properties.forEach(property => $('#booking-property').add(new Option(`${property.title} — ${property.city} / ${property.district}`, property.id)));
renderCatalog();
renderFavorites();
$('#year').textContent = new Date().getFullYear();
syncRoute();
