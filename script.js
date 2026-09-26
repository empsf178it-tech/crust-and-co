/* ==========================================================================
   CRUST & CO. — INTERACTIVE ENGINE
   Features: Custom Cursor, Flour & Steam Canvases, Macro Split Reveal,
   Dough-to-Bread Morph, Scroll Progress, Modals & Drawers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     01. INITIAL REVEAL & HERO LOAD
     -------------------------------------------------------------------------- */
  const heroSection = document.getElementById('hero');
  setTimeout(() => {
    heroSection.classList.add('loaded');
  }, 100);

  /* --------------------------------------------------------------------------
     02. CUSTOM CURSOR & MAGNETIC BUTTONS
     -------------------------------------------------------------------------- */
  const cursor = document.getElementById('customCursor');
  const cursorBadge = document.getElementById('cursorBadge');

  if (cursor) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isMoving = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        cursor.style.opacity = '1';
        isMoving = true;
      }
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover elements trigger TASTE badge
    const tasteElements = document.querySelectorAll('.hover-taste, .bake-card, .signature-card, .moment-card');
    tasteElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active-taste'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active-taste'));
    });

    // Interactive button hover expansions
    const hoverElements = document.querySelectorAll('button, a, .magnetic-btn, .nav-item, .btn-primary, .back-to-top-btn');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active-hover'));
    });

    // Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.magnetic-btn, .back-to-top-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnX = e.clientX - rect.left - rect.width / 2;
        const btnY = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate3d(${btnX * 0.25}px, ${btnY * 0.25}px, 0)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate3d(0, 0, 0)`;
      });
    });
  }

  /* --------------------------------------------------------------------------
     03. FLOUR PARTICLES CANVAS (HERO SECTION)
     -------------------------------------------------------------------------- */
  const flourCanvas = document.getElementById('flourCanvas');
  if (flourCanvas) {
    const ctx = flourCanvas.getContext('2d');
    let width = flourCanvas.width = heroSection.clientWidth;
    let height = flourCanvas.height = heroSection.clientHeight;

    window.addEventListener('resize', () => {
      width = flourCanvas.width = heroSection.clientWidth;
      height = flourCanvas.height = heroSection.clientHeight;
    });

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.4 + 0.1,
      wobble: Math.random() * Math.PI * 2
    }));

    function drawFlour() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.wobble += 0.02;
        p.x += p.vx + Math.sin(p.wobble) * 0.2;
        p.y += p.vy;

        if (p.y > height) {
          p.y = -5;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 252, 247, ${p.opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(drawFlour);
    }
    drawFlour();
  }

  /* --------------------------------------------------------------------------
     04. STEAM CANVAS (FRESH FROM OVEN SECTION)
     -------------------------------------------------------------------------- */
  const steamCanvas = document.getElementById('steamCanvas');
  const freshOvenSection = document.getElementById('fresh-oven');
  if (steamCanvas && freshOvenSection) {
    const ctx = steamCanvas.getContext('2d');
    let width = steamCanvas.width = freshOvenSection.clientWidth;
    let height = steamCanvas.height = freshOvenSection.clientHeight;

    window.addEventListener('resize', () => {
      width = steamCanvas.width = freshOvenSection.clientWidth;
      height = steamCanvas.height = freshOvenSection.clientHeight;
    });

    const steamPuffs = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 50,
      radius: Math.random() * 40 + 20,
      opacity: Math.random() * 0.15 + 0.05,
      vy: -(Math.random() * 0.8 + 0.3),
      vx: (Math.random() - 0.5) * 0.3,
      expandRate: Math.random() * 0.15 + 0.05
    }));

    function drawSteam() {
      ctx.clearRect(0, 0, width, height);
      steamPuffs.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.radius += p.expandRate;
        p.opacity -= 0.0008;

        if (p.opacity <= 0 || p.y < -50) {
          p.x = Math.random() * width;
          p.y = height + 20;
          p.radius = Math.random() * 30 + 15;
          p.opacity = Math.random() * 0.12 + 0.04;
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(235, 214, 159, ${p.opacity})`);
        gradient.addColorStop(1, 'rgba(235, 214, 159, 0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      requestAnimationFrame(drawSteam);
    }
    drawSteam();
  }

  /* --------------------------------------------------------------------------
     05. SCROLL PROGRESS & NAVBAR ACTIVE STATE
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const progressBarFill = document.getElementById('progressBarFill');
  const progressContainer = document.getElementById('scrollProgressContainer');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navItems = document.querySelectorAll('.nav-item');
  const mobileNavLinks = document.querySelectorAll('.mobile-link');
  const sections = document.querySelectorAll('section[id]');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function updateActiveNavState() {
    const scrollY = window.scrollY;
    let currentSectionId = '';
    const offsetThreshold = window.innerHeight * 0.35;

    sections.forEach(sec => {
      const top = sec.offsetTop - offsetThreshold;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = id;
      }
    });

    // Desktop Nav Items Active Highlight
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Mobile Drawer Links Active Highlight
    mobileNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Scrollbar Fill
    if (progressBarFill) {
      progressBarFill.style.width = `${progressPct}%`;
    }

    // Navbar Scrolled State
    if (scrollY > 50) {
      if (navbar) navbar.classList.add('scrolled');
      if (progressContainer) progressContainer.classList.add('visible');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
      if (progressContainer) progressContainer.classList.remove('visible');
    }

    // Back To Top Button Visibility
    const currentScroll = Math.max(scrollY, document.documentElement.scrollTop || 0);
    if (backToTopBtn) {
      if (currentScroll > 250) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    updateActiveNavState();
  });

  // Trigger on initial page load
  updateActiveNavState();

  /* --------------------------------------------------------------------------
     06. SECTION 02: HORIZONTAL GALLERY CONTROLS
     -------------------------------------------------------------------------- */
  const bakeScrollTrack = document.getElementById('bakeScrollTrack');
  const slidePrev = document.getElementById('slidePrev');
  const slideNext = document.getElementById('slideNext');

  if (bakeScrollTrack && slidePrev && slideNext) {
    slidePrev.addEventListener('click', () => {
      bakeScrollTrack.scrollBy({ left: -380, behavior: 'smooth' });
    });
    slideNext.addEventListener('click', () => {
      bakeScrollTrack.scrollBy({ left: 380, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     07. SECTION 03: MACRO REVEAL SPLIT SLIDER
     -------------------------------------------------------------------------- */
  const macroContainer = document.getElementById('macroRevealContainer');
  const macroImgAfter = document.getElementById('macroImgAfter');
  const macroHandle = document.getElementById('macroSliderHandle');

  if (macroContainer && macroImgAfter && macroHandle) {
    let isDragging = false;

    const updateSplit = (clientX) => {
      const rect = macroContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const pct = (offsetX / rect.width) * 100;
      macroImgAfter.style.width = `${pct}%`;
      macroHandle.style.left = `${pct}%`;
    };

    macroContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSplit(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSplit(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile
    macroContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateSplit(e.touches[0].clientX);
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updateSplit(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  /* --------------------------------------------------------------------------
     08. SECTION 04: CRAFT STEPS & DOUGH MORPHING
     -------------------------------------------------------------------------- */
  const craftStepsNav = document.getElementById('craftStepsNav');
  const craftImg = document.getElementById('craftImg');
  const craftStepTag = document.getElementById('craftStepTag');
  const craftStepTitle = document.getElementById('craftStepTitle');
  const craftStepDesc = document.getElementById('craftStepDesc');
  const craftStepSpecs = document.getElementById('craftStepSpecs');
  const btnMorphToggle = document.getElementById('btnMorphToggle');
  const craftImageFrame = document.getElementById('craftImageFrame');

  const processStepsData = [
    {
      step: '01. MIX',
      tag: 'STAGE 01 OF 07',
      img: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=85',
      desc: 'Organic stoneground flour meets pure filtered mountain water and our wild mother starter, nurtured continuously since 2018. Hydrated slowly to initiate gentle enzymatic action.',
      specs: [
        { label: 'Temperature', val: '21°C Room / 24°C Water' },
        { label: 'Time', val: '45 Minute Autolyse' }
      ]
    },
    {
      step: '02. KNEAD',
      tag: 'STAGE 02 OF 07',
      img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
      desc: 'Rhythmic stretching develops gluten networks without overheating the dough matrix. Air bubbles begin to form as oxygen binds with protein chains.',
      specs: [
        { label: 'Method', val: 'French Fold & Slap' },
        { label: 'Dough Strength', val: 'Medium Elasticity' }
      ]
    },
    {
      step: '03. REST',
      tag: 'STAGE 03 OF 07',
      img: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&w=1200&q=85',
      desc: 'Bulk fermentation in cedar trough boxes. Coil folds performed every 45 minutes to build vertical structure and trap carbon dioxide pockets.',
      specs: [
        { label: 'Bulk Ferment', val: '4.5 Hours @ 26°C' },
        { label: 'Coil Folds', val: '4 Complete Sets' }
      ]
    },
    {
      step: '04. SHAPE',
      tag: 'STAGE 04 OF 07',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
      desc: 'Hand-divided into boules and batards with minimal deflating. Smooth outer skin tension created by dragging across dusted maple workbenches.',
      specs: [
        { label: 'Portion Weight', val: '850g Per Loaf' },
        { label: 'Bench Rest', val: '20 Minutes' }
      ]
    },
    {
      step: '05. PROOF',
      tag: 'STAGE 05 OF 07',
      img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1200&q=85',
      desc: 'Placed gently into spruce pulp bannetons dusted with rice flour. Transferred to the cold retarder for a 36-hour slow maturation process.',
      specs: [
        { label: 'Cold Retard', val: '36 Hours @ 4°C' },
        { label: 'Acidity Profile', val: 'Balanced Lactic & Acetic' }
      ]
    },
    {
      step: '06. BAKE',
      tag: 'STAGE 06 OF 07',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
      desc: 'Scored with a razor-sharp lame before loading directly onto heated stone hearths. Burst of high-pressure steam injected for maximum oven spring.',
      specs: [
        { label: 'Deck Heat', val: '240°C Top & Bottom' },
        { label: 'Steam Injection', val: '15 Seconds Initial' }
      ]
    },
    {
      step: '07. SERVE',
      tag: 'STAGE 07 OF 07',
      img: 'assets/images/hero_sourdough.jpg',
      desc: 'Cooled on willow racks for 2 hours while the crust crackles and internal moisture stabilizes. Ready to be sliced and savoured.',
      specs: [
        { label: 'Cooling Time', val: '120 Minutes' },
        { label: 'Shelf Life', val: '5 Days Peak Freshness' }
      ]
    }
  ];

  if (craftStepsNav) {
    const stepBtns = craftStepsNav.querySelectorAll('.step-nav-btn');
    stepBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.step, 10);
        const data = processStepsData[idx];

        stepBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Smooth image transition
        craftImg.style.opacity = '0.3';
        setTimeout(() => {
          craftImg.src = data.img;
          craftImg.style.opacity = '1';
        }, 200);

        craftStepTag.textContent = data.tag;
        craftStepTitle.textContent = data.step;
        craftStepDesc.textContent = data.desc;

        if (craftStepSpecs) {
          craftStepSpecs.innerHTML = data.specs.map(s => `
            <div class="spec-row">
              <span>${s.label}</span>
              <strong>${s.val}</strong>
            </div>
          `).join('');
        }
      });
    });
  }

  // Signature Dough-to-Bread Morph Toggle
  if (btnMorphToggle && craftImageFrame) {
    btnMorphToggle.addEventListener('click', () => {
      craftImageFrame.classList.toggle('morphed');
      if (craftImageFrame.classList.contains('morphed')) {
        btnMorphToggle.querySelector('span').textContent = 'REVERT TO RAW DOUGH STATE';
      } else {
        btnMorphToggle.querySelector('span').textContent = 'TOGGLE DOUGH → GOLDEN BREAD TRANSITION';
      }
    });
  }

  /* --------------------------------------------------------------------------
     09. SECTION 06: BUTTER TEST SEQUENCE TABS
     -------------------------------------------------------------------------- */
  const seqTabBtns = document.querySelectorAll('.seq-tab-btn');
  const seqImg = document.getElementById('seqImg');
  const seqNum = document.getElementById('seqNum');
  const seqTitle = document.getElementById('seqTitle');
  const seqDesc = document.getElementById('seqDesc');

  const butterSeqData = [
    {
      num: 'PHASE 01 / 04',
      title: 'THE GOLDEN SHELL',
      img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85',
      desc: 'Baked at high initial heat to capture moisture inside while forging a deep caramel-hued exterior crust.'
    },
    {
      num: 'PHASE 02 / 04',
      title: 'THE CRISP TEAR',
      img: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=1200&q=85',
      desc: 'A gentle pull breaks the golden carapace with an audible crackle, releasing steam scented with sweet cultured cream.'
    },
    {
      num: 'PHASE 03 / 04',
      title: 'HONEYCOMBED LAYERS',
      img: 'https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=1200&q=85',
      desc: '81 paper-thin butter layers reveal a translucent, silky web structure with no dense dough pockets.'
    },
    {
      num: 'PHASE 04 / 04',
      title: 'BUTTERY SHATTER',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
      desc: 'Every bite yields delicate golden flakes that melt on the tongue, leaving a rich cultured butter finish.'
    }
  ];

  seqTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.seq, 10);
      const data = butterSeqData[idx];

      seqTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (seqImg) {
        seqImg.style.opacity = '0.2';
        setTimeout(() => {
          seqImg.src = data.img;
          seqImg.style.opacity = '1';
        }, 200);
      }

      if (seqNum) seqNum.textContent = data.num;
      if (seqTitle) seqTitle.textContent = data.title;
      if (seqDesc) seqDesc.textContent = data.desc;
    });
  });

  /* --------------------------------------------------------------------------
     10. LIVE OVEN CLOCK UPDATE
     -------------------------------------------------------------------------- */
  const liveOvenTime = document.getElementById('liveOvenTime');
  function updateOvenClock() {
    if (!liveOvenTime) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedHours = String(hours).padStart(2, '0');
    liveOvenTime.textContent = `${formattedHours}:${minutes} ${ampm}`;
  }
  updateOvenClock();
  setInterval(updateOvenClock, 30000);

  /* --------------------------------------------------------------------------
     11. MODALS & DRAWERS
     -------------------------------------------------------------------------- */
  // Visit Modal
  const visitBackdrop = document.getElementById('visitModalBackdrop');
  const openVisitBtn = document.getElementById('openVisitModal');
  const mobileVisitBtn = document.getElementById('mobileVisitBtn');
  const finalVisitBtn = document.getElementById('finalVisitBtn');
  const closeVisitBtn = document.getElementById('closeVisitModal');
  const openOvenScheduleBtn = document.getElementById('openOvenScheduleBtn');

  function openVisit() {
    if (visitBackdrop) visitBackdrop.classList.add('active');
    closeMobileMenu();
  }
  function closeVisit() {
    if (visitBackdrop) visitBackdrop.classList.remove('active');
  }

  if (openVisitBtn) openVisitBtn.addEventListener('click', openVisit);
  if (mobileVisitBtn) mobileVisitBtn.addEventListener('click', openVisit);
  if (finalVisitBtn) finalVisitBtn.addEventListener('click', openVisit);
  if (openOvenScheduleBtn) openOvenScheduleBtn.addEventListener('click', openVisit);
  if (closeVisitBtn) closeVisitBtn.addEventListener('click', closeVisit);

  if (visitBackdrop) {
    visitBackdrop.addEventListener('click', (e) => {
      if (e.target === visitBackdrop) closeVisit();
    });
  }

  // Tasting Profile Drawer
  const tastingBackdrop = document.getElementById('tastingDrawerBackdrop');
  const closeTastingBtn = document.getElementById('closeTastingDrawer');
  const signatureCards = document.querySelectorAll('.signature-card, .btn-explore-item');

  const drawerTitle = document.getElementById('drawerTitle');
  const drawerDesc = document.getElementById('drawerDesc');
  const drawerIngredients = document.getElementById('drawerIngredients');
  const drawerCrunch = document.getElementById('drawerCrunch');
  const drawerHours = document.getElementById('drawerHours');

  signatureCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Find parent card if clicked button inside
      const targetCard = card.classList.contains('signature-card') ? card : card.closest('.signature-card');
      if (!targetCard) return;

      const title = targetCard.dataset.title;
      const desc = targetCard.dataset.desc;
      const ingredients = targetCard.dataset.ingredients;
      const crunch = targetCard.dataset.crunch;
      const hours = targetCard.dataset.hours;

      if (drawerTitle) drawerTitle.textContent = title || 'Artisan Selection';
      if (drawerDesc) drawerDesc.textContent = desc || 'Freshly baked daily.';
      if (drawerIngredients) drawerIngredients.textContent = ingredients || 'Organic Flour, Water, Sea Salt';
      if (drawerCrunch) drawerCrunch.textContent = crunch || '9/10';
      if (drawerHours) drawerHours.textContent = hours || '36 Hours';

      if (tastingBackdrop) tastingBackdrop.classList.add('active');
    });
  });

  if (closeTastingBtn) {
    closeTastingBtn.addEventListener('click', () => {
      if (tastingBackdrop) tastingBackdrop.classList.remove('active');
    });
  }

  if (tastingBackdrop) {
    tastingBackdrop.addEventListener('click', (e) => {
      if (e.target === tastingBackdrop) tastingBackdrop.classList.remove('active');
    });
  }

  /* --------------------------------------------------------------------------
     12. MOBILE HAMBURGER MENU & RIGHT DRAWER
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const closeMenuBtn = document.getElementById('closeMenuBtn');

  function openMobileMenu() {
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    if (hamburgerBtn) hamburgerBtn.classList.add('is-active');
  }
  function closeMobileMenu() {
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (hamburgerBtn) hamburgerBtn.classList.remove('is-active');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) {
        closeMobileMenu();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* --------------------------------------------------------------------------
     13. CATEGORY FILTERS (SIGNATURES SECTION)
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allSigCards = document.querySelectorAll('.signature-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      allSigCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     14. WEB AUDIO SYNTHESIZER FOR SOUND FX
     -------------------------------------------------------------------------- */
  let soundEnabled = true;
  let audioCtx = null;

  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function playTickSound() {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundToggleBtn.classList.remove('muted');
        if (soundIcon) soundIcon.textContent = '🔊';
        playTickSound();
      } else {
        soundToggleBtn.classList.add('muted');
        if (soundIcon) soundIcon.textContent = '🔇';
      }
    });
  }

  // Attach subtle tick sound to all buttons & tabs
  document.querySelectorAll('button, .nav-item, .mobile-link, .stage-step').forEach(el => {
    el.addEventListener('click', playTickSound);
  });

  /* --------------------------------------------------------------------------
     15. MORNING BAKE BASKET & ORDER MANAGEMENT
     -------------------------------------------------------------------------- */
  const basket = [];
  const openBasketBtn = document.getElementById('openBasketBtn');
  const basketBackdrop = document.getElementById('basketDrawerBackdrop');
  const closeBasketBtn = document.getElementById('closeBasketDrawer');
  const basketCount = document.getElementById('basketCount');
  const basketItemsList = document.getElementById('basketItemsList');
  const basketEmptyMsg = document.getElementById('basketEmptyMsg');
  const basketFooter = document.getElementById('basketFooter');
  const basketSubtotal = document.getElementById('basketSubtotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const pickupTimeSelect = document.getElementById('pickupTimeSelect');

  const orderModalBackdrop = document.getElementById('orderModalBackdrop');
  const closeOrderModal = document.getElementById('closeOrderModal');
  const doneOrderBtn = document.getElementById('doneOrderBtn');
  const orderConfirmDesc = document.getElementById('orderConfirmDesc');
  const orderReceiptBox = document.getElementById('orderReceiptBox');

  function updateBasketUI() {
    // Update badge count
    const totalQty = basket.reduce((sum, item) => sum + item.qty, 0);
    if (basketCount) basketCount.textContent = totalQty;

    if (basket.length === 0) {
      if (basketEmptyMsg) basketEmptyMsg.style.display = 'block';
      if (basketItemsList) basketItemsList.innerHTML = '';
      if (basketFooter) basketFooter.style.display = 'none';
    } else {
      if (basketEmptyMsg) basketEmptyMsg.style.display = 'none';
      if (basketFooter) basketFooter.style.display = 'block';

      let totalCost = 0;
      if (basketItemsList) {
        basketItemsList.innerHTML = basket.map((item, index) => {
          const itemTotal = item.price * item.qty;
          totalCost += itemTotal;
          return `
            <div class="basket-item">
              <img src="${item.img}" alt="${item.title}" class="basket-item-img">
              <div class="basket-item-info">
                <div class="basket-item-title">${item.title}</div>
                <div class="basket-item-price">$${item.price.toFixed(2)} ea</div>
              </div>
              <div class="basket-qty-controls">
                <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
              </div>
            </div>
          `;
        }).join('');
      }

      if (basketSubtotal) {
        basketSubtotal.textContent = `$${totalCost.toFixed(2)}`;
      }

      // Quantity change handlers
      const qtyBtns = basketItemsList.querySelectorAll('.qty-btn');
      qtyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.index, 10);
          const action = btn.dataset.action;
          if (action === 'increase') {
            basket[idx].qty += 1;
          } else if (action === 'decrease') {
            basket[idx].qty -= 1;
            if (basket[idx].qty <= 0) {
              basket.splice(idx, 1);
            }
          }
          updateBasketUI();
        });
      });
    }
  }

  function addToBasket(id, title, price, img) {
    const existing = basket.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      basket.push({ id, title, price: parseFloat(price), img, qty: 1 });
    }
    updateBasketUI();

    // Trigger visual pop animation on basket button
    if (openBasketBtn) {
      openBasketBtn.style.transform = 'scale(1.2)';
      setTimeout(() => {
        openBasketBtn.style.transform = 'scale(1)';
      }, 200);
    }
  }

  // Bind all "+ ADD TO BASKET" buttons
  document.querySelectorAll('.btn-add-basket').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const title = btn.dataset.title;
      const price = btn.dataset.price;
      const img = btn.dataset.img;
      addToBasket(id, title, price, img);
    });
  });

  // Open / Close Basket Drawer
  if (openBasketBtn) {
    openBasketBtn.addEventListener('click', () => {
      if (basketBackdrop) basketBackdrop.classList.add('active');
    });
  }

  if (closeBasketBtn) {
    closeBasketBtn.addEventListener('click', () => {
      if (basketBackdrop) basketBackdrop.classList.remove('active');
    });
  }

  if (basketBackdrop) {
    basketBackdrop.addEventListener('click', (e) => {
      if (e.target === basketBackdrop) basketBackdrop.classList.remove('active');
    });
  }

  // Checkout Reservation Action
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (basket.length === 0) return;

      const selectedBatch = pickupTimeSelect ? pickupTimeSelect.value : '06:30 AM';
      const orderNumber = Math.floor(1000 + Math.random() * 9000);
      const totalCost = basket.reduce((sum, i) => sum + (i.price * i.qty), 0);

      if (orderConfirmDesc) {
        orderConfirmDesc.textContent = `Your fresh morning order (#CRUST-${orderNumber}) is reserved for ${selectedBatch} batch pickup at 744 Bakery Lane.`;
      }

      if (orderReceiptBox) {
        orderReceiptBox.innerHTML = `
          <div class="order-receipt-row">
            <span>RESERVATION CODE:</span>
            <strong>#CRUST-${orderNumber}</strong>
          </div>
          <div class="order-receipt-row">
            <span>PICKUP BATCH:</span>
            <strong>${selectedBatch}</strong>
          </div>
          <div class="order-receipt-row">
            <span>ITEMS:</span>
            <strong>${basket.map(i => `${i.qty}x ${i.title}`).join(', ')}</strong>
          </div>
          <div class="order-receipt-row">
            <span>TOTAL ESTIMATE:</span>
            <strong>$${totalCost.toFixed(2)}</strong>
          </div>
        `;
      }

      // Close basket drawer & open order modal
      if (basketBackdrop) basketBackdrop.classList.remove('active');
      if (orderModalBackdrop) orderModalBackdrop.classList.add('active');

      // Clear basket state
      basket.length = 0;
      updateBasketUI();
    });
  }

  function closeOrderConfirm() {
    if (orderModalBackdrop) orderModalBackdrop.classList.remove('active');
  }

  if (closeOrderModal) closeOrderModal.addEventListener('click', closeOrderConfirm);
  if (doneOrderBtn) doneOrderBtn.addEventListener('click', closeOrderConfirm);
  if (orderModalBackdrop) {
    orderModalBackdrop.addEventListener('click', (e) => {
      if (e.target === orderModalBackdrop) closeOrderConfirm();
    });
  }

});
