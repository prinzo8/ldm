<?php
$args = wp_parse_args( $args, array( 'slug' => 'luminaires', 'number' => '01', 'title' => '', 'subtitle' => '' ) );
$term = get_term_by( 'slug', $args['slug'], 'univers_produit' );
$image = $term ? get_term_meta( $term->term_id, '_ldm_cover_image', true ) : '';
?>
<section class="universe-card" id="univers-<?php echo esc_attr( $args['slug'] ); ?>">
    <?php if ( $image ) : ?><img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $args['title'] ); ?>"><?php endif; ?>
    <span class="universe-card__overlay"></span><div class="universe-card__content"><span class="universe-card__number"><?php echo esc_html( $args['number'] ); ?> / Univers</span><h2><?php echo esc_html( $args['title'] ); ?></h2><p><?php echo esc_html( $args['subtitle'] ); ?></p><a class="universe-card__cta" href="#<?php echo esc_attr( $args['slug'] ); ?>">Entrer dans l’univers →</a></div>
</section>
