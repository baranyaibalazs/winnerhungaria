// év a láblécben
document.getElementById('y').textContent = new Date().getFullYear();

// egyszerű e-mail védelem (spam-robotok ellen)
document.querySelectorAll('.email').forEach(span=>{
  const u = span.getAttribute('data-u');
  const d = span.getAttribute('data-d');
  const addr = `${u}@${d}`;
  span.innerHTML = `<a href="mailto:${addr}">${addr}</a>`;
});

// teszt űrlap
document.getElementById('quoteForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Köszönjük! Az űrlap teszt módban van, e-mail küldés nélkül.');
});
// Ha bármelyik galéria kép nem tölt be, a CSS jelzi (lásd onerror).
// Plusz: ha minden rendben, biztosítsuk, hogy a grid szépen rajzolódjon.
window.addEventListener('load', () => {
  document.querySelectorAll('.gallery img').forEach(img => {
    if (!img.complete || img.naturalWidth === 0) {
      img.dataset.broken = 1; img.src = '';
    }
  });
});

