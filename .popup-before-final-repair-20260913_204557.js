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


/* LDM_PRODUCT_MODAL_CART_V2 */
(() => {
    const modal = document.querySelector('[data-product-modal]');
    if (!modal) return;

    const quantityEl = modal.querySelector('[data-modal-cart-quantity]');
    if (!quantityEl) return;

    const getCart = () => {
        try {
            return JSON.parse(localStorage.getItem('ldmCart') || '[]');
        } catch (error) {
            return [];
        }
    };

    const saveCart = (cart) => {
        localStorage.setItem('ldmCart', JSON.stringify(cart));

        window.dispatchEvent(
            new CustomEvent('ldm:cart-updated', {
                detail: cart
            })
        );
    };

    const getProductId = () => {
        return (
            modal.dataset.productId ||
            modal.querySelector('[data-modal-product-id]')?.value ||
            modal.querySelector('[data-modal-name]')?.dataset.productId ||
            ''
        );
    };

    const getProductName = () => {
        return modal.querySelector('[data-modal-name]')?.textContent.trim() || '';
    };

    const getQuantity = () => {
        const id = String(getProductId());
        if (!id) return 0;

        const item = getCart().find(
            entry => String(entry.id) === id
        );

        return item ? Number(item.quantity || 0) : 0;
    };

    const renderQuantity = () => {
        quantityEl.textContent = getQuantity();
    };

    const changeQuantity = (delta) => {
        const id = String(getProductId());

        if (!id) {
            console.warn('LDM panier : identifiant produit introuvable.');
            return;
        }

        const cart = getCart();

        const index = cart.findIndex(
            entry => String(entry.id) === id
        );

        const current =
            index >= 0
                ? Number(cart[index].quantity || 0)
                : 0;

        const next = Math.max(0, current + delta);

        if (next === 0) {
            if (index >= 0) {
                cart.splice(index, 1);
            }
        } else if (index >= 0) {
            cart[index].quantity = next;
        } else {
            cart.push({
                id: id,
                name: getProductName(),
                quantity: next
            });
        }

        saveCart(cart);
        renderQuantity();
    };

    modal.addEventListener('click', (event) => {

        const add = event.target.closest('[data-modal-cart-add]');

        if (add) {
            event.preventDefault();
            changeQuantity(1);
            return;
        }

        const minus = event.target.closest('[data-modal-cart-minus]');

        if (minus) {
            event.preventDefault();
            changeQuantity(-1);
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target.closest('[data-open-product]')) {
            window.setTimeout(renderQuantity, 100);
        }
    });

    const observer = new MutationObserver(() => {
        if (modal.classList.contains('is-open')) {
            renderQuantity();
        }
    });

    observer.observe(modal, {
        attributes: true,
        attributeFilter: ['class']
    });

    renderQuantity();
})();
