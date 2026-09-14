<?php
/** @package LumiereDuMonde */
$luminaires = ldm_get_products( 'luminaires' );
$tableware  = ldm_get_products( 'tableware' );
?>
<section id="univers" class="universes" data-section="light">
	<div class="container universes__intro">
		<p class="eyebrow" data-reveal>01 — Deux mondes. Une même lumière.</p>
		<h2 data-split>Choisissez<br>votre <em>monde.</em></h2>
		<p class="universes__lead" data-reveal>Des objets qui réinventent l’espace et les gestes de la table. Entrez par la lumière, restez pour l’expérience.</p>
	</div>
	<div class="universe-split" data-universe-split>
		<a class="universe universe--light" href="#luminaires" data-cursor="Explore" data-transition-link>
			<?php
			$universe_luminaires_image = ldm_get_universe_custom_image( 'luminaires' );
			$universe_tableware_image  = ldm_get_universe_custom_image( 'tableware' );
			?>
			<img src="<?php echo esc_url( $universe_luminaires_image ? $universe_luminaires_image : ldm_get_product_image_url( $luminaires[1] ) ); ?>" alt="<?php echo esc_attr( $luminaires[1]['alt'] ); ?>" loading="lazy" decoding="async">
			<span class="universe__shade"></span><span class="universe__number">01</span>
			<span class="universe__label"><small>Univers</small><strong>Luminaires</strong><i class="universe__icon universe__icon--light" aria-hidden="true">
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path d="M9 18h6M10 21h4M8 14.5c-1.2-1-2-2.5-2-4.2A6 6 0 0 1 18 10.3c0 1.7-.8 3.2-2 4.2-.8.7-1 1.2-1 2.5H9c0-1.3-.2-1.8-1-2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
</i></span>
		</a>
		<a class="universe universe--table" href="#table" data-cursor="Explore" data-transition-link>
			<img src="<?php echo esc_url( $universe_tableware_image ? $universe_tableware_image : ldm_get_product_image_url( $tableware[5] ) ); ?>" alt="<?php echo esc_attr( $tableware[5]['alt'] ); ?>" loading="lazy" decoding="async">
			<span class="universe__shade"></span><span class="universe__number">02</span>
			<span class="universe__label"><small>Univers</small><strong>Art de la table</strong><i class="universe__icon universe__icon--table" aria-hidden="true">
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<circle cx="12" cy="12" r="7.5" stroke="currentColor" stroke-width="1.5"/>
		<path d="M8.5 9.5h7M9 12h6M9.5 14.5h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
	</svg>
</i></span>
		</a>
	</div>
	<p class="universes__hint"><span></span>Survolez un univers pour l’ouvrir</p>
</section>
