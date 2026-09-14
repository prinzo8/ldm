<?php
/** @package LumiereDuMonde */
$contact = ldm_contact_details();
?>
	<footer class="site-footer" id="contact" data-section="green">
	
			<a class="button button--light magnetic whatsapp-cta" data-cursor="WhatsApp" href="<?php echo esc_url( ldm_whatsapp_url() ); ?>" target="_blank" rel="noopener"><?php echo ldm_whatsapp_icon(); ?> <span>Parler à la maison</span></a>
	</div>
	<div class="footer-grid">
		<div><p class="footer-label">Abidjan</p><p><?php echo esc_html( $contact['city'] ); ?><br><?php echo esc_html( $contact['hours'] ); ?></p></div>
		<div><p class="footer-label">Contact</p><a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', $contact['phone'] ) ); ?>"><?php echo esc_html( $contact['phone'] ); ?></a><a href="mailto:<?php echo esc_attr( $contact['email'] ); ?>"><?php echo esc_html( $contact['email'] ); ?></a></div>
			<div><p class="footer-label">Navigation</p><a href="#luminaires">Luminaires</a><a href="#maison">La maison</a><a href="#abidjan">Nous trouver</a></div>
			<div><p class="footer-label">Suivre</p><p class="footer-social-note"><svg class="icon icon--facebook" aria-hidden="true" viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-3.3 0-5 1.7-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.7.3-1 1-1Z"/></svg><span>Facebook — lien officiel à venir</span></p></div>
	</div>
	<div class="footer-legal">
    <button class="footer-legal__link magnetic" type="button" data-legal-modal="mentions">Mentions légales</button>
    <button class="footer-legal__link magnetic" type="button" data-legal-modal="privacy">Politique de confidentialité</button>
</div>
	<div class="footer-bottom"><span>© <?php echo esc_html( date_i18n( 'Y' ) ); ?> Lumière du Monde</span><span>Abidjan · Côte d’Ivoire</span><span>Conçu avec intention</span></div>

<button
    class="ldm-cart-toggle"
    type="button"
    aria-label="Ouvrir le panier"
    aria-controls="ldm-cart"
    aria-expanded="false"
    data-cursor="Panier"
>
    <span>Panier</span>
    <b class="ldm-cart-count">0</b>
</button>

<aside
    class="ldm-cart"
    id="ldm-cart"
    aria-hidden="true"
>
    <div class="ldm-cart__backdrop" data-cart-close></div>

    <div class="ldm-cart__panel">
        <header class="ldm-cart__header">
            <div>
                <span class="section-label">Votre sélection</span>
                <h2>Panier</h2>
            </div>

            <button
                type="button"
                class="ldm-cart__close"
                aria-label="Fermer le panier"
                data-cart-close
            >×</button>
        </header>

        <div class="ldm-cart__items"></div>

        <div class="ldm-cart__empty">
            Votre panier est encore vide.
        </div>

        <footer class="ldm-cart__footer">
            <div class="ldm-cart__total">
                <span>Total</span>
                <strong class="ldm-cart-total">0 FCFA</strong>
            </div>

            <button
                type="button"
                class="ldm-cart__checkout"
                data-cart-checkout
                disabled
            >
                Continuer la commande <span>→</span>
            </button>
        </footer>
    </div>
</aside>


<div class="ldm-checkout" id="ldm-checkout" aria-hidden="true">
    <div class="ldm-checkout__backdrop" data-checkout-close></div>

    <div class="ldm-checkout__panel">
        <header class="ldm-checkout__header">
            <div>
                <span class="section-label">Dernière étape</span>
                <h2>Votre commande</h2>
            </div>

            <button type="button" class="ldm-checkout__close" data-checkout-close aria-label="Fermer">×</button>
        </header>

        <div class="ldm-checkout__content">
            <div class="ldm-checkout__summary">
                <span class="section-label">Sélection</span>
                <div class="ldm-checkout__summary-items"></div>
                <strong class="ldm-checkout__summary-total">0 FCFA</strong>
            </div>

            <form class="ldm-checkout__form">
                <label>
                    Nom complet
                    <input type="text" name="name" required autocomplete="name">
                </label>

                <label>
                    Téléphone
                    <input type="tel" name="phone" required autocomplete="tel">
                </label>

                <label>
                    Email
                    <input type="email" name="email" autocomplete="email">
                </label>

                <label>
                    Adresse / lieu de livraison
                    <textarea name="address" rows="3" required></textarea>
                </label>

                <button type="submit" class="ldm-checkout__submit">
                    Confirmer la commande <span>→</span>
                </button>

                <p class="ldm-checkout__message" aria-live="polite"></p>
            </form>
        </div>
    </div>
