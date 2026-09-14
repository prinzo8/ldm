<?php
$args = wp_parse_args( $args, array( 'term' => '', 'id' => '', 'eyebrow' => '', 'title' => '', 'accent' => '', 'intro' => '' ) );
$query = new WP_Query( array( 'post_type' => 'produit', 'posts_per_page' => 6, 'tax_query' => array( array( 'taxonomy' => 'univers_produit', 'field' => 'slug', 'terms' => $args['term'] ) ) ) );
?>
<section class="product-section" id="<?php echo esc_attr( $args['id'] ); ?>"><div class="page-width"><div class="product-section__head"><div><div class="section-label section-label--inverse"><?php echo esc_html( $args['eyebrow'] ); ?></div><h2><?php echo esc_html( $args['title'] ); ?><br><em><?php echo esc_html( $args['accent'] ); ?></em></h2></div><div class="product-section__intro"><p><?php echo esc_html( $args['intro'] ); ?></p><button class="text-link" type="button" data-universe-target="<?php echo esc_attr( $args['term'] === 'luminaires' ? 'art-de-la-table' : 'luminaires' ); ?>"><?php echo esc_html( $args['term'] === 'luminaires' ? 'Voir l’art de la table' : 'Voir les luminaires' ); ?> <span>→</span></button></div></div><div class="product-grid">
<?php while ( $query->have_posts() ) : $query->the_post(); get_template_part( 'template-parts/product-card' ); endwhile; wp_reset_postdata(); ?>
</div></div></section>
