(() => {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.documentElement.classList.add('js');

  const preloader = $('[data-preloader]');
  const bar = $('[data-preloader-bar]');
  const count = $('[data-preloader-count]');
  const preloaderBulb = $('[data-bulb]', preloader || document);
  const loaderStart = performance.now();
  const setBulbProgress = (bulb, progress) => {
    if (!bulb) return;

    const value = Math.max(0, Math.min(100, Number(progress) || 0));

    bulb.style.setProperty('--bulb-progress', `${value}%`);
    bulb.classList.toggle('is-warm', value >= 25);
    bulb.classList.toggle('is-lit', value >= 70);
    bulb.classList.toggle('is-full', value >= 99);
  };

  const completePreloader = () => {
    if (!preloader) return;
    setBulbProgress(preloaderBulb, 100);
    preloader.classList.add('is-finished');
    window.setTimeout(() => preloader.remove(), 1300);
  };
  if (preloader && bar && count) {
    if (reducedMotion) {
      bar.style.width = '100%';
      count.textContent = '100%';
      setBulbProgress(preloaderBulb, 100);
      window.setTimeout(completePreloader, Math.max(0, 2000 - (performance.now() - loaderStart)));
    } else {
      const duration = 2000; const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(100, Math.round(((now - start) / duration) * 100));
        bar.style.width = `${progress}%`;
        count.textContent = `${String(progress).padStart(2, '0')}%`;
        setBulbProgress(preloaderBulb, progress);
        if (progress < 100) window.requestAnimationFrame(tick); else window.setTimeout(completePreloader, 350);
      };
      window.requestAnimationFrame(tick);
    }
  }

  const header = $('[data-header]');
  const sections = $$('[data-section]');
  const progress = $('[data-scroll-progress]');
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 32);
    const anchor = sections.reduce((active, section) => section.getBoundingClientRect().top <= 110 ? section : active, sections[0]);
    header.classList.toggle('is-light', anchor?.dataset.section === 'light');
    progress?.classList.toggle('is-light', anchor?.dataset.section === 'light');
    progress?.classList.toggle('is-green', Boolean(anchor?.classList.contains('site-footer')));
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty('--progress', `${max > 0 ? (window.scrollY / max) * 100 : 0}%`);
      const labels = { home: 'INTRO', univers: 'UNIVERS', luminaires: 'LUMINAIRES', table: 'TABLE', maison: 'MAISON', abidjan: 'ABIDJAN', contact: 'CONTACT' };
      progress.querySelector('[data-scroll-progress-label]')?.replaceChildren(document.createTextNode(labels[anchor?.id] || 'INTRO'));
    }
  };
  updateHeader();

  const menuButton = $('[data-menu-toggle]');
  const mobileMenu = $('[data-mobile-menu]');
  if (menuButton && mobileMenu) {
    const setMenu = (open) => {
      menuButton.setAttribute('aria-expanded', String(open)); mobileMenu.classList.toggle('is-open', open); body.classList.toggle('menu-is-open', open);
    };
    menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
    $$('a', mobileMenu).forEach((link) => link.addEventListener('click', () => setMenu(false)));
  }

  const transition = $('[data-light-transition]');
  const transitionBulb = $('[data-transition-bulb]', transition || document);
  const transitionProgress = $('[data-transition-progress]', transition || document);



  const runLightTransition = (callback, mode = 'light') => {
    if (!transition) {
      callback?.();
      return;
    }

    if (reducedMotion) {
      callback?.();
      return;
    }

    transition.dataset.mode = mode;

    setBulbProgress(transitionBulb, 0);

    if (transitionProgress) {
      transitionProgress.textContent = '00%';
    }

    /*
     * RESET COMPLET AVANT CHAQUE TRANSITION
     * Permet de rejouer l'animation autant de fois que nécessaire.
     */
    transition.classList.remove('is-active');
    transition.dataset.mode = '';
    setBulbProgress(transitionBulb, 0);

    if (transitionProgress) {
      transitionProgress.textContent = '00%';
    }

    void transition.offsetWidth;

    transition.dataset.mode = mode;
    transition.classList.add('is-active');

    const start = performance.now();
    const duration = 1000;

    const tickTransition = (now) => {
      const progress = Math.min(
        100,
        Math.round(((now - start) / duration) * 100)
      );

      setBulbProgress(transitionBulb, progress);

      if (transitionProgress) {
        transitionProgress.textContent =
          `${String(progress).padStart(2, '0')}%`;
      }

      if (progress < 100) {
        window.requestAnimationFrame(tickTransition);
      }
    };

    window.requestAnimationFrame(tickTransition);

    /*
     * Le contenu arrive lorsque l'écran est entièrement couvert.
     */
    window.setTimeout(() => {
      callback?.();
    }, 1000);

    /*
     * On garde l'ampoule totalement allumée un court instant
     * avant de faire disparaître l'écran.
     */
    window.setTimeout(() => {
      setBulbProgress(transitionBulb, 100);

      if (transitionProgress) {
        transitionProgress.textContent = '100%';
      }
    }, 1000);

    window.setTimeout(() => {
      transition.classList.remove('is-active');
    }, 2100);
  };


  /*
   * WHATSAPP — RESET DU BOUTON FLOTTANT
   *
   * Sur mobile, le lien peut conserver son état :focus
   * après l'ouverture de WhatsApp. On force le retour
   * à l'état visuel initial.
   */
  $$('.whatsapp-float').forEach((button) => {
    button.addEventListener('click', () => {
      window.setTimeout(() => {
        button.blur();
        button.classList.remove('is-active', 'is-open', 'active');
        button.style.removeProperty('transform');
      }, 300);
    });

    window.addEventListener('pageshow', () => {
      button.blur();
      button.classList.remove('is-active', 'is-open', 'active');
      button.style.removeProperty('transform');
    });
  });


  /*
   * TRANSITIONS DES UNIVERS
   *
   * - Luminaires
     */
  $$('[data-transition-link], a[href="#luminaires"]').forEach((link) => {
    link.addEventListener('click', (event) => {

      const target = link.getAttribute('href');
      const destination = target?.startsWith('#') ? $(target) : null;

      if (!destination) return;

      event.preventDefault();

      runLightTransition(
        () => {
          destination.scrollIntoView({
            behavior: reducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
        }, 'light'
      );
    });
  });


  /*
   * EXPLORER LES UNIVERS
   *
   * Le CTA #univers utilise maintenant exactement
   * le même écran de chargement.
   */
  $$('a[href="#univers"], a[href="#univers"] *').forEach((element) => {

    const link = element.closest('a[href="#univers"]');

    if (!link) return;

    link.addEventListener('click', (event) => {

      const destination = $('#univers');

      if (!destination) return;

      event.preventDefault();

      runLightTransition(
        () => {
          destination.scrollIntoView({
            behavior: reducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
        },
        'light'
      );
    });
  });

  const revealTargets = $$('[data-reveal], [data-split]');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
    }), { threshold: .12, rootMargin: '0px 0px -5% 0px' });
    revealTargets.forEach((target) => observer.observe(target));
    const cardObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-in-view');
    }), { threshold: .2 });
    $$('[data-showroom-card], [data-maison-cards] .maison-card').forEach((card) => cardObserver.observe(card));
  } else revealTargets.forEach((target) => target.classList.add('is-revealed'));

  const hero = $('[data-hero]'); const heroImage = $('[data-hero-image]');
  if (hero && heroImage && !reducedMotion && finePointer) {
    hero.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - .5) * 14; const y = (event.clientY / window.innerHeight - .5) * 10;
      heroImage.style.transform = `scale(1.06) translate(${x}px, ${y}px)`;
    });
    hero.addEventListener('pointerleave', () => { heroImage.style.transform = 'scale(1.06)'; });
  }

  if (!reducedMotion && finePointer) {
    const ambientScenes = $$('[data-hero], [data-showroom], [data-parallax-section]');
    window.addEventListener('pointermove', (event) => ambientScenes.forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      if (event.clientY >= rect.top - 80 && event.clientY <= rect.bottom + 80) {
        scene.style.setProperty('--light-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
        scene.style.setProperty('--light-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
      }
    }), { passive: true });
  }

  // Scroll storytelling: each showroom gets a single low-cost scene variable.
  let ticking = false;
  const updateScenes = () => {
    const viewport = window.innerHeight;
    $$('[data-showroom-stage], [data-table-transition], [data-parallax-section]').forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (viewport * .5 - (rect.top + rect.height * .5)) / Math.max(rect.height, 1)));
      scene.style.setProperty('--scroll-shift', `${Math.round(progress * 120)}px`);
    });
    updateHeader(); ticking = false;
  };
  const requestSceneUpdate = () => { if (!ticking) { window.requestAnimationFrame(updateScenes); ticking = true; } };
  updateScenes(); window.addEventListener('scroll', requestSceneUpdate, { passive: true }); window.addEventListener('resize', requestSceneUpdate, { passive: true });

  if (!reducedMotion && finePointer) {
    $$('.universe, [data-maison-cards] .maison-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.setProperty('--tilt-x', `${(y * -2.2).toFixed(2)}deg`); card.style.setProperty('--tilt-y', `${(x * 2.2).toFixed(2)}deg`);
        card.style.setProperty('--spot-x', `${((x + .5) * 100).toFixed(1)}%`); card.style.setProperty('--spot-y', `${((y + .5) * 100).toFixed(1)}%`);
        card.style.setProperty('--image-x', `${(x * -8).toFixed(1)}px`); card.style.setProperty('--image-y', `${(y * -5).toFixed(1)}px`);
      });
      card.addEventListener('pointerleave', () => { ['--tilt-x', '--tilt-y', '--image-x', '--image-y'].forEach((property) => card.style.removeProperty(property)); });
    });
    $$('[data-showroom-stage]').forEach((stage) => {
      stage.addEventListener('pointermove', (event) => {
        const rect = stage.getBoundingClientRect();
        stage.style.setProperty('--mouse-x', `${event.clientX - rect.left - rect.width / 2}px`);
        stage.style.setProperty('--mouse-y', `${event.clientY - rect.top - rect.height / 2}px`);
      });
    });
    $$('[data-showroom-card]').forEach((card) => {
      const visual = $('.showroom-card__visual', card);
      if (!visual) return;
      visual.addEventListener('pointermove', (event) => {
        const rect = visual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5;
        visual.style.setProperty('--tilt-x', `${(y * -3).toFixed(2)}deg`); visual.style.setProperty('--tilt-y', `${(x * 3).toFixed(2)}deg`);
        visual.style.setProperty('--spot-x', `${((x + .5) * 100).toFixed(1)}%`); visual.style.setProperty('--spot-y', `${((y + .5) * 100).toFixed(1)}%`);
      });
      visual.addEventListener('pointerleave', () => { visual.style.setProperty('--tilt-x', '0deg'); visual.style.setProperty('--tilt-y', '0deg'); });
    });
    $$('a.button, .text-link, .round-link, .header-whatsapp').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        element.style.setProperty('--mag-x', `${((event.clientX - rect.left) - rect.width / 2) * .08}px`);
        element.style.setProperty('--mag-y', `${((event.clientY - rect.top) - rect.height / 2) * .08}px`);
      });
      element.addEventListener('pointerleave', () => { element.style.removeProperty('--mag-x'); element.style.removeProperty('--mag-y'); });
    });
  }

  const cursor = $('.cursor');
  const canCursor = cursor && finePointer && !reducedMotion;
  if (canCursor) {
    let cursorX = -100, cursorY = -100, currentX = -100, currentY = -100;
    const frame = () => { currentX += (cursorX - currentX) * .2; currentY += (cursorY - currentY) * .2; cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`; requestAnimationFrame(frame); };
    frame(); window.addEventListener('pointermove', (event) => {
      cursorX = event.clientX; cursorY = event.clientY;
      const under = document.elementFromPoint(event.clientX, event.clientY);
      const section = under?.closest('[data-section]');
      const image = under?.closest('img, .showroom-card__visual, [data-hero]');
      const light = section?.dataset.section === 'light' || under?.closest('.contact-interlude, .site-footer, .site-header.is-light');
      cursor.classList.toggle('is-contrast', Boolean(light));
      cursor.classList.toggle('is-image', Boolean(image));
    });
    $$('a, button, [data-cursor]').forEach((item) => {
      item.addEventListener('mouseenter', () => { cursor.classList.add('is-active'); cursor.classList.toggle('is-button', item.matches('a.button, button')); });
      item.addEventListener('mouseleave', () => { cursor.classList.remove('is-active', 'is-button', 'is-image'); });
    });
  }

  const modal = $('[data-product-modal]'); let lastFocused = null;
  if (modal) {
    const modalImage = $('[data-modal-image]', modal); const modalName = $('[data-modal-name]', modal); const modalNumber = $('[data-modal-number]', modal);
    const modalCategory = $('[data-modal-category]', modal); const modalDescription = $('[data-modal-description]', modal); const modalPrice = $('[data-modal-price]', modal);
    const modalAvailability = $('[data-modal-availability]', modal); const modalWhatsapp = $('[data-modal-whatsapp]', modal);
    const close = () => { modal.classList.add('is-closing'); modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); body.classList.remove('modal-is-open'); window.setTimeout(() => modal.classList.remove('is-closing'), 550); lastFocused?.focus(); };
    const open = (card, trigger) => {
      lastFocused = trigger; const data = card.dataset; modalImage.src = data.productImage; modalImage.alt = data.productAlt; modalName.textContent = data.productName; modalNumber.textContent = data.productNumber;
      modalCategory.textContent = data.productCategory; modalDescription.textContent = data.productDescription; modalPrice.textContent = data.productPrice; modalAvailability.textContent = data.productAvailability;
      modalWhatsapp.href = `https://wa.me/2250700000000?text=${encodeURIComponent(`Bonjour Lumière du Monde, je souhaite en savoir plus sur ${data.productName}.`)}`;
      modalWhatsapp.hidden = data.productAvailability === 'Indisponible'; modal.classList.remove('is-closing'); modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); body.classList.add('modal-is-open');
      window.setTimeout(() => $('[data-close-modal]', modal)?.focus(), 200);
    };
    $$('[data-open-product]').forEach((trigger) => trigger.addEventListener('click', () => open(trigger.closest('[data-product-card]'), trigger)));
    $$('[data-close-modal]', modal).forEach((button) => button.addEventListener('click', close));
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('is-open')) close(); });
  }
})();

