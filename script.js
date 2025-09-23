/* ---------- Folyamatos scroll reveal (belép/kilép) ---------- */
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

/* ---------- Flip kártyák: „Több infó” (A + C) ---------- */
function setupServiceCards(){
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;
  const sheet = document.getElementById('sheet');
  const sheetBackdrop = sheet.querySelector('.sheet__backdrop');
  const sheetPanel = sheet.querySelector('.sheet__panel');
  const sheetClose = sheet.querySelector('.sheet__close');
  const sheetContent = sheet.querySelector('.sheet__content');

  const openSheet = (html) => {
    sheetContent.innerHTML = html;
    sheet.hidden = false;
    requestAnimationFrame(()=> sheet.classList.add('open'));
  };
  const closeSheet = () => {
    sheet.classList.remove('open');
    setTimeout(()=> sheet.hidden = true, 210);
  };
  sheetBackdrop.addEventListener('click', closeSheet);
  sheetClose.addEventListener('click', closeSheet);
  window.addEventListener('keydown', e=>{ if(e.key==='Escape' && !sheet.hidden) closeSheet(); });

  document.querySelectorAll('.service-card').forEach(card=>{
    const moreBtn = card.querySelector('.more');
    const panel = card.querySelector('.inline-panel');
    if(!moreBtn || !panel) return;

    moreBtn.addEventListener('click', ()=>{
      if(isMobile()){
        // bottom sheet (mobil)
        const title = card.querySelector('.back h3')?.textContent ?? '';
        openSheet(`<h3>${title}</h3>${panel.innerHTML}`);
      }else{
        // inline accordion (asztali)
        const expanded = moreBtn.getAttribute('aria-expanded') === 'true';
        moreBtn.setAttribute('aria-expanded', String(!expanded));
        moreBtn.querySelector('.chev').style.transform = expanded ? 'rotate(0)' : 'rotate(180deg)';
        panel.hidden = expanded;
      }
    });
  });

  // form előtöltés a szolgáltatás nevével
  document.querySelectorAll('.link-cta').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const val = a.dataset.prefill || '';
      const field = document.getElementById('serviceField');
      if(field){ field.value = val; }
    });
  });
}

/* ---------- Auto-scroll galéria fix magassággal, arányos szélességgel ---------- */
function buildGallery(){
  const wrap = document.querySelector('.auto-gallery');
  if(!wrap) return;
  const track = wrap.querySelector('.track');

  // KÉP LISTA: truck-02.jpg … truck-17.jpg
  const base = 'media/';
  const files = [];
  for(let i=2;i<=17;i++){ files.push(`truck-${String(i).padStart(2,'0')}.jpg`); }

  const tryLoad = src => new Promise(res=>{
    const img = new Image();
    img.onload = () => res({ok:true,src,ratio: img.naturalWidth/img.naturalHeight || 1.6});
    img.onerror = () => res({ok:false,src});
    img.src = base + src;
  });

  Promise.all(files.map(tryLoad)).then(results=>{
    const ok = results.filter(r=>r.ok);
    if(ok.length===0) return;

    const addTile = (r) => {
      const fig = document.createElement('figure');
      fig.className = 'tile';
      // a szélesség magasság*arány; a magasság CSS-ben 180px (mob:160)
      const baseH = getComputedStyle(fig).height;
      const h = parseFloat(baseH) || 180;
      const w = Math.min(520, Math.max(160, Math.round(h * r.ratio)));
      fig.style.width = w + 'px';

      const img = document.createElement('img');
      img.src = base + r.src;
      img.alt = 'Galéria kép';
      fig.appendChild(img);
      track.appendChild(fig);
    };

    ok.forEach(addTile);
    ok.forEach(addTile);            // duplázás a végtelenítéshez

    // sebesség
    const dur = Math.max(10, Number(wrap.dataset.speed) || 20);
    wrap.style.setProperty('--dur', dur + 's');
    wrap.classList.add('run');
  });
}

/* ---------- Prefill az ajánlatkéréshez a kártyákból ---------- */
function prefillFromCards(){
  document.querySelectorAll('.service-card').forEach(card=>{
    card.addEventListener('click', (e)=>{
      const a = e.target.closest('a.link-cta');
      if(!a) return;
      const service = a.dataset.prefill || card.dataset.service || '';
      const field = document.getElementById('serviceField');
      if(field) field.value = service;
    });
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  setupReveal();
  setupServiceCards();
  buildGallery();
  prefillFromCards();
});
