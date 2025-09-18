// PRELOADER – minimum 1.2s, majd elhalványul
(function(){
    const pre = document.getElementById('preloader');
    if(!pre) return;
    const MIN_MS = 1200;
    const start = Date.now();
    function hide(){
      const wait = Math.max(0, MIN_MS - (Date.now() - start));
      setTimeout(()=> pre.classList.add('hidden'), wait);
    }
    window.addEventListener('load', hide, { once:true });
    setTimeout(()=> pre.classList.add('hidden'), 4000); // biztos ami biztos
  })();
  
  // STICKY HEADER – finom árnyék görgetésre
  (function(){
    const header = document.getElementById('site-header');
    if(!header) return;
    const onScroll = () => {
      header.style.boxShadow = (window.scrollY>6) ? '0 8px 20px rgba(15,18,22,.06)' : 'none';
    };
    onScroll(); 
    window.addEventListener('scroll', onScroll, { passive:true });
  })();
  
  // EMAIL SPAMVÉDELEM – “user@domain” összeállítás
  (function(){
    document.querySelectorAll('.protected-email').forEach(el=>{
      const u = el.getAttribute('data-user');
      const d = el.getAttribute('data-domain');
      if(u && d){
        el.textContent = `${u}@${d}`;
      }
    });
  })();
  
  // AKTUÁLIS ÉV a láblécben
  (function(){
    const y = document.getElementById('y');
    if(y) y.textContent = new Date().getFullYear();
  })();
  
  // AOS INIT – görgetéses animációk
  (function(){
    if(!window.AOS) return;
    AOS.init({ duration:700, easing:'ease-out-cubic', once:true, offset:80 });
  })();
  
  // GALÉRIA SWIPER – kisebb, egységes magasság
  (function(){
    if(!window.Swiper) return;
    new Swiper('.gallery-swiper', {
      loop:true,
      speed:600,
      autoplay:{ delay:3000, disableOnInteraction:false },
      spaceBetween:16,
      centeredSlides:true,
      slidesPerView:1.15,
      pagination:{ el:'.gallery-pagination', clickable:true },
      navigation:{ nextEl:'.gallery-next', prevEl:'.gallery-prev' },
      breakpoints:{
        640:{ slidesPerView:1.6, spaceBetween:18 },
        880:{ slidesPerView:2.2, spaceBetween:20 },
        1200:{ slidesPerView:3.2, spaceBetween:22 }
      }
    });
  })();
  
  // ŰRLAP – alap ellenőrzés + demo üzenet
  (function(){
    const form = document.getElementById('quoteForm');
    if(!form) return;
    form.addEventListener('submit', e=>{
      e.preventDefault();
      // honeypot ellenőrzés
      if(form.company && form.company.value.trim()!==""){
        return; // spam
      }
      alert("Köszönjük, az ajánlatkérést rögzítettük! (Ez demo, még nincs bekötve e-mailre.)");
      form.reset();
    });
  })();
// Fallback animáció, ha AOS nem érhető el
(function(){
  if (window.AOS) return;
  const els = document.querySelectorAll('[data-aos]');
  els.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(({isIntersecting,target})=>{
      if(isIntersecting){
        target.style.opacity = 1;
        target.style.transform = 'translateY(0)';
        observer.unobserve(target);
      }
    });
  },{threshold:0.15});
  els.forEach(el => observer.observe(el));
})();

  
