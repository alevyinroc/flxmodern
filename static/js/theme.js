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
})();
