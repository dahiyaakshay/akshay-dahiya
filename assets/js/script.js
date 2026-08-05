  const gridOverlay = document.getElementById('gridOverlay');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ gridOverlay.classList.add('show'); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.section, .thesis, .process, .writing, .blog-grid').forEach(el => observer.observe(el));

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navWrap = document.getElementById('navWrap');

  function closeMenu(){
    navWrap.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  function openMenu(){
    navWrap.classList.add('open');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  navToggle.addEventListener('click', () => {
    navWrap.classList.contains('open') ? closeMenu() : openMenu();
  });

  navWrap.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if(window.innerWidth > 860){ closeMenu(); }
  });

  // Table of contents scroll highlight (only runs on internal blog post pages)
  const tocNav = document.getElementById('tocNav');
  if (tocNav) {
    const tocLinks = Array.from(tocNav.querySelectorAll('.toc-link'));
    const headings = tocLinks
      .map(link => document.getElementById(link.getAttribute('href').slice(1)))
      .filter(Boolean);

    const setActive = (id) => {
      tocLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    };

    if (headings.length) {
      setActive(headings[0].id);

      const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      }, { rootMargin: '-10% 0px -75% 0px', threshold: 0 });

      headings.forEach(h => headingObserver.observe(h));
    }
  }