/* ============================================================
   LEGAL MODAL — Mentions légales / Confidentialité
   ============================================================ */
(() => {
  const legalModal = document.querySelector('[data-legal-modal-root]');
  if (!legalModal) return;

  const triggers = document.querySelectorAll('[data-legal-modal]');
  const closeButtons = legalModal.querySelectorAll('[data-close-legal-modal]');
  const title = legalModal.querySelector('[data-legal-title]');
  const eyebrow = legalModal.querySelector('[data-legal-eyebrow]');
  const contents = legalModal.querySelectorAll('[data-legal-content]');
  let lastLegalTrigger = null;

  const setContent = (type) => {
    const isPrivacy = type === 'privacy';

    if (title) {
      title.textContent = isPrivacy
        ? 'Politique de confidentialité'
        : 'Mentions légales';
    }

    if (eyebrow) {
      eyebrow.textContent = isPrivacy
        ? 'Confidentialité'
        : 'Informations';
    }

    contents.forEach((section) => {
      section.hidden = section.dataset.legalContent !== type;
    });
  };

  const closeLegal = () => {
    legalModal.classList.add('is-closing');
    legalModal.classList.remove('is-open');
    legalModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-is-open');

    window.setTimeout(() => {
      legalModal.classList.remove('is-closing');
    }, 550);

    lastLegalTrigger?.focus();
  };

  const openLegal = (trigger) => {
    const type = trigger.dataset.legalModal;

    lastLegalTrigger = trigger;
    setContent(type);

    legalModal.classList.remove('is-closing');
    legalModal.classList.add('is-open');
    legalModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-is-open');

    window.setTimeout(() => {
      legalModal.querySelector('.legal-modal__close')?.focus();
    }, 180);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openLegal(trigger));
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeLegal);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && legalModal.classList.contains('is-open')) {
      closeLegal();
    }
  });
})();


