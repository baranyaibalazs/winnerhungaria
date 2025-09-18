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
