<?php
/**
 * Archive template.
 *
 * @package LumiereDuMonde
 */
get_header();
?>
<main id="content" class="site-main simple-page">
	<section class="simple-page__hero">
		<p class="eyebrow">Lumière du Monde</p>
		<h1><?php the_archive_title(); ?></h1>
	</section>
	<section class="simple-page__content">
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			<article <?php post_class( 'simple-page__article' ); ?>>
				<p class="eyebrow"><?php echo esc_html( get_the_date() ); ?></p>
				<h2><a href="<?php echo esc_url( get_permalink() ); ?>"><?php echo esc_html( get_the_title() ); ?></a></h2>
				<?php the_excerpt(); ?>
			</article>
		<?php endwhile; else : ?>
			<p><?php esc_html_e( 'Aucun contenu pour le moment.', 'lumiere-du-monde' ); ?></p>
		<?php endif; ?>
	</section>
</main>
<?php get_footer();
