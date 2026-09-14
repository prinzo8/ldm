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
   * EXPLORER LES LUMINAIRES
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
      const light = section?.dataset.section === 'light' || under?.closest('.showroom--tableware, .contact-interlude, .site-footer, .site-header.is-light');
      cursor.classList.toggle('is-contrast', Boolean(light));
      cursor.classList.toggle('is-image', Boolean(image));
    });
    $$('a, button, [data-cursor]').forEach((item) => {
      item.addEventListener('mouseenter', () => { cursor.classList.add('is-active'); cursor.classList.toggle('is-button', item.matches('a.button, button')); });
      item.addEventListener('mouseleave', () => { cursor.classList.remove('is-active', 'is-button', 'is-image'); });
    });
  }

  const modal = $('[data-product-modal]');
  let lastFocused = null;

  if (modal) {
    const modalImage = $('[data-modal-image]', modal);
    const modalName = $('[data-modal-name]', modal);
    const modalNumber = $('[data-modal-number]', modal);
    const modalCategory = $('[data-modal-category]', modal);
    const modalDescription = $('[data-modal-description]', modal);
    const modalPrice = $('[data-modal-price]', modal);
    const modalAvailability = $('[data-modal-availability]', modal);
    const modalQuantity = $('[data-modal-cart-quantity]', modal);
    const modalAdd = $('[data-modal-cart-add]', modal);
    const modalMinus = $('[data-modal-cart-minus]', modal);

    let currentProductId = null;

    const getCart = () => {
      try {
        return JSON.parse(localStorage.getItem('ldmCart') || '{}');
      } catch {
        return {};
      }
    };

    const saveCart = (cart) => {
      localStorage.setItem('ldmCart', JSON.stringify(cart));
      document.dispatchEvent(new CustomEvent('ldm:cart-updated'));
    };

    const updateQuantity = () => {
      if (!currentProductId || !modalQuantity) return;

      const cart = getCart();
      const quantity = Number(cart[currentProductId] || 0);
      modalQuantity.textContent = quantity;
    };

    const changeQuantity = (delta) => {
      if (!currentProductId) return;

      const cart = getCart();
      const current = Number(cart[currentProductId] || 0);
      const next = Math.max(0, current + delta);

      if (next === 0) {
        delete cart[currentProductId];
      } else {
        cart[currentProductId] = next;

        const productMeta = JSON.parse(
          localStorage.getItem('ldmCartMeta') || '{}'
        );

        if (!productMeta[currentProductId]) {
          productMeta[currentProductId] = {
            name: String(modalName?.textContent || '').trim(),
            number: String(modalNumber?.textContent || '').trim()
          };

          localStorage.setItem(
            'ldmCartMeta',
            JSON.stringify(productMeta)
          );
        }
      }

      saveCart(cart);
      updateQuantity();
    };

    const close = () => {
      modal.classList.add('is-closing');
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      body.classList.remove('modal-is-open');

      window.setTimeout(
        () => modal.classList.remove('is-closing'),
        550
      );

      lastFocused?.focus();
    };

    const open = (card, trigger) => {
      if (!card) return;

      lastFocused = trigger;

      const data = card.dataset;
      currentProductId =
        data.productId ||
        data.productNumber ||
        data.productName;

      // Sauvegarder le vrai nom et le numéro du produit
      // pour le panier.
      if (currentProductId) {
        const productMeta = JSON.parse(
          localStorage.getItem('ldmCartMeta') || '{}'
        );

        productMeta[currentProductId] = {
          name: String(data.productName || '').trim(),
          number: String(data.productNumber || '').trim()
        };

        localStorage.setItem(
          'ldmCartMeta',
          JSON.stringify(productMeta)
        );
      }

      if (modalImage) {
        modalImage.src = data.productImage || '';
        modalImage.alt = data.productAlt || data.productName || '';
      }

      if (modalName) modalName.textContent = data.productName || '';
      if (modalNumber) modalNumber.textContent = data.productNumber || '';
      if (modalCategory) modalCategory.textContent = data.productCategory || '';
      if (modalDescription) modalDescription.textContent = data.productDescription || '';
      if (modalPrice) modalPrice.textContent = data.productPrice || '';
      if (modalAvailability) modalAvailability.textContent = data.productAvailability || '';

      updateQuantity();

      modal.classList.remove('is-closing');
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      body.classList.add('modal-is-open');

      window.setTimeout(
        () => $('[data-close-modal]', modal)?.focus(),
        200
      );
    };

    $$('[data-open-product]').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        open(trigger.closest('[data-product-card]'), trigger);
      });
    });

    modalAdd?.addEventListener('click', () => changeQuantity(1));

    const modalAddProduct = $('[data-modal-cart-add-product]', modal);

    modalAddProduct?.addEventListener('click', () => {
      if (!currentProductId) return;

      const cart = getCart();
      const quantity = Number(cart[currentProductId] || 0);

      const productMeta = JSON.parse(
        localStorage.getItem('ldmCartMeta') || '{}'
      );

      if (!productMeta[currentProductId]) {
        productMeta[currentProductId] = {
          name: String(modalName?.textContent || '').trim(),
          number: String(modalNumber?.textContent || '').trim(),
          image: String(
            modal.querySelector('img')?.getAttribute('src') || ''
          )
        };

        localStorage.setItem(
          'ldmCartMeta',
          JSON.stringify(productMeta)
        );
      }

      cart[currentProductId] = Math.max(1, quantity);
      saveCart(cart);
      updateQuantity();

      document.querySelector('[data-cart-open]')?.classList.add('is-added');

      window.setTimeout(() => {
        document.querySelector('[data-cart-open]')?.classList.remove('is-added');
      }, 700);
    });

    modalMinus?.addEventListener('click', () => changeQuantity(-1));

    $$('[data-close-modal]', modal).forEach((button) => {
      button.addEventListener('click', close);
    });

    window.addEventListener('keydown', (event) => {
      if (
        event.key === 'Escape' &&
        modal.classList.contains('is-open')
      ) {
        close();
      }
    });
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


