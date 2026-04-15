const WHATSAPP_NUMBER = '5491123456789';

const cars = [
  { slug: 'toyota-corolla-xei-2022', brand: 'Toyota', model: 'Corolla XEI', year: 2022, km: 34000, type: 'Sedán', fuel: 'Nafta', price: 28900000, image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80' },
  { slug: 'volkswagen-tcross-highline-2023', brand: 'Volkswagen', model: 'T-Cross Highline', year: 2023, km: 18500, type: 'SUV', fuel: 'Nafta', price: 33400000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80' },
  { slug: 'ford-ranger-xlt-4x4-2021', brand: 'Ford', model: 'Ranger XLT 4x4', year: 2021, km: 63000, type: 'Pick-up', fuel: 'Diésel', price: 37800000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80' },
  { slug: 'peugeot-208-allure-2024', brand: 'Peugeot', model: '208 Allure', year: 2024, km: 9000, type: 'Hatchback', fuel: 'Nafta', price: 26900000, image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1600&q=80' }
];

const money = (n) => `$${n.toLocaleString('es-AR')}`;
const wa = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

function carCard(car) {
  return `
  <article class="car">
    <img src="${car.image}" alt="${car.brand} ${car.model}" loading="lazy" />
    <h3>${car.brand} ${car.model}</h3>
    <p>${car.year} · ${car.km.toLocaleString('es-AR')} km · ${car.fuel}</p>
    <p class="price">${money(car.price)}</p>
    <a class="btn" href="${wa(`Hola! Me interesa el ${car.brand} ${car.model} ${car.year}`)}" target="_blank">Consultar</a>
    <a href="detalle.html?slug=${car.slug}">Ver detalle →</a>
  </article>`;
}

const featured = document.getElementById('featured-cars');
if (featured) featured.innerHTML = cars.slice(0, 3).map(carCard).join('');

const stockRoot = document.getElementById('stock-cars');
if (stockRoot) {
  const brand = document.getElementById('filter-brand');
  const type = document.getElementById('filter-type');
  const count = document.getElementById('stock-count');

  [...new Set(cars.map((c) => c.brand))].forEach((b) => {
    const option = document.createElement('option');
    option.value = b;
    option.textContent = b;
    brand.appendChild(option);
  });

  const render = () => {
    const filtered = cars.filter((car) => (brand.value === 'Todas' || car.brand === brand.value) && (type.value === 'Todos' || car.type === type.value));
    count.textContent = `${filtered.length} autos encontrados`;
    stockRoot.innerHTML = filtered.map(carCard).join('');
  };

  brand.addEventListener('change', render);
  type.addEventListener('change', render);
  render();
}

const detailRoot = document.getElementById('detail-root');
if (detailRoot) {
  const slug = new URLSearchParams(location.search).get('slug');
  const car = cars.find((item) => item.slug === slug);
  if (!car) {
    detailRoot.innerHTML = '<h1>Auto no encontrado</h1><a href="stock.html">Volver al stock</a>';
  } else {
    detailRoot.innerHTML = `
      <img src="${car.image}" alt="${car.brand} ${car.model}" style="width:100%;max-height:420px;object-fit:cover;border-radius:8px" />
      <h1>${car.brand} ${car.model}</h1>
      <p>${car.year} · ${car.km.toLocaleString('es-AR')} km · ${car.fuel}</p>
      <p class="price">${money(car.price)}</p>
      <a class="btn" href="${wa(`Hola! Quiero info del ${car.brand} ${car.model}`)}" target="_blank">Consultar por WhatsApp</a>
    `;
  }
}

const valor = document.getElementById('valor');
const anticipo = document.getElementById('anticipo');
const cuotas = document.getElementById('cuotas');
if (valor && anticipo && cuotas) {
  const cuotaEl = document.getElementById('cuota');
  const waBtn = document.getElementById('fin-wa');

  const calc = () => {
    const saldo = Number(valor.value) * (1 - Number(anticipo.value) / 100);
    const monto = Math.round((saldo * 1.65) / Number(cuotas.value));
    cuotaEl.textContent = `Cuota estimada: ${money(monto)} / mes`;
    waBtn.href = wa(`Hola! Quiero financiación para ${money(Number(valor.value))} con ${anticipo.value}% de anticipo en ${cuotas.value} cuotas.`);
  };

  [valor, anticipo, cuotas].forEach((el) => el.addEventListener('input', calc));
  calc();
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const msg = `Hola! Soy ${data.get('nombre')}. Mi teléfono es ${data.get('telefono')}. ${data.get('mensaje') || ''}`;
    window.open(wa(msg), '_blank');
    document.getElementById('contact-ok').textContent = '¡Gracias! Te contactamos pronto.';
    contactForm.reset();
  });
}
