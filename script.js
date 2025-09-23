/* -------- Scroll reveal: belép-kilép, fel/le görgetésre is -------- */
function setupReveal(){
  const els = document.querySelectorAll('.reveal-on-scroll');
  if(!('IntersectionObserver' in window)){ els.forEach(el=>el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); }
      else { e.target.classList.remove('in'); }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -5% 0px'});
  els.forEach(el=>io.observe(el));
}

/* -------- Szolgáltatás kártyák: Több infó (desktop inline / mobil sheet) -------- */
function setupServiceCards(){
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;
  const sheet = document.getElementById('sheet');
  const sheetBackdrop = sheet?.querySelector('.sheet__backdrop');
  const sheetClose = sheet?.querySelector('.sheet__close');
  const sheetContent = sheet?.querySelector('.sheet__content');

  const openSheet = (html) => {
    if(!sheet) return;
    sheetContent.innerHTML = html;
    sheet.hidden = false;
    requestAnimationFrame(()=> sheet.classList.add('open'));
  };
  const closeSheet = () => {
    if(!sheet) return;
    sheet.classList.remove('open');
    setTimeout(()=> sheet.hidden = true, 210);
  };
  sheetBackdrop?.addEventListener('click', closeSheet);
  sheetClose?.addEventListener('click', closeSheet);
  window.addEventListener('keydown', e=>{ if(e.key==='Escape' && sheet && !sheet.hidden) closeSheet(); });

  document.querySelectorAll('.service-card').forEach(card=>{
    const moreBtn = card.querySelector('.more');
    const panel = card.querySelector('.inline-panel');
    if(!moreBtn || !panel) return;

    moreBtn.addEventListener('click', ()=>{
      if(isMobile()){
        const title = card.querySelector('.back h3')?.textContent ?? '';
        openSheet(`<h3>${title}</h3>${panel.innerHTML}`);
      }else{
        const expanded = moreBtn.getAttribute('aria-expanded') === 'true';
        moreBtn.setAttribute('aria-expanded', String(!expanded));
        moreBtn.querySelector('.chev').style.transform = expanded ? 'rotate(0)' : 'rotate(180deg)';
        panel.hidden = expanded;
      }
    });
  });

  document.querySelectorAll('.link-cta').forEach(a=>{
    a.addEventListener('click', ()=>{
      const val = a.dataset.prefill || '';
      const field = document.getElementById('serviceField');
      if(field){ field.value = val; }
    });
  });
}

/* -------- Auto-scroll galéria: DOM-ba illesztés UTÁN mérünk szélességet -------- */
function buildGallery(){
  const wrap = document.querySelector('.auto-gallery');
  if(!wrap) return;
  const track = wrap.querySelector('.track');

  const base = 'media/';
  const files = [];
  for(let i=2;i<=17;i++){ files.push(`truck-${String(i).padStart(2,'0')}.jpg`); }

  const tryLoad = src => new Promise(res=>{
    const img = new Image();
    img.onload = () => res({ok:true,src,ratio: img.naturalWidth/img.naturalHeight || 1.6});
    img.onerror = () => {
      console.warn('[Galéria] Nem tölthető be:', base+src);
      res({ok:false,src});
    };
    img.src = base + src;
  });

  Promise.all(files.map(tryLoad)).then(results=>{
    const ok = results.filter(r=>r.ok);
    if(ok.length===0){
      console.warn('[Galéria] Nincs használható kép.');
      return;
    }

    const tiles = [];
    const addTile = (r) => {
      const fig = document.createElement('figure');
      fig.className = 'tile';
      const img = document.createElement('img');
      img.src = base + r.src;
      img.alt = 'Galéria kép';
      fig.appendChild(img);
      track.appendChild(fig);              // << előbb a DOM-ba tesszük
      const h = fig.getBoundingClientRect().height || 180; // itt már mérhető
      const w = Math.min(520, Math.max(160, Math.round(h * r.ratio)));
      fig.style.width = w + 'px';
      tiles.push(fig);
    };

    ok.forEach(addTile);
    ok.forEach(r => addTile(r));           // duplázás a végtelenítéshez

    const dur = Math.max(10, Number(wrap.dataset.speed) || 20);
    wrap.style.setProperty('--dur', dur + 's');
    wrap.classList.add('run');
  });
}

/* -------- Init -------- */
document.addEventListener('DOMContentLoaded', ()=>{
  setupReveal();
  setupServiceCards();
  buildGallery();
});