/* ============================================================
   LDM_CART_DRAWER_V2
   ============================================================ */
(() => {
  const drawer = document.querySelector("[data-cart-drawer]");
  const trigger = document.querySelector("[data-cart-open]");

  if (!drawer || !trigger) {
    console.warn("LDM CART: bouton ou panneau introuvable", {
      trigger: !!trigger,
      drawer: !!drawer
    });
    return;
  }

  const count = document.querySelector("[data-cart-count]");
  const items = drawer.querySelector("[data-cart-items]");
  const total = drawer.querySelector("[data-cart-total]");
  const closeButton = drawer.querySelector("[data-cart-close]");

  const getCart = () => {
    try {
      return JSON.parse(localStorage.getItem("ldmCart") || "{}");
    } catch (error) {
      console.warn("LDM CART: panier localStorage invalide", error);
      return {};
    }
  };

  const getTotalQty = () => {
    const cart = getCart();

    return Object.values(cart).reduce((sum, value) => {
      const qty = Number(value);
      return sum + (Number.isFinite(qty) && qty > 0 ? qty : 0);
    }, 0);
  };

  const getCartMeta = () => {
    try {
      return JSON.parse(localStorage.getItem("ldmCartMeta") || "{}");
    } catch {
      return {};
    }
  };

  const saveCart = (cart) => {
    localStorage.setItem("ldmCart", JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent("ldm:cart-updated"));
  };

  const updateCount = () => {
    const qty = getTotalQty();

    if (count) {
      count.textContent = `${qty}`;
    }

    const totalLabel = drawer.querySelector("[data-cart-total]");

    if (totalLabel) {
      totalLabel.textContent =
        `${qty} article${qty > 1 ? "s" : ""}`;
    }
  };

  const renderCart = () => {
    if (!items) return;

    const cart = getCart();
    const meta = getCartMeta();
    const products = window.ldmCartProducts || {};

    const entries = Object.entries(cart)
      .map(([id, value]) => {
        const qty = Number(value);

        if (!Number.isFinite(qty) || qty <= 0) {
          return null;
        }

        const product =
          meta[id] ||
          products[id] ||
          {};

        const name =
          product.name ||
          product.productName ||
          product.title ||
          "Produit";

        const number =
          product.number ||
          product.productNumber ||
          id;

        const image =
          product.image ||
          product.productImage ||
          '';

        return {
          id,
          qty,
          name,
          number,
          image
        };
      })
      .filter(Boolean);

    if (!entries.length) {
      items.innerHTML =
        '<p class="ldm-cart__empty">Votre panier est vide.</p>';

      updateCount();
      return;
    }

    items.innerHTML = entries.map((item) => `
      <div class="ldm-cart__item" data-cart-item="${item.id}">
        ${item.image ? `
          <div class="ldm-cart__item-image">
            <img
              src="${item.image}"
              alt="${item.name}"
              loading="lazy"
            >
          </div>
        ` : ''}
        <div class="ldm-cart__item-info">
          <strong class="ldm-cart__item-name">${item.name}</strong>
          <span class="ldm-cart__item-number">${item.number}</span>
        </div>

        <div class="ldm-cart__item-quantity">
          <button
            type="button"
            class="cart-qty__button cart-cursor-black"
            data-cart-minus
            data-cart-id="${item.id}"
            aria-label="Diminuer la quantité">
            −
          </button>

          <span data-cart-quantity="${item.id}">${item.qty}</span>

          <button
            type="button"
            class="cart-qty__button cart-cursor-black"
            data-cart-add
            data-cart-id="${item.id}"
            aria-label="Augmenter la quantité">
            +
          </button>
        </div>
      </div>
    `).join("");

    updateCount();
  };

  const changeCartQuantity = (id, delta) => {
    if (!id) return;

    const cart = getCart();
    const current = Number(cart[id] || 0);
    const next = Math.max(0, current + delta);

    if (next <= 0) {
      delete cart[id];
    } else {
      cart[id] = next;
    }

    saveCart(cart);
    renderCart();
  };

  // Le bouton "Vers paiement" est géré par
  // le module LDM CART PAYMENT CHOICE plus bas.

  items?.addEventListener("click", (event) => {
    const button = event.target.closest(
      "[data-cart-add], [data-cart-minus]"
    );

    if (!button) return;

    event.preventDefault();
    event.stopPropagation();

    const id = button.dataset.cartId;

    if (button.hasAttribute("data-cart-add")) {
      changeCartQuantity(id, 1);
    } else {
      changeCartQuantity(id, -1);
    }
  });

  const openCart = (event) => {
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    renderCart();
    updateCount();

    drawer.removeAttribute("hidden");
    drawer.hidden = false;
    drawer.classList.add("is-open", "is-visible");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-is-open");

    console.log("LDM CART: ouvert");
  };

  const closeCart = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    drawer.classList.remove("is-open", "is-visible");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-is-open");

    console.log("LDM CART: fermé");
  };

  trigger.addEventListener("click", openCart, true);
  closeButton?.addEventListener("click", closeCart, true);

  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("cart-is-open")) {
      return;
    }

    if (!drawer.contains(event.target)) {
      closeCart(event);
    }
  });

  document.addEventListener("ldm:cart-updated", updateCount);

  window.addEventListener("storage", (event) => {
    if (event.key === "ldmCart") updateCount();
  });

  updateCount();

  console.log("LDM CART: initialisé");
})();
 

