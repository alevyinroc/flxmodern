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

  // Manage sidebar TOC: open on desktop, collapse on small screens,
  // and move the TOC into the post above content on mobile.
  function adjustSidebarToc(){
    const tocs = document.querySelectorAll('details.widget-toc');
    const isDesktop = window.innerWidth > 900;
    const mainPost = document.querySelector('.main-column .post');
    const sidebar = document.querySelector('.sidebar');

    tocs.forEach(d => {
      // open/close so desktop shows it, mobile collapses
      d.open = isDesktop;

      if(!mainPost || !sidebar) return;

      if(!isDesktop){
        // move into the post (before .post-content) on mobile
        if(!d._origParent){
          d._origParent = d.parentNode;
          d._origNext = d.nextElementSibling || null;
        }
        if(!mainPost.contains(d)){
          const postContent = mainPost.querySelector('.post-content');
          if(postContent) mainPost.insertBefore(d, postContent);
          else mainPost.insertBefore(d, mainPost.firstChild);
          d._moved = true;
        }
      } else {
        // move back to original sidebar location on desktop
        if(d._moved){
          if(d._origParent){
            if(d._origNext) d._origParent.insertBefore(d, d._origNext);
            else d._origParent.appendChild(d);
          } else if(sidebar){
            sidebar.insertBefore(d, sidebar.firstChild);
          }
          d._moved = false;
        } else {
          // ensure it's in the sidebar
          if(sidebar && !sidebar.contains(d)) sidebar.insertBefore(d, sidebar.firstChild);
        }
      }
    });

    // After moving elements, recompute sticky offsets for all sidebar widgets
    updateSidebarStickyOffsets();
  }

  adjustSidebarToc();
  window.addEventListener('resize', adjustSidebarToc);

  // Compute stacked sticky offsets for sidebar widgets so they don't overlap
  function updateSidebarStickyOffsets(){
    // On desktop, make the whole sidebar-inner fixed so widgets remain
    // positioned relative to each other. On mobile, revert to normal flow.
    const sidebarInner = document.querySelector('.sidebar-inner');
    const sidebar = document.querySelector('.sidebar');
    if(!sidebarInner || !sidebar) return;

    const isDesktop = window.innerWidth > 900;
    if(isDesktop){
      // compute position and width to match sidebar column
      const rect = sidebar.getBoundingClientRect();
      const top = 28; // keep small gap from top (1.75rem ~= 28px)
      sidebarInner.style.position = 'fixed';
      sidebarInner.style.top = top + 'px';
      sidebarInner.style.left = rect.left + 'px';
      sidebarInner.style.width = rect.width + 'px';
      sidebarInner.style.maxHeight = 'calc(100vh - ' + (top * 2) + 'px)';
      sidebarInner.style.overflow = 'auto';
      sidebarInner.style.zIndex = 1000;
    } else {
      // clear inline styles to restore normal flow
      sidebarInner.style.position = '';
      sidebarInner.style.top = '';
      sidebarInner.style.left = '';
      sidebarInner.style.width = '';
      sidebarInner.style.maxHeight = '';
      sidebarInner.style.overflow = '';
      sidebarInner.style.zIndex = '';
    }
  }

  // Recompute sticky offsets on resize and once on load
  window.addEventListener('resize', updateSidebarStickyOffsets);
  window.addEventListener('load', updateSidebarStickyOffsets);

  // Recompute when TOC details toggles open/closed (affects height)
  function attachTocToggleListeners(){
    const tocs = document.querySelectorAll('.widget-toc');
    tocs.forEach(d => {
      if(!d._tocToggleAttached){
        d.addEventListener('toggle', updateSidebarStickyOffsets);
        d._tocToggleAttached = true;
      }
    });
  }

  // Attach initially and after TOC moves
  attachTocToggleListeners();
  window.addEventListener('resize', attachTocToggleListeners);
})();

