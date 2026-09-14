<?php
/** @package LumiereDuMonde */
$contact = ldm_contact_details();
?>
<section id="abidjan" class="abidjan" data-section="dark">
	<div class="abidjan__glow" aria-hidden="true"></div>
	<div class="abidjan__inner container">
		<div class="abidjan__title">
			<p class="eyebrow">06 — Abidjan</p>
			<h2>La maison<br>vous <em>attend.</em></h2>
			<p>Lumière du Monde est un showroom imaginé pour être découvert lentement, par la matière, par la lumière et par la conversation.</p>
		</div>

		<div class="abidjan__details">

			<div>
				<span>Adresse</span>
				<p><?php echo nl2br( esc_html( $contact['address'] ) ); ?></p>
			</div>

			<div>
				<span>Horaires</span>
				<p><?php echo esc_html( $contact['hours'] ); ?></p>
			</div>

			<div>
				<span>Contact</span>
				<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', $contact['phone'] ) ); ?>">
					<?php echo esc_html( $contact['phone'] ); ?>
				</a>
				<a href="mailto:<?php echo esc_attr( $contact['email'] ); ?>">
					<?php echo esc_html( $contact['email'] ); ?>
				</a>
			</div>

			<a
				class="button button--light magnetic map-cta"
				href="<?php echo esc_url( $contact['maps'] ); ?>"
				target="_blank"
				rel="noopener"
				data-cursor="Maps"
			>
				<svg class="icon icon--pin" aria-hidden="true" viewBox="0 0 24 24">
					<path d="M12 22s7-6.2 7-12A7 7 0 1 0 5 10c0 5.8 7 12 7 12Z"/>
					<circle cx="12" cy="10" r="2.2"/>
				</svg>
				<span>Ouvrir dans Google Maps</span>
			</a>

		</div>
	</div>

	<div class="abidjan__map">

		<iframe
			title="Carte du showroom Lumière du Monde"
			loading="lazy"
			src="https://www.google.com/maps?q=5.4047459,-3.9588834&output=embed"
			style="border:0;"
			allowfullscreen=""
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>



		<span class="abidjan__map-mask">
			<?php echo nl2br( esc_html( $contact['address'] ) ); ?>
		</span>

	</div>
</section>