/* LDM_CART_PRELOADER_FIX */
(() => {
  const revealCart = () => {
    document.documentElement.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
  };

  if (document.readyState === 'complete') {
    window.setTimeout(revealCart, 50);
  } else {
    window.addEventListener('load', () => {
      window.setTimeout(revealCart, 50);
    }, { once: true });
  }
})();


/* LDM FINAL CART MOTION JS */
(() => {
    const setReady = () => {
        document.documentElement.classList.remove('is-loading');
        document.body?.classList.remove('is-loading', 'is-preloading');
    };

    const hideCartDuringLoading = () => {
        document.documentElement.classList.add('is-loading');
        document.body?.classList.add('is-loading');
    };

    hideCartDuringLoading();

    if (document.readyState === 'complete') {
        setReady();
    } else {
        window.addEventListener('load', setReady, { once: true });
    }
})();


/* LDM CART FLOATING CURSOR */
(() => {
    const initCartCursor = () => {
        const cursor = document.querySelector('[data-cursor-root], .cursor');

        if (!cursor) return;

        document.querySelectorAll(
            '[data-cart-open], .cart-button, .cart-toggle, .floating-cart'
        ).forEach((button) => {
            button.addEventListener('mouseenter', () => {
                cursor.classList.add('is-active');
                cursor.classList.add('is-button');
                cursor.classList.add('is-cart');
                cursor.classList.remove('is-contrast');
            });

            button.addEventListener('mouseleave', () => {
                cursor.classList.remove(
                    'is-active',
                    'is-button',
                    'is-cart'
                );
            });
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCartCursor, {
            once: true
        });
    } else {
        initCartCursor();
    }
})();


/* LDM CART DISPLAY NAME NUMBER QUANTITY */
(() => {
    const getCartStorage = () => {
        try {
            return JSON.parse(localStorage.getItem('ldmCart') || '{}');
        } catch {
            return {};
        }
    };

    const renderCartSimple = () => {
        const container = document.querySelector(
            '[data-cart-items-list]'
        );

        if (!container) return;

        const cart = getCartStorage();
        const entries = Object.values(cart).filter(
            (item) => Number(item.quantity) > 0
        );

        if (!entries.length) {
            container.innerHTML =
                '<p class="cart-empty">Votre panier est vide.</p>';
            return;
        }

        container.innerHTML = entries.map((item) => {
            const name = item.name || item.productName || 'Produit';
            const number =
                item.number ||
                item.productNumber ||
                item.id ||
                '';

            const quantity = Number(item.quantity) || 0;

            return `
                <article class="cart-simple-item">
                    <div class="cart-simple-item__info">
                        <strong class="cart-simple-item__name">
                            ${name}
                        </strong>
                        <span class="cart-simple-item__number">
                            N° ${number}
                        </span>
                    </div>

                    <span class="cart-simple-item__quantity">
                        × ${quantity}
                    </span>
                </article>
            `;
        }).join('');
    };

    window.addEventListener('storage', renderCartSimple);

    document.addEventListener('DOMContentLoaded', renderCartSimple);

    /*
     * Les boutons + / − existants peuvent modifier le panier.
     * On rafraîchit l'affichage juste après leur utilisation.
     */
    document.addEventListener('click', (event) => {
        if (
            event.target.closest('[data-cart-add]') ||
            event.target.closest('[data-cart-minus]') ||
            event.target.closest('[data-modal-cart-add]') ||
            event.target.closest('[data-modal-cart-minus]')
        ) {
            window.setTimeout(renderCartSimple, 50);
        }
    });

    window.ldmRenderCartSimple = renderCartSimple;
})();


/* ============================================================
   LDM CART PRELOADER FINAL
   ============================================================ */
(() => {
  const revealCartButton = () => {
    document.documentElement.classList.remove("is-loading", "is-preloading");
    document.body.classList.remove("is-loading", "is-preloading");

    document.documentElement.classList.add("is-loaded");
    document.body.classList.add("is-loaded");

    const cartButton = document.querySelector("[data-cart-open]");

    if (cartButton) {
      cartButton.style.removeProperty("display");
      cartButton.removeAttribute("aria-hidden");
    }
  };

  if (document.readyState === "complete") {
    window.setTimeout(revealCartButton, 100);
  } else {
    window.addEventListener("load", () => {
      window.setTimeout(revealCartButton, 100);
    }, { once: true });
  }
})();


/* ============================================================
   LDM — CTA EXPLORER LES LUMINAIRES
   Mini transition blanche — 1.5 seconde
   Puis affichage de la section Luminaires
   ============================================================ */

(() => {
    const transition = document.querySelector('[data-univers-transition]');

    if (!transition) {
        console.warn('LDM UNIVERS: transition introuvable');
        return;
    }

    const links = Array.from(document.querySelectorAll('a, button'));

    const universLinks = links.filter((element) => {
        const text = element.textContent
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();

        return text.includes('explorer les luminaires');
    });

    if (!universLinks.length) {
        console.warn('LDM UNIVERS: CTA introuvable');
        return;
    }

    universLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');

            if (!href || !href.includes('#univers')) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const luminaires = document.querySelector('#luminaires');

            transition.setAttribute('aria-hidden', 'false');
            transition.classList.remove('is-finished');
            transition.classList.add('is-active');

            window.setTimeout(() => {
                transition.classList.remove('is-active');
                transition.classList.add('is-finished');

                if (luminaires) {
                    luminaires.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                window.setTimeout(() => {
                    transition.setAttribute('aria-hidden', 'true');
                }, 250);
            }, 1500);
        });
    });

    console.log('LDM UNIVERS: CTA luminaires initialisé');
})();


