<?php
/**
 * 404 template.
 *
 * @package LumiereDuMonde
 */
get_header();
?>
<main id="content" class="site-main simple-page">
	<section class="simple-page__hero">
		<p class="eyebrow">Lumière du Monde</p>
		<h1><?php esc_html_e( 'Cette page reste à trouver.', 'lumiere-du-monde' ); ?></h1>
		<p><?php esc_html_e( 'Revenez à l’accueil pour poursuivre la visite de la maison.', 'lumiere-du-monde' ); ?></p>
		<a class="button button--dark magnetic" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Revenir à l’accueil', 'lumiere-du-monde' ); ?></a>
	</section>
</main>
<?php get_footer();
