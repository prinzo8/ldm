<?php
/**
 * Front page template.
 *
 * @package LumiereDuMonde
 */
get_header();
get_template_part( 'template-parts/preloader' );
?>
<main id="content" class="site-main">
	<?php
	get_template_part( 'template-parts/hero' );
	get_template_part( 'template-parts/universe-selector' );
	get_template_part( 'template-parts/luminaires' );
	get_template_part( 'template-parts/tableware' );
	get_template_part( 'template-parts/maison' );
	get_template_part( 'template-parts/abidjan' );
	get_template_part( 'template-parts/contact' );
	?>
</main>
<?php get_footer();