</div>

</footer>

<div class="legal-modal" data-legal-modal-root aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
    <div class="legal-modal__backdrop" data-close-legal-modal></div>

    <div class="legal-modal__sheet" role="document">
        <button
            class="legal-modal__close"
            type="button"
            data-close-legal-modal
            aria-label="Fermer"
        >×</button>

        <div class="legal-modal__header">
            <p class="eyebrow" data-legal-eyebrow>Informations</p>
            <h2 id="legal-modal-title" data-legal-title>Mentions légales</h2>
            <div class="legal-modal__line"></div>
        </div>

        <div class="legal-modal__body">

            <section data-legal-content="mentions">
                <div class="legal-block">
                    <span class="legal-block__number">01</span>
                    <div>
                        <h3>Éditeur du site</h3>
                        <p>
                            <strong>Lumière du Monde</strong><br>
                            Abidjan, Côte d’Ivoire<br>
                            Luminaires, architecture intérieure et décoration.
                        </p>
                    </div>
                </div>

                <div class="legal-block">
                    <span class="legal-block__number">02</span>
                    <div>
                        <h3>Objet du site</h3>
                        <p>
                            Ce site présente l’univers, les produits et les services de
                            Lumière du Monde. Les demandes d’informations, de disponibilité
                            et de réservation peuvent être effectuées directement auprès
                            de la maison, notamment via WhatsApp.
                        </p>
                    </div>
                </div>

                <div class="legal-block">
                    <span class="legal-block__number">03</span>
                    <div>
                        <h3>Informations produits</h3>
                        <p>
                            Les photographies, descriptions, prix et disponibilités présentés
                            sur le site sont susceptibles d’évoluer. Une confirmation directe
                            auprès de Lumière du Monde permet de vérifier les informations
                            relatives à un produit avant toute commande ou réservation.
                        </p>
                    </div>
                </div>

                <div class="legal-block">
                    <span class="legal-block__number">04</span>
                    <div>
                        <h3>Conception digitale</h3>
                        <p>
                            Site conçu et développé par <strong>Prince Ocho</strong>.
                        </p>
                    </div>
                </div>
            </section>

            <section data-legal-content="privacy" hidden>
                <div class="legal-block">
                    <span class="legal-block__number">01</span>
                    <div>
                        <h3>Données transmises</h3>
                        <p>
                            Lorsque vous contactez Lumière du Monde par téléphone,
                            e-mail ou WhatsApp, certaines informations que vous choisissez
                            de transmettre peuvent être utilisées afin de répondre à votre
                            demande.
                        </p>
                    </div>
                </div>

                <div class="legal-block">
                    <span class="legal-block__number">02</span>
                    <div>
                        <h3>Utilisation</h3>
                        <p>
                            Les informations communiquées sont utilisées uniquement dans
                            le cadre des échanges avec Lumière du Monde, notamment pour
                            répondre à une question, vérifier une disponibilité ou traiter
                            une demande liée aux produits et services présentés.
                        </p>
                    </div>
                </div>

                <div class="legal-block">
                    <span class="legal-block__number">03</span>
                    <div>
                        <h3>Confidentialité</h3>
                        <p>
                            Les données personnelles communiquées dans le cadre d'un échange
                            ne sont pas destinées à être vendues ou cédées à des tiers à des
                            fins commerciales.
                        </p>
                    </div>
                </div>

                <div class="legal-block">
                    <span class="legal-block__number">04</span>
                    <div>
                        <h3>Cookies et fonctionnement</h3>
                        <p>
                            Le site peut utiliser des cookies ou des mécanismes techniques
                            nécessaires à son fonctionnement, à son affichage et à la
                            fourniture de certaines fonctionnalités.
                        </p>
                    </div>
                </div>

                <div class="legal-block">
                    <span class="legal-block__number">05</span>
                    <div>
                        <h3>Demande d'information</h3>
                        <p>
                            Pour toute question concernant les informations que vous avez
                            transmises à Lumière du Monde, vous pouvez contacter directement
                            la maison par les moyens indiqués sur ce site.
                        </p>
                    </div>
                </div>

                <div class="legal-block">
                    <span class="legal-block__number">06</span>
                    <div>
                        <h3>Conception digitale</h3>
                        <p>
                            Site conçu et développé par <strong>Prince Ocho</strong>.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    </div>