/* ============================================================
   COLLECTION EXPANSION
   ============================================================ */
(() => {
  const collectionGrids = document.querySelectorAll('[data-collection-grid]');

  collectionGrids.forEach((grid) => {
    const wrapper = grid.parentElement;
    const toggle = wrapper?.querySelector('[data-collection-toggle]');
    const label = toggle?.querySelector('[data-collection-toggle-label]');

    if (!toggle) return;

    const extras = grid.querySelectorAll('[data-collection-extra="true"]');

    if (!extras.length) {
      toggle.closest('[data-collection-toggle-wrap]')?.remove();
      return;
    }

    toggle.addEventListener('click', () => {
      const expanded = grid.classList.toggle('is-expanded');

      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');

      if (label) {
        label.textContent = expanded
          ? 'Réduire nos collections'
          : 'Voir toutes nos collections';
      }

      if (expanded) {
        extras.forEach((card, index) => {
          card.style.transitionDelay = `${index * 55}ms`;
        });
      } else {
        extras.forEach((card) => {
          card.style.transitionDelay = '0ms';
        });

        grid.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  });
})();

/* ============================================================
   LEGAL CURSOR STATE
   ============================================================ */
(() => {
  const legalModal = document.querySelector('[data-legal-modal-root]');
  if (!legalModal) return;

  const openLegal = () => {
    document.body.classList.add('legal-modal-is-open');
  };

  const closeLegal = () => {
    document.body.classList.remove('legal-modal-is-open');
  };

  document.querySelectorAll('[data-legal-modal]').forEach((trigger) => {
    trigger.addEventListener('click', openLegal);
  });

  legalModal.querySelectorAll('[data-close-legal-modal]').forEach((button) => {
    button.addEventListener('click', closeLegal);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && legalModal.classList.contains('is-open')) {
      closeLegal();
    }
  });
})();


/* LDM CART */
(() => {
  const STORAGE_KEY = 'ldm_cart';
  const products = window.ldmCartProducts || {};

  const load = () => {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  };

  let cart = load();

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  };

  const money = (value) =>
    `${Number(value || 0).toLocaleString('fr-FR')} FCFA`;

  const count = () =>
    cart.reduce((total, item) => total + item.qty, 0);

  const total = () =>
    cart.reduce((sum, item) => {
      const product = products[item.id];
      return sum + ((product?.price || 0) * item.qty);
    }, 0);

  const render = () => {
    const root = document.querySelector('.ldm-cart');
    if (!root) return;

    const items = root.querySelector('.ldm-cart__items');
    const empty = root.querySelector('.ldm-cart__empty');
    const totalNode = root.querySelector('.ldm-cart-total');
    const checkout = root.querySelector('[data-cart-checkout]');
    const counters = document.querySelectorAll('.ldm-cart-count');

    counters.forEach(node => {
      node.textContent = count();
      node.hidden = count() === 0;
    });

    if (!cart.length) {
      items.innerHTML = '';
      empty.hidden = false;
      checkout.disabled = true;
      totalNode.textContent = '0 FCFA';
      return;
    }

    empty.hidden = true;
    checkout.disabled = false;

    items.innerHTML = cart.map(item => {
      const product = products[item.id];
      if (!product) return '';

      return `
        <article class="ldm-cart-item" data-id="${item.id}">
          <div class="ldm-cart-item__image">
            ${product.image ? `<img src="${product.image}" alt="">` : ''}
          </div>

          <div class="ldm-cart-item__body">
            <strong>${product.name}</strong>
            <span>${product.priceText}</span>

            <div class="ldm-cart-item__actions">
              <button type="button" data-cart-minus aria-label="Diminuer">−</button>
              <b>${item.qty}</b>
              <button type="button" data-cart-plus aria-label="Augmenter">+</button>
              <button type="button" data-cart-remove>Supprimer</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    totalNode.textContent = money(total());
  };

  const open = () => {
    const root = document.querySelector('.ldm-cart');
    const toggle = document.querySelector('.ldm-cart-toggle');
    if (!root) return;

    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
    toggle?.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('ldm-cart-open');
  };

  const close = () => {
    const root = document.querySelector('.ldm-cart');
    const toggle = document.querySelector('.ldm-cart-toggle');
    if (!root) return;

    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    toggle?.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('ldm-cart-open');
  };

  window.ldmAddToCart = (id) => {
    if (!products[id]) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, qty: 1 });
    }

    save();
    render();
    open();
  };

  document.addEventListener('click', event => {
    const add = event.target.closest('[data-add-to-cart]');
    if (add) {
      event.preventDefault();
      ldmAddToCart(add.dataset.addToCart);
      return;
    }

    if (event.target.closest('.ldm-cart-toggle')) {
      open();
      return;
    }

    if (event.target.closest('[data-cart-close]')) {
      close();
      return;
    }

    const item = event.target.closest('.ldm-cart-item');
    if (!item) return;

    const id = item.dataset.id;
    const entry = cart.find(row => row.id === id);

    if (event.target.closest('[data-cart-plus]') && entry) {
      entry.qty += 1;
      save();
      render();
    }

    if (event.target.closest('[data-cart-minus]') && entry) {
      entry.qty -= 1;

      if (entry.qty <= 0) {
        cart = cart.filter(row => row.id !== id);
      }

      save();
      render();
    }

    if (event.target.closest('[data-cart-remove]')) {
      cart = cart.filter(row => row.id !== id);
      save();
      render();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
  });

  render();
})();


/* LDM CHECKOUT */
(() => {
  const STORAGE_KEY = 'ldm_cart';
  const products = window.ldmCartProducts || {};

  const loadCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(cart) ? cart : [];
    } catch {
      return [];
    }
  };

  const money = value =>
    `${Number(value || 0).toLocaleString('fr-FR')} FCFA`;

  const total = cart =>
    cart.reduce((sum, item) => {
      const product = products[item.id];
      return sum + ((product?.price || 0) * item.qty);
    }, 0);

  const openCheckout = () => {
    const root = document.querySelector('.ldm-checkout');
    if (!root) return;

    const cart = loadCart();

    if (!cart.length) return;

    const list = root.querySelector('.ldm-checkout__summary-items');

    list.innerHTML = cart.map(item => {
      const product = products[item.id];
      if (!product) return '';

      return `
        <div>
          <span>${product.name} × ${item.qty}</span>
          <strong>${money(product.price * item.qty)}</strong>
        </div>
      `;
    }).join('');

    root.querySelector('.ldm-checkout__summary-total').textContent = money(total(cart));

    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('ldm-checkout-open');
  };

  const closeCheckout = () => {
    const root = document.querySelector('.ldm-checkout');
    if (!root) return;

    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('ldm-checkout-open');
  };

  document.addEventListener('click', event => {
    if (event.target.closest('[data-cart-checkout]')) {
      openCheckout();
      return;
    }

    if (event.target.closest('[data-checkout-close]')) {
      closeCheckout();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeCheckout();
  });

  document.addEventListener('submit', async event => {
    const form = event.target.closest('.ldm-checkout__form');
    if (!form) return;

    event.preventDefault();

    const message = form.querySelector('.ldm-checkout__message');
    const submit = form.querySelector('.ldm-checkout__submit');
    const cart = loadCart();

    if (!cart.length) {
      message.textContent = 'Votre panier est vide.';
      return;
    }

    submit.disabled = true;
    message.textContent = 'Enregistrement de votre commande…';

    const data = new FormData(form);
    data.append('action', 'ldm_create_order');
    data.append('nonce', window.ldmCheckout?.nonce || '');
    data.append('items', JSON.stringify(cart));

    try {
      const response = await fetch(window.ldmCheckout?.ajaxUrl || '', {
        method: 'POST',
        body: data,
        credentials: 'same-origin'
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.data?.message || 'Une erreur est survenue.');
      }

      localStorage.removeItem(STORAGE_KEY);

      message.textContent = `Commande #${result.data.order_id} enregistrée. Nous allons maintenant préparer le paiement.`;

      setTimeout(() => {
        window.location.reload();
      }, 1800);

    } catch (error) {
      message.textContent = error.message || 'Impossible d’enregistrer la commande.';
      submit.disabled = false;
    }
  });
})();



/* LDM CART UI */
(() => {
  const CART_KEY = 'ldm_cart';

  const readCart = () => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    } catch {
      return {};
    }
  };

  const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent('ldm:cart-updated', {
      detail: cart
    }));
  };

  const getProductId = (control) => {
    const product = control.closest('[data-product-id]');
    return product?.dataset.productId
      || control.dataset.productId
      || control.closest('[data-product]')?.dataset.productId
      || null;
  };

  const refreshControl = (control, quantity) => {
    const add = control.querySelector('[data-cart-add]');
    const qty = control.querySelector('[data-cart-quantity]');
    const count = control.querySelector('[data-cart-count]');

    if (count) count.textContent = quantity;

    if (quantity > 0) {
      if (add) add.hidden = true;
      if (qty) qty.hidden = false;
    } else {
      if (add) add.hidden = false;
      if (qty) qty.hidden = true;
    }
  };

  document.querySelectorAll('[data-cart-product]').forEach((control) => {
    const id = getProductId(control);
    if (!id) return;

    const cart = readCart();
    refreshControl(control, Number(cart[id] || 0));
  });

  document.addEventListener('click', (event) => {
    const add = event.target.closest('[data-cart-add]');
    const plus = event.target.closest('[data-cart-plus]');
    const minus = event.target.closest('[data-cart-minus]');

    if (!add && !plus && !minus) return;

    const control = event.target.closest('[data-cart-product]');
    if (!control) return;

    const id = getProductId(control);
    if (!id) return;

    const cart = readCart();
    let quantity = Number(cart[id] || 0);

    if (add || plus) {
      quantity += 1;
    }

    if (minus) {
      quantity = Math.max(0, quantity - 1);
    }

    if (quantity > 0) {
      cart[id] = quantity;
    } else {
      delete cart[id];
    }

    saveCart(cart);
    refreshControl(control, quantity);
  });
})();

