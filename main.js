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

// --- Scroll reveal (stagger) ---
(function(){
  const els = Array.from(document.querySelectorAll('.reveal-on-scroll'));
  if(!('IntersectionObserver' in window) || els.length===0){
    els.forEach(el=>el.classList.add('in'));
    return;
  }

  // kis késleltetés a soron belül (0, 60, 120ms, stb.)
  els.forEach((el, i)=> el.style.setProperty('--reveal-delay', `${(i%12)*60}ms`));

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        // alkalmazzuk a késleltetést csak itt, amikor belép
        e.target.style.transitionDelay = getComputedStyle(e.target).getPropertyValue('--reveal-delay') || '0ms';
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  els.forEach(el=>io.observe(el));
})();

