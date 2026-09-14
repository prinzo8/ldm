<?php
/** @package LumiereDuMonde */
$hero_product = ldm_get_products( 'luminaires' )[0];
$hero_image   = ldm_get_product_image_url( $hero_product );
?>
<section id="home" class="hero" data-hero data-section="dark">
	<div class="hero__image" data-hero-image style="background-image: url('<?php echo esc_url( $hero_image ); ?>');"></div>
	<div class="hero__veil"></div>
	<div class="hero__grain" aria-hidden="true"></div>
	<div class="hero__content container">
		<p class="eyebrow hero__eyebrow" data-reveal><span></span>Abidjan · Côte d’Ivoire</p>
		<h1 data-hero-title>Lumière<br><em>du Monde</em></h1>
		<div class="hero__bottom" data-reveal>
			<p>Illuminez vos espaces.<br>Sublimez vos moments.</p>
					<a class="button button--light magnetic exploration-cta" href="#univers" data-cursor="Explore" data-transition-link><span>Explorer les luminaires</span><svg class="icon icon--compass" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/></svg></a>
		</div>
	</div>
	<a href="#univers" class="scroll-prompt" aria-label="Explorer le site"><span>Scroll to explore</span><i></i></a>
	<div class="hero__index"><span>01</span><i></i><span>06</span></div>
</section>
