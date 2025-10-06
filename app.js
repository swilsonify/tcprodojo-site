// Mobile nav
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('main-nav');
if(toggle){
  toggle.addEventListener('click',()=>{
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Load calendar
fetch('data/calendar.json')
  .then(r=>r.json())
  .then(items=>{
    const wrap = document.getElementById('calendar-list');
    if(!wrap) return;
    items.forEach(ev=>{
      const el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = `<strong>${ev.date}</strong> — ${ev.title} <span style="color:#9aa">${ev.location||''}</span>`;
      wrap.appendChild(el);
    });
  }).catch(()=>{});

// Load blog/success
fetch('data/blog.json')
  .then(r=>r.json())
  .then(posts=>{
    const blog = document.getElementById('blog-list');
    const success = document.getElementById('success-grid');
    posts.forEach(p=>{
      const b = document.createElement('div');
      b.className = 'item';
      b.innerHTML = `<strong>${p.title}</strong><div style="color:#9aa">${p.excerpt}</div>`;
      blog && blog.appendChild(b);
      if(p.type==='success'){
        const s = document.createElement('article');
        s.className = 'card';
        s.innerHTML = `<h3>${p.title}</h3><p>${p.excerpt}</p>`;
        success && success.appendChild(s);
      }
    });
  }).catch(()=>{});

// Intro overlay skip on user interaction (optional future: custom animation)
document.addEventListener('keydown', closeIntro);
document.addEventListener('click', closeIntro);
function closeIntro(){
  const intro = document.getElementById('intro-overlay');
  if(intro){ intro.style.display='none'; }
  document.removeEventListener('keydown', closeIntro);
  document.removeEventListener('click', closeIntro);
}
