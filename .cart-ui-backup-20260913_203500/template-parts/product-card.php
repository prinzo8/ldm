<?php $available = '1' === get_post_meta( get_the_ID(), '_ldm_available', true ); ?>
<article class="product-card">
    <a class="product-card__image" href="<?php the_permalink(); ?>">
        <?php if ( has_post_thumbnail() ) { the_post_thumbnail( 'large', array( 'loading' => 'lazy' ) ); } ?>
        <span class="availability <?php echo $available ? 'availability--available' : 'availability--unavailable'; ?>"><span></span><?php echo $available ? 'Disponible' : 'Indisponible'; ?></span>
    </a>
    <div class="product-card__body"><div class="product-card__topline"><span><?php $terms = get_the_terms( get_the_ID(), 'univers_produit' ); echo $terms && ! is_wp_error( $terms ) ? esc_html( $terms[0]->name ) : 'Collection'; ?></span></div><h3><?php the_title(); ?></h3><p><?php echo esc_html( get_the_excerpt() ); ?></p><div class="product-card__footer"><strong><?php echo esc_html( ldm_product_price() ); ?></strong><?php if ( $available ) : ?><a class="whatsapp-link" href="<?php echo esc_url( ldm_whatsapp_url() ); ?>" target="_blank" rel="noreferrer">Réserver</a><?php else : ?><span class="sold-out">Bientôt de retour</span><?php endif; ?></div></div>
</article>
