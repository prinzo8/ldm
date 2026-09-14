<?php
/** @package LumiereDuMonde */
$all_products = ldm_get_products();
?>
	<section id="maison" class="ldm-maison-white maison" data-section="light" data-parallax-section>
	<div class="ldm-maison-white maison__opening container"><p class="ldm-maison-white eyebrow" data-reveal>05 — La maison</p><h2 data-split>Un intérieur n’est jamais<br>seulement un <em>intérieur.</em></h2></div>
		<div class="ldm-maison-white maison__editorial">
			<?php
			$maison_image_first  = ldm_get_maison_image( 'first' );
			$maison_image_second = ldm_get_maison_image( 'second' );
			?>
			<figure class="ldm-maison-white maison__figure maison__figure--first"><img src="<?php echo esc_url( $maison_image_first ? $maison_image_first : ldm_get_product_image_url( $all_products[5] ) ); ?>" alt="Lumière du Monde — La maison" loading="lazy" decoding="async"><figcaption>La lumière raconte l’heure, la matière, la présence.</figcaption></figure>
			
			
			
		</div>
</section>
