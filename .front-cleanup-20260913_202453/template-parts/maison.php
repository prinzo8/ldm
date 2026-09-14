<?php
/** @package LumiereDuMonde */
$all_products = ldm_get_products();
?>
	<section id="maison" class="maison" data-section="light" data-parallax-section>
	<div class="maison__opening container"><p class="eyebrow" data-reveal>05 — La maison</p><h2 data-split>Un intérieur n’est jamais<br>seulement un <em>intérieur.</em></h2></div>
		<div class="maison__editorial">
			<?php
			$maison_image_first  = ldm_get_maison_image( 'first' );
			$maison_image_second = ldm_get_maison_image( 'second' );
			?>
			<figure class="maison__figure maison__figure--first"><img src="<?php echo esc_url( $maison_image_first ? $maison_image_first : ldm_get_product_image_url( $all_products[5] ) ); ?>" alt="Lumière du Monde — La maison" loading="lazy" decoding="async"><figcaption>La lumière raconte l’heure, la matière, la présence.</figcaption></figure>
			<div class="maison__manifesto"><p class="maison__manifesto-lead">Chez Lumière du Monde, les objets ne remplissent pas une pièce. Ils lui donnent une intention.</p><p class="maison__manifesto-support">Nous sélectionnons des pièces pour leur qualité, leurs finitions et leur capacité à traverser le temps. Une sélection de nos marchandises est importée d’Allemagne, avec une attention particulière portée aux standards de fabrication.</p><span>Abidjan<br>Maison contemporaine</span></div>
			<figure class="maison__figure maison__figure--second"><img src="<?php echo esc_url( $maison_image_second ? $maison_image_second : ldm_get_product_image_url( $all_products[11] ) ); ?>" alt="Lumière du Monde — La maison" loading="lazy" decoding="async"></figure>
			
		</div>
		<div class="maison__cards container" data-maison-cards>
			<article class="maison-card maison-card--quality"><span class="maison-card__index">01</span><h3>Qualité sélectionnée</h3><p>Chaque pièce est choisie pour sa qualité, ses finitions et sa capacité à traverser le temps.</p></article>
			<article class="maison-card maison-card--germany"><span class="maison-card__index">02</span><span class="maison-card__origin">Sélection européenne</span><h3>Importé d’Allemagne</h3><p>Une sélection de nos marchandises est importée d’Allemagne, avec une attention particulière portée à la qualité et aux standards de fabrication.</p></article>
			<article class="maison-card maison-card--detail"><span class="maison-card__index">03</span><h3>L’art du détail</h3><p>Une lumière, une matière, une forme : chaque détail participe à créer une atmosphère.</p></article>
			<article class="maison-card maison-card--universes"><span class="maison-card__index">04</span><h3>La lumière comme signature</h3><p>Chaque luminaire est pensé pour donner du caractère aux espaces et créer une atmosphère qui vous ressemble.</p></article>
			<article class="maison-card maison-card--manifesto"><span class="maison-card__index">05</span><h3>Moins, mais mieux choisi.</h3><p>Nous privilégions des pièces choisies pour leur qualité, leur esthétique et leur capacité à trouver naturellement leur place dans un intérieur.</p></article>
			<article class="maison-card maison-card--installation"><span class="maison-card__index">06</span><h3>Installation &amp; savoir-faire</h3><p>Notre propre électricien assure le montage et l’installation de nos luminaires, pour vous garantir une mise en place soignée, sécurisée et conforme aux exigences techniques.</p></article>
		</div>
</section>
