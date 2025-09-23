/* Scroll reveal – minden görgetésnél újraéled */
(() => {
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('show');
      else e.target.classList.remove('show'); // reset, hogy visszagörgetve újra játssza
    });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
})();

/* Services: „Több infó” lenyitó */
document.querySelectorAll('.service .toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.service');
    card.classList.toggle('open');
    btn.setAttribute('aria-expanded', card.classList.contains('open'));
  });
});

/* E-mail obfuscation (egyszerű) */
(() => {
  document.querySelectorAll('[data-mail]').forEach((el) => {
    const m = el.getAttribute('data-mail');
    el.textContent = m;
    el.href = 'mailto:' + m;
  });
})();

/* Galéria: CSS animáció végzi az infinite scrollt – itt csak a hover-pause van a CSS-ben */
(() => {
  // Extra JS nem szükséges most – később ide jöhet sebesség állítás, duplikálás stb.
})();
