<?php get_header(); ?>
<main id="content" class="site-main simple-page">
	<?php while ( have_posts() ) : the_post(); ?>
	<article <?php post_class(); ?>><header class="simple-page__hero"><p class="eyebrow"><?php echo esc_html( get_the_date() ); ?></p><h1><?php the_title(); ?></h1></header><?php if ( has_post_thumbnail() ) : ?><div class="simple-page__media"><?php the_post_thumbnail( 'ldm-wide' ); ?></div><?php endif; ?><div class="simple-page__content entry-content"><?php the_content(); ?></div></article>
	<?php endwhile; ?>
</main>
<?php get_footer();