/* ============================================================
   LDM CART PAYMENT CHOICE
   Panier → choix du paiement
   ============================================================ */

(() => {
    const cart = document.querySelector('[data-cart-drawer]');

    if (!cart) return;

    const checkout = cart.querySelector('[data-cart-checkout]');
    const payment = cart.querySelector('[data-cart-payment]');
    const paymentBack = cart.querySelector('[data-cart-payment-back]');
    const paymentMethods = cart.querySelectorAll('[data-payment-method]');

    if (!checkout || !payment) return;

    const showPayment = (event) => {
        event?.preventDefault();
        event?.stopPropagation();

        payment.removeAttribute('aria-hidden');
        payment.setAttribute('aria-hidden', 'false');
        payment.classList.add('is-active');

        cart.classList.add('is-payment');
    };

    const hidePayment = (event) => {
        event?.preventDefault();
        event?.stopPropagation();

        payment.classList.remove('is-active');
        payment.setAttribute('aria-hidden', 'true');

        cart.classList.remove('is-payment');
    };

    checkout.addEventListener('click', showPayment, true);
    paymentBack?.addEventListener('click', hidePayment, true);

    paymentMethods.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            const method = button.dataset.paymentMethod;

            console.log('LDM PAYMENT:', method);

            /*
             * Pour le moment, aucun paiement réel n'est lancé.
             * Les intégrations Orange Money / Wave seront ajoutées
             * lorsque les identifiants et URLs de paiement seront prêts.
             */

            paymentMethods.forEach((item) => {
                item.classList.remove('is-selected');
            });

            button.classList.add('is-selected');
        });
    });

    console.log('LDM PAYMENT: choix de paiement initialisé');
})();

