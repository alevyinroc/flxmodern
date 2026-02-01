(() => {
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const key = 'flxmodern-color-mode';

  function apply(mode){
    if(mode === 'dark') document.body.classList.add('dark'); else document.body.classList.remove('dark');
    localStorage.setItem(key, mode);
  }

  function toggle(){
    const now = document.body.classList.contains('dark') ? 'light' : 'dark';
    apply(now);
  }

  const saved = localStorage.getItem(key);
  if(saved) apply(saved);

  if(btn) btn.addEventListener('click', toggle);

  // Make subheadings clickable anchors
  document.querySelectorAll('.post-content h2[id], .post-content h3[id], .post-content h4[id]').forEach(heading => {
    heading.addEventListener('click', () => {
      window.location.hash = heading.id;
    });
  });
})();
