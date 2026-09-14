<?php $available = '1' === get_post_meta( get_the_ID(), '_ldm_available', true ); ?>
<article class="product-card" data-product-card data-product-id="<?php echo esc_attr( get_the_ID() ); ?>" data-product-image="<?php echo esc_attr( get_the_post_thumbnail_url( get_the_ID(), 'large' ) ); ?>" data-product-alt="<?php echo esc_attr( get_the_title() ); ?>" data-product-name="<?php echo esc_attr( get_the_title() ); ?>" data-product-number="<?php echo esc_attr( get_post_meta( get_the_ID(), '_ldm_product_number', true ) ); ?>" data-product-category="<?php $terms = get_the_terms( get_the_ID(), 'univers_produit' ); echo $terms && ! is_wp_error( $terms ) ? esc_attr( $terms[0]->name ) : 'Collection'; ?>" data-product-description="<?php echo esc_attr( get_the_excerpt() ); ?>" data-product-price="<?php echo esc_attr( ldm_product_price() ); ?>" data-product-availability="<?php echo $available ? 'Disponible' : 'Indisponible'; ?>">
    <a class="product-card__image" href="#" data-open-product>
        <?php if ( has_post_thumbnail() ) { the_post_thumbnail( 'large', array( 'loading' => 'lazy' ) ); } ?>
        <span class="availability <?php echo $available ? 'availability--available' : 'availability--unavailable'; ?>"><span></span><?php echo $available ? 'Disponible' : 'Indisponible'; ?></span>
    </a>
    <div class="product-card__body"><div class="product-card__topline"><span><?php $terms = get_the_terms( get_the_ID(), 'univers_produit' ); echo $terms && ! is_wp_error( $terms ) ? esc_html( $terms[0]->name ) : 'Collection'; ?></span></div><h3><?php the_title(); ?></h3><p><?php echo esc_html( get_the_excerpt() ); ?></p><div class="product-card__footer"><strong><?php echo esc_html( ldm_product_price() ); ?></strong><?php if ( $available ) : ?>
<div class="product-cart-control" data-cart-product>
    <button
        type="button"
        class="product-cart-control__button"
        data-cart-minus
        aria-label="Retirer un exemplaire"
    >−</button>

    <span
        class="product-cart-control__quantity"
        data-cart-quantity
        aria-live="polite"
    >0</span>

    <button
        type="button"
        class="product-cart-control__button"
        data-cart-add
        aria-label="Ajouter au panier"
    >+</button>
</div>
</div>
<?php else : ?><span class="sold-out">Bientôt de retour</span><?php endif; ?></div></div>
</article>
