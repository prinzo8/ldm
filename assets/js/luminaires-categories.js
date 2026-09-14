(() => {
    "use strict";

    const categories = {
        "suspensions": {
            title: "Suspensions",
            intro: "Des silhouettes suspendues qui donnent du caractère à l’espace.",
            products: [
                ["Éclipse", 89500], ["Halo", 119000], ["Sphère", 74500],
                ["Nuage", 139000], ["Atelier", 98500], ["Horizon", 159000]
            ]
        },
        "lampes-a-poser": {
            title: "Lampes à poser",
            intro: "Des lumières d’appoint pensées pour créer une atmosphère.",
            products: [
                ["Alba", 59500], ["Noma", 72500], ["Oslo", 89000],
                ["Luna", 64500], ["Sienna", 109000], ["Céleste", 129500]
            ]
        },
        "lampadaires": {
            title: "Lampadaires",
            intro: "Des pièces verticales qui sculptent la lumière.",
            products: [
                ["Arc", 149000], ["Grand Angle", 189000], ["Verticale", 165000],
                ["Épure", 139500], ["Totem", 219000], ["Ligne", 175000]
            ]
        },
        "appliques": {
            title: "Appliques",
            intro: "Une lumière architecturale pour habiller les murs.",
            products: [
                ["Aura", 49500], ["Murale", 67500], ["Lueur", 58500],
                ["Cône", 79500], ["Halo Wall", 92500], ["Sillage", 115000]
            ]
        },
        "plafonniers": {
            title: "Plafonniers",
            intro: "Des volumes lumineux qui structurent le plafond.",
            products: [
                ["Nova", 109000], ["Orbite", 135000], ["Cascade", 179000],
                ["Disque", 89500], ["Calypso", 149500], ["Éclipse", 199000]
            ]
        },
        "lampes-de-chevet": {
            title: "Lampes de chevet",
            intro: "Une lumière douce pour accompagner les instants calmes.",
            products: [
                ["Douce Nuit", 42500], ["Veille", 53500], ["Alba Mini", 48500],
                ["Lune", 62500], ["Cocoon", 74500], ["Sérénité", 89500]
            ]
        }
    };

    let modal = null;


    // ============================================================
    // PANIER LDM — connexion au panier existant
    // ============================================================

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem("ldmCart") || "{}");
        } catch {
            return {};
        }
    }

    function saveCart(cart) {
        localStorage.setItem("ldmCart", JSON.stringify(cart));
        document.dispatchEvent(new CustomEvent("ldm:cart-updated"));
    }

    function addToExistingCart(product, quantity) {
        const cart = getCart();
        const id = product.id;

        cart[id] = Math.max(1, Number(cart[id] || 0) + quantity);

        saveCart(cart);

        // Enregistre les informations du produit pour le panier
        const meta = JSON.parse(
            localStorage.getItem("ldmCartMeta") || "{}"
        );

        meta[id] = {
            name: product.name || "Produit",
            number: product.number || id,
            image: product.image || ""
        };

        localStorage.setItem(
            "ldmCartMeta",
            JSON.stringify(meta)
        );

        // Synchronise immédiatement le panier existant
        document.dispatchEvent(new Event("storage"));
        document.dispatchEvent(new CustomEvent("ldm:cart-updated"));
    }

    function getProductId(category, index) {
        return "lum-" + category + "-" + String(index + 1).padStart(2, "0");
    }

    function formatPrice(price) {
        return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
    }

    function getThemeUrl() {
        const image = document.querySelector("#luminaires img");

        if (!image) return "";

        const match = image.src.match(/^(.*)\/assets\/images\//);

        return match ? match[1] : "";
    }


    function openProductDetail(category, index) {
        const data = categories[category];

        if (!data || !data.products[index]) return;

        const product = data.products[index];
        const id = getProductId(category, index);

        const existing = document.querySelector(".ldm-product-detail");
        if (existing) existing.remove();

        const themeUrl = getThemeUrl();
        const image = `${themeUrl}/assets/images/luminaires-products/${category}/${String(index + 1).padStart(2, "0")}.jpg`;

        const detail = document.createElement("div");
        detail.className = "ldm-product-detail";
        detail.innerHTML = `
            <div class="ldm-product-detail__backdrop"></div>

            <div class="ldm-product-detail__window">

                <button
                    type="button"
                    class="ldm-product-detail__close"
                    aria-label="Fermer"
                >×</button>

                <div class="ldm-product-detail__image">
                    <img src="${image}" alt="${product[0]}">
                </div>

                <div class="ldm-product-detail__content">
                    <p class="ldm-product-detail__category">${data.title}</p>

                    <h2>${product[0]}</h2>

                    <strong class="ldm-product-detail__price">
                        ${formatPrice(product[1])}
                    </strong>

                    <div class="ldm-product-detail__quantity">
                        <button type="button" data-detail-minus>−</button>
                        <span data-detail-quantity>1</span>
                        <button type="button" data-detail-plus>+</button>
                    </div>

                    <button
                        type="button"
                        class="ldm-product-detail__add"
                        data-detail-add
                    >
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(detail);

        // Popup secondaire toujours au-dessus du popup catégorie
        detail.style.setProperty("position", "fixed", "important");
        detail.style.setProperty("inset", "0", "important");
        detail.style.setProperty("z-index", "2147483000", "important");
        detail.style.setProperty("visibility", "visible", "important");
        detail.style.setProperty("opacity", "1", "important");
        detail.style.setProperty("pointer-events", "auto", "important");

        let quantity = 1;

        const quantityLabel = detail.querySelector("[data-detail-quantity]");

        detail.querySelector("[data-detail-minus]").addEventListener("click", () => {
            quantity = Math.max(1, quantity - 1);
            quantityLabel.textContent = quantity;
        });

        detail.querySelector("[data-detail-plus]").addEventListener("click", () => {
            quantity += 1;
            quantityLabel.textContent = quantity;
        });

        detail.querySelector("[data-detail-add]").addEventListener("click", () => {
            addToExistingCart({
                id,
                name: product[0],
                price: product[1],
                image: image
            }, quantity);

            // Notification de validation
            const notification = document.createElement("div");
            notification.className = "ldm-cart-success";
            notification.innerHTML = `
                <span class="ldm-cart-success__icon">✓</span>
                <span>Ajouté au panier</span>
            `;

            detail.appendChild(notification);

            notification.style.setProperty(
                "z-index",
                "2147483647",
                "important"
            );

            notification.style.setProperty(
                "position",
                "fixed",
                "important"
            );

            requestAnimationFrame(() => {
                notification.classList.add("is-visible");
            });

            setTimeout(() => {
                notification.classList.remove("is-visible");

                setTimeout(() => {
                    notification.remove();
                }, 250);
            }, 1500);
        });

        const close = () => detail.remove();

        detail.querySelector(".ldm-product-detail__close").addEventListener("click", close);
        detail.querySelector(".ldm-product-detail__backdrop").addEventListener("click", close);

        requestAnimationFrame(() => {
            detail.classList.add("is-open");
        });
    }

    function closeModal() {
        if (!modal) return;

        modal.classList.remove("is-open");

        setTimeout(() => {
            if (modal) {
                modal.remove();
                modal = null;
            }
        }, 450);

        document.documentElement.classList.remove("ldm-modal-open");
        document.body.classList.remove("ldm-modal-open");
    }

    function keepMainCursorAbovePopup() {
        const mainCursor = document.querySelector(
            '[data-cursor-root], .cursor, .custom-cursor'
        );

        if (!mainCursor) return;

        mainCursor.style.setProperty("z-index", "2147483647", "important");
        mainCursor.style.setProperty("pointer-events", "none", "important");
        mainCursor.style.setProperty("visibility", "visible", "important");
        mainCursor.style.setProperty("opacity", "1", "important");
    }

    function openModal(category) {
        const data = categories[category];

        if (!data) return;

        closeModal();

        modal = document.createElement("div");
        modal.className = "ldm-popup";
        modal.dataset.category = category;
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");

        // Curseur personnalisé du popup

        const themeUrl = getThemeUrl();

        modal.innerHTML = `
            <div class="ldm-popup__backdrop"></div>

            <div class="ldm-popup__window">

                <button
                    class="ldm-popup__close"
                    type="button"
                    aria-label="Fermer"
                >
                    <span></span>
                    <span></span>
                </button>

                <div class="ldm-popup__head">
                    <p class="ldm-popup__eyebrow">02 — Luminaires</p>

                    <h2>${data.title}</h2>

                    <p class="ldm-popup__intro">${data.intro}</p>
                </div>

                <div class="ldm-popup__grid">
                    ${data.products.map((product, index) => `
                        <article
                            class="ldm-popup-product"
                            data-product-id="${getProductId(category, index)}"
                            data-product-name="${product[0]}"
                            data-product-price="${product[1]}"
                        >
                            <button
                                type="button"
                                class="ldm-popup-product__open"
                                type="button"
                                data-product-detail
                                data-product-index="${index}"
                            >

                            <div class="ldm-popup-product__image">
                                <img
                                    src="${themeUrl}/assets/images/luminaires-products/${category}/${String(index + 1).padStart(2, "0")}.jpg"
                                    alt="${product[0]}"
                                    loading="lazy"
                                >

                                <span class="ldm-popup-product__number">
                                    ${String(index + 1).padStart(2, "0")}
                                </span>
                            </div>

                            <div class="ldm-popup-product__info">
                                <h3>${product[0]}</h3>
                                <strong class="ldm-popup-product__price">${formatPrice(product[1])}</strong>
                            </div>

                            </button>
                        </article>
                    `).join("")}
                </div>

            </div>
        `;

        document.body.appendChild(modal);

        // ----------------------------------------------------
        // Ouverture du popup secondaire pour chaque produit
        // ----------------------------------------------------

        const productButtons =
            modal.querySelectorAll("[data-product-detail]");

        productButtons.forEach((button) => {

            button.addEventListener("click", (event) => {

                event.preventDefault();
                event.stopImmediatePropagation();

                const index = parseInt(
                    button.getAttribute("data-product-index"),
                    10
                );

                if (
                    Number.isNaN(index) ||
                    index < 0 ||
                    index >= data.products.length
                ) {
                    console.warn(
                        "LDM : index produit invalide.",
                        index
                    );
                    return;
                }

                openProductDetail(category, index);
            });

        });

        document.documentElement.classList.add("ldm-modal-open");
        document.body.classList.add("ldm-modal-open");

        requestAnimationFrame(() => {
            modal.classList.add("is-open");
            keepMainCursorAbovePopup();
        });

        modal.querySelector(".ldm-popup__close")
            .addEventListener("click", closeModal);

        modal.querySelector(".ldm-popup__backdrop")
            .addEventListener("click", closeModal);

    }

    document.addEventListener("click", function(e) {

        const card = e.target.closest(
            "#luminaires [data-category]"
        );

        if (!card) return;

        e.preventDefault();
        e.stopPropagation();

        openModal(card.dataset.category);
    }, true);

    document.addEventListener("keydown", function(e) {

        if (e.key === "Escape" && modal) {
            closeModal();
        }

    });

    


})();


/* LDM_CURSOR_POPUP_FIX */
(function () {
    function refreshLdmCursor() {
        document.dispatchEvent(new Event('mousemove'));
    }

    document.addEventListener('DOMContentLoaded', function () {
        refreshLdmCursor();

        document.addEventListener('click', function () {
            requestAnimationFrame(refreshLdmCursor);
        });
    });

    const observer = new MutationObserver(function () {
        requestAnimationFrame(refreshLdmCursor);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
    });
})();


/* ============================================================
   LDM — CURSEUR GLOBAL DANS LE POPUP PRODUITS
   ============================================================ */
(function () {

    function wakeGlobalCursor() {
        const event = new MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: window.innerWidth / 2,
            clientY: window.innerHeight / 2
        });

        document.dispatchEvent(event);
        window.dispatchEvent(event);
    }

    function preparePopupCursor() {
        const modal = document.querySelector('.ldm-category-modal');

        if (!modal) return;

        modal.classList.add('cursor-enabled');

        modal.querySelectorAll(
            'button, a, img, [data-product], .ldm-category-modal__close'
        ).forEach(function (element) {
            element.style.cursor = 'none';
        });

        wakeGlobalCursor();
    }

    document.addEventListener('DOMContentLoaded', function () {
        preparePopupCursor();
    });

    const observer = new MutationObserver(function () {
        preparePopupCursor();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    document.addEventListener('click', function () {
        setTimeout(preparePopupCursor, 30);
    });

})();


/* ============================================================
   LDM — BRANCHEMENT DU CURSEUR PRINCIPAL AUX POPUPS
   ============================================================ */
(function () {

    function bindMainCursor() {
        const items = document.querySelectorAll(
            '.ldm-category-modal a, ' +
            '.ldm-category-modal button, ' +
            '.ldm-category-modal [data-cursor]'
        );

        items.forEach(function (item) {
            if (item.dataset.ldmCursorBound === '1') return;

            item.dataset.ldmCursorBound = '1';

            item.addEventListener('mouseenter', function () {
                document.body.classList.add('cursor-hover');
            });

            item.addEventListener('mouseleave', function () {
                document.body.classList.remove('cursor-hover');
            });
        });

        document.dispatchEvent(new MouseEvent('mousemove', {
            bubbles: true,
            clientX: window.innerWidth / 2,
            clientY: window.innerHeight / 2
        }));
    }

    document.addEventListener('DOMContentLoaded', bindMainCursor);

    new MutationObserver(function () {
        bindMainCursor();
    }).observe(document.body, {
        childList: true,
        subtree: true
    });

})();