</div>

<div class="product-modal" data-product-modal aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
	<div class="product-modal__backdrop" data-close-modal></div>
	<div class="product-modal__sheet" role="document">
		<button class="product-modal__close" type="button" data-close-modal aria-label="<?php esc_attr_e( 'Fermer la fiche produit', 'lumiere-du-monde' ); ?>">×</button>
		<div class="product-modal__image-wrap"><img src="" alt="" data-modal-image></div>
			<div class="product-modal__content"><p class="eyebrow" data-modal-category></p><p class="product-number" data-modal-number></p><h2 id="product-modal-title" data-modal-name></h2><p class="product-modal__description" data-modal-description></p><dl><div><dt>Prix</dt><dd data-modal-price></dd></div><div><dt>Disponibilité</dt><dd data-modal-availability></dd></div></dl><a class="button button--dark magnetic whatsapp-cta" data-modal-whatsapp href="#" target="_blank" rel="noopener"><?php echo ldm_whatsapp_icon(); ?> <span>Demander ce produit</span></a></div>
	</div>
</div>
	<div class="light-transition" data-light-transition aria-hidden="true">
		<div class="ldm-bulb ldm-bulb--transition" data-transition-bulb aria-hidden="true">
			<svg viewBox="0 0 120 160" role="presentation">
				<defs>
					<radialGradient id="bulb-glow-transition" cx="50%" cy="42%" r="50%">
						<stop offset="0%" stop-color="#eaff41" stop-opacity=".58"/>
						<stop offset="55%" stop-color="#eaff41" stop-opacity=".14"/>
						<stop offset="100%" stop-color="#eaff41" stop-opacity="0"/>
					</radialGradient>
				</defs>

				<ellipse class="ldm-bulb__halo" cx="60" cy="66" rx="57" ry="60" fill="url(#bulb-glow-transition)"/>

				<path class="ldm-bulb__glass"
					d="M60 13
					C36 13 19 30 19 54
					C19 72 28 83 39 94
					C45 100 47 108 47 116
					H73
					C73 108 75 100 81 94
					C92 83 101 72 101 54
					C101 30 84 13 60 13Z"/>

				<path class="ldm-bulb__filament"
					d="M49 61
					C51 53 55 49 60 49
					C65 49 69 53 71 61
					L67 74
					M53 74
					L67 74"/>

				<path class="ldm-bulb__base"
					d="M47 116H73
					M48 121H72
					M50 126H70
					M53 131H67"/>
			</svg>
		</div>

		<p>Lumière du Monde</p>
		<span><i></i></span>
		<b data-transition-progress>00%</b>
	</div>
	<a class="whatsapp-float magnetic" data-cursor="WhatsApp" href="<?php echo esc_url( ldm_whatsapp_url() ); ?>" target="_blank" rel="noopener" aria-label="Parler à Lumière du Monde sur WhatsApp"><?php echo ldm_whatsapp_icon(); ?><span>Parler à Lumière du Monde</span></a>
<?php wp_footer(); ?>
</body>
</html>