/* ============================================================
   LDM — CART PREMIUM ANIMATION
   Gestion des transitions panier ↔ paiement
   ============================================================ */

(() => {
    const drawer = document.querySelector('[data-cart-drawer]');

    if (!drawer) return;

    const inner = drawer.querySelector('.ldm-cart__inner');
    const payment = drawer.querySelector('[data-cart-payment]');
    const checkout = drawer.querySelector('[data-cart-checkout]');
    const paymentBack = drawer.querySelector('[data-cart-payment-back]');

    if (!inner || !payment) return;

    let transitioning = false;

    const refreshCartScroll = () => {
        const activePanel = drawer.classList.contains('is-payment')
            ? payment
            : inner;

        if (activePanel) {
            activePanel.scrollTop = 0;
        }
    };

    const showPayment = (event) => {
        event?.preventDefault();
        event?.stopPropagation();

        if (transitioning || drawer.classList.contains('is-payment')) {
            return;
        }

        transitioning = true;

        drawer.classList.add('is-payment');

        payment.removeAttribute('aria-hidden');
        payment.setAttribute('aria-hidden', 'false');

        window.setTimeout(() => {
            refreshCartScroll();
            transitioning = false;
        }, 600);
    };

    const showCart = (event) => {
        event?.preventDefault();
        event?.stopPropagation();

        if (transitioning || !drawer.classList.contains('is-payment')) {
            return;
        }

        transitioning = true;

        drawer.classList.remove('is-payment');

        payment.setAttribute('aria-hidden', 'true');

        window.setTimeout(() => {
            refreshCartScroll();
            transitioning = false;
        }, 600);
    };

    /*
     * Capture = true pour prendre la main avant les handlers
     * génériques du panier.
     */
    checkout?.addEventListener('click', showPayment, true);
    paymentBack?.addEventListener('click', showCart, true);

    /*
     * Quand le panier est ouvert, on revient toujours
     * sur son état principal.
     */
    drawer.addEventListener('cart:opened', () => {
        drawer.classList.remove('is-payment');

        payment.setAttribute('aria-hidden', 'true');

        window.requestAnimationFrame(() => {
            refreshCartScroll();
        });
    });

    /*
     * Empêche le scroll de traverser le panneau vers la page.
     */
    [inner, payment].forEach((panel) => {
        panel.addEventListener('wheel', (event) => {
            event.stopPropagation();
        }, { passive: true });

        panel.addEventListener('touchmove', (event) => {
            event.stopPropagation();
        }, { passive: true });
    });

    /*
     * Réinitialise le scroll lorsque le panneau change.
     */
    const observer = new MutationObserver(() => {
        if (drawer.classList.contains('is-payment')) {
            payment.scrollTop = 0;
        }
    });

    observer.observe(drawer, {
        attributes: true,
        attributeFilter: ['class']
    });

    console.log('LDM CART PREMIUM : animations panier/paiement activées');
})();


