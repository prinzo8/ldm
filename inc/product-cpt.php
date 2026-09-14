<?php
/**
 * Product post type bridge for the Lumière du Monde catalogue.
 *
 * @package LumiereDuMonde
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register the Lumière du Monde product post type.
 */
function ldm_register_product_post_type() {
	$labels = array(
		'name'               => __( 'Produits Lumière', 'lumiere-du-monde' ),
		'singular_name'      => __( 'Produit Lumière', 'lumiere-du-monde' ),
		'add_new'            => __( 'Ajouter', 'lumiere-du-monde' ),
		'add_new_item'       => __( 'Ajouter un produit', 'lumiere-du-monde' ),
		'edit_item'          => __( 'Modifier le produit', 'lumiere-du-monde' ),
		'new_item'           => __( 'Nouveau produit', 'lumiere-du-monde' ),
		'view_item'          => __( 'Voir le produit', 'lumiere-du-monde' ),
		'search_items'       => __( 'Rechercher des produits', 'lumiere-du-monde' ),
		'not_found'          => __( 'Aucun produit trouvé', 'lumiere-du-monde' ),
		'menu_name'          => __( 'Produits Lumière', 'lumiere-du-monde' ),
	);

	register_post_type(
		'ldm_product',
		array(
			'labels'             => $labels,
			'public'             => true,
			'show_in_rest'       => true,
			'has_archive'       => false,
			'rewrite'            => array( 'slug' => 'produits' ),
			'menu_icon'          => 'dashicons-admin-customizer',
			'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes' ),
			'show_in_menu'       => true,
			'show_in_nav_menus'  => false,
		)
	);

	register_post_meta(
		'ldm_product',
		'ldm_price',
		array(
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_post_meta(
		'ldm_product',
		'ldm_availability',
		array(
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_post_meta(
		'ldm_product',
		'ldm_category',
		array(
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_post_meta(
		'ldm_product',
		'ldm_whatsapp_url',
		array(
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'sanitize_callback' => 'esc_url_raw',
			'auth_callback'     => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);
}
add_action( 'init', 'ldm_register_product_post_type' );

/**
 * Add the product information metabox.
 */
function ldm_add_product_meta_box() {
	add_meta_box(
		'ldm_product_information',
		__( 'Informations du produit', 'lumiere-du-monde' ),
		'ldm_render_product_meta_box',
		'ldm_product',
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'ldm_add_product_meta_box' );

/**
 * Render the product information metabox.
 */
function ldm_render_product_meta_box( $post ) {
	wp_nonce_field( 'ldm_save_product_meta', 'ldm_product_meta_nonce' );

	$price        = get_post_meta( $post->ID, 'ldm_price', true );
	$availability = get_post_meta( $post->ID, 'ldm_availability', true );
	$category     = get_post_meta( $post->ID, 'ldm_category', true );
	$whatsapp     = get_post_meta( $post->ID, 'ldm_whatsapp_url', true );
	?>
	<div style="display:grid;gap:18px;max-width:760px;padding:6px 0 10px;">

		<div>
			<label for="ldm_price">
				<strong><?php esc_html_e( 'Prix', 'lumiere-du-monde' ); ?></strong>
			</label>
			<input
				type="text"
				id="ldm_price"
				name="ldm_price"
				value="<?php echo esc_attr( $price ); ?>"
				placeholder="Ex. 85 000 FCFA"
				style="width:100%;margin-top:6px;"
			>
			<p class="description">Exemple : 85 000 FCFA</p>
		</div>

		<div>
			<label for="ldm_category">
				<strong><?php esc_html_e( 'Collection', 'lumiere-du-monde' ); ?></strong>
			</label>
			<select
				id="ldm_category"
				name="ldm_category"
				style="width:100%;margin-top:6px;"
			>
				<option value="">Sélectionner une collection</option>
				<option value="luminaires" <?php selected( $category, 'luminaires' ); ?>>Luminaires</option>
			</select>
		</div>

		<div>
			<label for="ldm_availability">
				<strong><?php esc_html_e( 'Disponibilité', 'lumiere-du-monde' ); ?></strong>
			</label>
			<select
				id="ldm_availability"
				name="ldm_availability"
				style="width:100%;margin-top:6px;"
			>
				<option value="Disponible" <?php selected( $availability, 'Disponible' ); ?>>Disponible</option>
				<option value="Indisponible" <?php selected( $availability, 'Indisponible' ); ?>>Indisponible</option>
				<option value="Bientôt de retour" <?php selected( $availability, 'Bientôt de retour' ); ?>>Bientôt de retour</option>
			</select>
		</div>

		<div>
			<label for="ldm_whatsapp_url">
				<strong><?php esc_html_e( 'Lien WhatsApp personnalisé', 'lumiere-du-monde' ); ?></strong>
			</label>
			<input
				type="url"
				id="ldm_whatsapp_url"
				name="ldm_whatsapp_url"
				value="<?php echo esc_attr( $whatsapp ); ?>"
				placeholder="https://wa.me/..."
				style="width:100%;margin-top:6px;"
			>
			<p class="description">
				Laisse vide pour utiliser automatiquement le WhatsApp général de Lumière du Monde.
			</p>
		</div>

		<div style="padding:14px 16px;background:#f6f6f4;border-left:3px solid #111;">
			<strong>Image du produit</strong>
			<p style="margin:6px 0 0;">
				Utilise le bloc <strong>Image mise en avant</strong> dans la colonne de droite.
				Cette image sera automatiquement utilisée dans la collection.
			</p>
		</div>

	</div>
	<?php
}

/**
 * Save product metadata.
 */
function ldm_save_product_meta( $post_id ) {
	if (
		! isset( $_POST['ldm_product_meta_nonce'] ) ||
		! wp_verify_nonce(
			sanitize_text_field( wp_unslash( $_POST['ldm_product_meta_nonce'] ) ),
			'ldm_save_product_meta'
		)
	) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( 'ldm_product' !== get_post_type( $post_id ) ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$price        = isset( $_POST['ldm_price'] ) ? sanitize_text_field( wp_unslash( $_POST['ldm_price'] ) ) : '';
	$availability = isset( $_POST['ldm_availability'] ) ? sanitize_text_field( wp_unslash( $_POST['ldm_availability'] ) ) : '';
	$category     = isset( $_POST['ldm_category'] ) ? sanitize_text_field( wp_unslash( $_POST['ldm_category'] ) ) : '';
	$whatsapp     = isset( $_POST['ldm_whatsapp_url'] ) ? esc_url_raw( wp_unslash( $_POST['ldm_whatsapp_url'] ) ) : '';

	update_post_meta( $post_id, 'ldm_price', $price );
	update_post_meta( $post_id, 'ldm_availability', $availability );
	update_post_meta( $post_id, 'ldm_category', $category );
	update_post_meta( $post_id, 'ldm_whatsapp_url', $whatsapp );
}
add_action( 'save_post_ldm_product', 'ldm_save_product_meta' );