/* LDM — FORCE CART CURSOR */
(function () {
    function forceCartCursor() {
        const cursor = document.querySelector(
            '[data-cursor-root], .cursor, .custom-cursor'
        );

        if (!cursor) return;

        if (document.body.classList.contains('cart-is-open')) {
            cursor.classList.add('is-cart');

            cursor.style.setProperty(
                'visibility',
                'visible',
                'important'
            );

            cursor.style.setProperty(
                'opacity',
                '1',
                'important'
            );

            cursor.style.setProperty(
                'z-index',
                '2147483647',
                'important'
            );

            cursor.style.setProperty(
                'pointer-events',
                'none',
                'important'
            );
        }
    }

    document.addEventListener(
        'ldm:cart-updated',
        forceCartCursor
    );

    document.addEventListener(
        'mousemove',
        forceCartCursor,
        { passive: true }
    );

    const observer = new MutationObserver(forceCartCursor);

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
})();


/* LDM CART CURSOR FORCE FINAL */
(() => {
    const forceCartCursor = (open) => {
        const cursor = document.querySelector(
            '[data-cursor-root], .cursor, .custom-cursor'
        );

        document.body.classList.toggle('cart-is-open', open);

        if (!cursor) return;

        if (open) {
            cursor.classList.add('is-cart');
            cursor.classList.add('is-active');
            cursor.classList.remove('is-image');
            cursor.classList.remove('is-contrast');

            cursor.style.setProperty('display', 'block', 'important');
            cursor.style.setProperty('visibility', 'visible', 'important');
            cursor.style.setProperty('opacity', '1', 'important');
            cursor.style.setProperty('z-index', '2147483647', 'important');
            cursor.style.setProperty('border-color', '#000', 'important');
            cursor.style.setProperty('background', '#000', 'important');
            cursor.style.setProperty('box-shadow', '0 0 0 5px rgba(0,0,0,.12)', 'important');
            cursor.style.setProperty('mix-blend-mode', 'normal', 'important');
        } else {
            cursor.classList.remove('is-cart');

            cursor.style.removeProperty('border-color');
            cursor.style.removeProperty('background');
            cursor.style.removeProperty('box-shadow');
            cursor.style.removeProperty('mix-blend-mode');
        }
    };

    const findCart = () =>
        document.querySelector('[data-cart-drawer]');

    const syncCartCursor = () => {
        const drawer = findCart();

        if (!drawer) return;

        const isOpen =
            drawer.classList.contains('is-open') ||
            drawer.getAttribute('aria-hidden') === 'false';

        forceCartCursor(isOpen);
    };

    // Surveille l'ouverture / fermeture du panier
    const observer = new MutationObserver(() => {
        syncCartCursor();
    });

    const start = () => {
        const drawer = findCart();

        if (drawer) {
            observer.observe(drawer, {
                attributes: true,
                attributeFilter: ['class', 'aria-hidden']
            });
        }

        syncCartCursor();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }

    // Sécurité : clic sur le bouton panier
    document.addEventListener('click', (event) => {
        const openButton = event.target.closest('[data-cart-open]');

        if (openButton) {
            window.setTimeout(syncCartCursor, 50);
            window.setTimeout(syncCartCursor, 300);
        }

        const closeButton = event.target.closest('[data-cart-close]');

        if (closeButton) {
            window.setTimeout(syncCartCursor, 50);
            window.setTimeout(syncCartCursor, 500);
        }
    }, true);
})();

