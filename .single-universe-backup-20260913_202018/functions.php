<?php
/**
 * Lumière du Monde theme functions.
 *
 * @package LumiereDuMonde
 */

defined( 'ABSPATH' ) || exit;

define( 'LDM_VERSION', '4.0.0' );
define( 'LDM_DIR', get_template_directory() );
define( 'LDM_URI', get_template_directory_uri() );

require_once LDM_DIR . '/inc/products.php';
require_once LDM_DIR . '/inc/product-cpt.php';

function ldm_setup() {
	load_theme_textdomain( 'lumiere-du-monde', LDM_DIR . '/languages' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo', array( 'height' => 120, 'width' => 320, 'flex-height' => true, 'flex-width' => true ) );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_image_size( 'ldm-portrait', 900, 1125, true );
	add_image_size( 'ldm-wide', 1920, 1080, true );
	register_nav_menus( array( 'primary' => __( 'Navigation principale', 'lumiere-du-monde' ) ) );
}
add_action( 'after_setup_theme', 'ldm_setup' );

function ldm_enqueue_assets() {
	wp_enqueue_style( 'ldm-fonts', 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap', array(), null );
	wp_enqueue_style( 'ldm-theme', get_stylesheet_uri(), array(), LDM_VERSION );
	wp_enqueue_style( 'ldm-main', LDM_URI . '/assets/css/main.css', array( 'ldm-theme' ), LDM_VERSION );
	wp_enqueue_script( 'ldm-main', LDM_URI . '/assets/js/main.js', array(), LDM_VERSION, array( 'strategy' => 'defer', 'in_footer' => true ) );
	wp_localize_script( 'ldm-main', 'ldmTheme', array( 'whatsappUrl' => ldm_whatsapp_url(), 'reducedMotion' => false ) );
}
add_action( 'wp_enqueue_scripts', 'ldm_enqueue_assets' );

function ldm_nav_fallback() {
	echo '<ul class="nav-list">';
	$items = array(
		'#home'       => __( 'Accueil', 'lumiere-du-monde' ),
		'#luminaires' => __( 'Luminaires', 'lumiere-du-monde' ),
		'#maison'     => __( 'La maison', 'lumiere-du-monde' ),
		'#abidjan'    => __( 'Nous trouver', 'lumiere-du-monde' ),
		'#contact'    => __( 'Contact', 'lumiere-du-monde' ),
	);
	foreach ( $items as $url => $label ) {
		printf( '<li><a href="%1$s">%2$s</a></li>', esc_url( $url ), esc_html( $label ) );
	}
	echo '</ul>';
}

function ldm_contact_details() {

	$hours = ldm_get_hours();

	$open_days = array();

	foreach ( $hours as $day => $data ) {

		if ( ! empty( $data['closed'] ) ) {
			continue;
		}

		if ( empty( $data['open'] ) || empty( $data['close'] ) ) {
			continue;
		}

		$open_days[] = array(
			'day'   => $day,
			'open'  => $data['open'],
			'close' => $data['close'],
		);
	}

	$hours_label = '';

	if ( ! empty( $open_days ) ) {

		$first = $open_days[0];
		$last  = end( $open_days );

		$day_labels = array(
			'lundi'    => 'Lun',
			'mardi'    => 'Mar',
			'mercredi' => 'Mer',
			'jeudi'    => 'Jeu',
			'vendredi' => 'Ven',
			'samedi'   => 'Sam',
			'dimanche' => 'Dim',
		);

		$first_day = $day_labels[ $first['day'] ] ?? '';
		$last_day  = $day_labels[ $last['day'] ] ?? '';

		$hours_label = $first_day;

		if ( $first['day'] !== $last['day'] ) {
			$hours_label .= '–' . $last_day;
		}

		$hours_label .= ' · ' . $first['open'] . '–' . $first['close'];
		
	}

	return array(
		'city'     => 'Abidjan · Côte d’Ivoire',
		'address'  => ldm_get_address(),
		'phone'    => ldm_get_phone(),
		'email'    => ldm_get_email(),
		'hours'    => $hours_label,
		'whatsapp' => ldm_get_whatsapp(),
		'maps'     => ldm_get_google_maps(),
	);
}

function ldm_whatsapp_url( $message = '' ) {
	$contact = ldm_contact_details();
	$message = $message ? $message : __( 'Bonjour Lumière du Monde, je souhaite en savoir plus sur vos pièces.', 'lumiere-du-monde' );
	return 'https://wa.me/' . rawurlencode( $contact['whatsapp'] ) . '?text=' . rawurlencode( $message );
}

function ldm_whatsapp_icon() {
	return '<svg class="icon icon--whatsapp" aria-hidden="true" viewBox="0 0 24 24"><path d="M20.5 3.5A11.7 11.7 0 0 0 12.1 0C5.6 0 .4 5.2.4 11.7c0 2.1.6 4.2 1.7 6L.3 24l6.5-1.7a11.7 11.7 0 0 0 5.3 1.3h.1c6.4 0 11.7-5.2 11.7-11.7 0-3.1-1.2-6.1-3.4-8.4Zm-8.4 18.1h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 7 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.8-9.8 9.8Zm5.4-7.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2.9 2.5.8 3 .7.7-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.2-.2-.4-.3-.7-.5Z"/></svg>';
}

require_once get_template_directory() . '/inc/theme-settings.php';


/* ============================================================
   WORDPRESS PRODUCT CATALOG
   ============================================================ */

function ldm_get_wordpress_products( $category ) {
	$query = new WP_Query(
		array(
			'post_type'      => 'ldm_product',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => 'menu_order title',
			'order'          => 'ASC',
			'meta_query'     => array(
				array(
					'key'     => 'ldm_category',
					'value'   => $category,
					'compare' => '=',
				),
			),
		)
	);

	$products = array();

	if ( $query->have_posts() ) {
		$number = 1;

		while ( $query->have_posts() ) {
			$query->the_post();

			$id           = get_the_ID();
			$title        = get_the_title();
			$description  = get_the_content();
			$excerpt      = get_the_excerpt();
			$price        = get_post_meta( $id, 'ldm_price', true );
			$availability = get_post_meta( $id, 'ldm_availability', true );
			$whatsapp     = get_post_meta( $id, 'ldm_whatsapp_url', true );
			$image        = get_the_post_thumbnail_url( $id, 'large' );
			$image_alt    = get_post_meta( get_post_thumbnail_id( $id ), '_wp_attachment_image_alt', true );

			$available = ! in_array(
				strtolower( trim( (string) $availability ) ),
				array( '0', 'false', 'non', 'indisponible', 'bientôt de retour', 'rupture' ),
				true
			);

			if ( '' === trim( (string) $availability ) ) {
				$available = true;
			}

			$products[] = array(
				'id'           => 'wp-' . $id,
				'name'         => $title,
				'number'       => sprintf( '%02d', $number ),
				'category'     => get_post_meta( $id, 'ldm_category', true ),
				'description'  => wp_strip_all_tags( $description ),
				'tagline'      => $excerpt
					? wp_strip_all_tags( $excerpt )
					: wp_trim_words( wp_strip_all_tags( $description ), 14 ),
				'price'        => $price,
				'availability' => $available ? 'Disponible' : 'Indisponible',
				'image'        => $image,
				'alt'          => $image_alt ? $image_alt : $title,
				'whatsapp_url' => $whatsapp
					? $whatsapp
					: ldm_whatsapp_url( 'Bonjour Lumière du Monde, je souhaite en savoir plus sur « ' . $title . ' ».' ),
			);

			$number++;
		}

		wp_reset_postdata();
	}

	return $products;
}

function ldm_get_showroom_products( $category ) {
	$wordpress_products = ldm_get_wordpress_products( $category );

	if ( ! empty( $wordpress_products ) ) {
		return $wordpress_products;
	}

	return ldm_get_products( $category );
}


/* ============================================================
   SECTION 05 — MAISON IMAGES
   ============================================================ */

function ldm_maison_images_settings() {
	return array(
		'first'  => array(
			'label'   => 'Section 05 — Image 1',
			'default' => '',
		),
		'second' => array(
			'label'   => 'Section 05 — Image 2',
			'default' => '',
		),
	);
}

function ldm_get_maison_image( $position ) {
	$settings = ldm_maison_images_settings();

	if ( ! isset( $settings[ $position ] ) ) {
		return '';
	}

	$image_id = absint( get_option( 'ldm_maison_image_' . $position, 0 ) );

	if ( $image_id ) {
		$url = wp_get_attachment_image_url( $image_id, 'large' );

		if ( $url ) {
			return $url;
		}
	}

	return $settings[ $position ]['default'];
}

function ldm_maison_images_admin_menu() {
	add_theme_page(
		'Section 05 — La maison',
		'Section 05 — La maison',
		'manage_options',
		'ldm-maison-images',
		'ldm_maison_images_admin_page'
	);
}
add_action( 'admin_menu', 'ldm_maison_images_admin_menu' );

function ldm_maison_images_admin_assets( $hook ) {
	if ( 'appearance_page_ldm-maison-images' !== $hook ) {
		return;
	}

	wp_enqueue_media();
}
add_action( 'admin_enqueue_scripts', 'ldm_maison_images_admin_assets' );

function ldm_maison_images_admin_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	if ( isset( $_POST['ldm_maison_save'] ) ) {
		check_admin_referer( 'ldm_maison_images_save' );

		update_option(
			'ldm_maison_image_first',
			isset( $_POST['ldm_maison_image_first'] )
				? absint( $_POST['ldm_maison_image_first'] )
				: 0
		);

		update_option(
			'ldm_maison_image_second',
			isset( $_POST['ldm_maison_image_second'] )
				? absint( $_POST['ldm_maison_image_second'] )
				: 0
		);

		echo '<div class="notice notice-success is-dismissible"><p><strong>Les images de la section 05 ont été enregistrées.</strong></p></div>';
	}

	$first_id  = absint( get_option( 'ldm_maison_image_first', 0 ) );
	$second_id = absint( get_option( 'ldm_maison_image_second', 0 ) );

	$first_url  = $first_id ? wp_get_attachment_image_url( $first_id, 'medium' ) : '';
	$second_url = $second_id ? wp_get_attachment_image_url( $second_id, 'medium' ) : '';
	?>
	<div class="wrap">
		<h1>Section 05 — La maison</h1>

		<p>
			Choisis les deux images utilisées dans la section
			<strong>05 — La maison</strong>.
			Si aucune image n'est choisie, les images actuelles du site restent utilisées.
		</p>

		<form method="post">
			<?php wp_nonce_field( 'ldm_maison_images_save' ); ?>

			<div style="display:grid;grid-template-columns:repeat(2,minmax(280px,1fr));gap:30px;max-width:1000px;margin-top:30px;">

				<div style="background:#fff;border:1px solid #dcdcde;padding:24px;">
					<h2>Image 1</h2>

					<div
						class="ldm-maison-preview"
						data-preview="first"
						style="height:260px;background:#f6f6f6;display:flex;align-items:center;justify-content:center;margin-bottom:18px;overflow:hidden;"
					>
						<?php if ( $first_url ) : ?>
							<img src="<?php echo esc_url( $first_url ); ?>" style="width:100%;height:100%;object-fit:cover;" alt="">
						<?php else : ?>
							<span>Aucune image sélectionnée</span>
						<?php endif; ?>
					</div>

					<input
						type="hidden"
						name="ldm_maison_image_first"
						id="ldm_maison_image_first"
						value="<?php echo esc_attr( $first_id ); ?>"
					>

					<button
						type="button"
						class="button button-primary ldm-select-maison-image"
						data-target="first"
					>
						Choisir une image
					</button>

					<button
						type="button"
						class="button ldm-remove-maison-image"
						data-target="first"
						<?php disabled( ! $first_id ); ?>
					>
						Supprimer
					</button>
				</div>

				<div style="background:#fff;border:1px solid #dcdcde;padding:24px;">
					<h2>Image 2</h2>

					<div
						class="ldm-maison-preview"
						data-preview="second"
						style="height:260px;background:#f6f6f6;display:flex;align-items:center;justify-content:center;margin-bottom:18px;overflow:hidden;"
					>
						<?php if ( $second_url ) : ?>
							<img src="<?php echo esc_url( $second_url ); ?>" style="width:100%;height:100%;object-fit:cover;" alt="">
						<?php else : ?>
							<span>Aucune image sélectionnée</span>
						<?php endif; ?>
					</div>

					<input
						type="hidden"
						name="ldm_maison_image_second"
						id="ldm_maison_image_second"
						value="<?php echo esc_attr( $second_id ); ?>"
					>

					<button
						type="button"
						class="button button-primary ldm-select-maison-image"
						data-target="second"
					>
						Choisir une image
					</button>

					<button
						type="button"
						class="button ldm-remove-maison-image"
						data-target="second"
						<?php disabled( ! $second_id ); ?>
					>
						Supprimer
					</button>
				</div>

			</div>

			<p style="margin-top:30px;">
				<button type="submit" name="ldm_maison_save" class="button button-primary button-large">
					Enregistrer les images
				</button>
			</p>
		</form>
	</div>

	<script>
	document.addEventListener('DOMContentLoaded', function () {
		document.querySelectorAll('.ldm-select-maison-image').forEach(function (button) {
			button.addEventListener('click', function () {
				const target = this.dataset.target;

				const frame = wp.media({
					title: 'Choisir une image pour la section 05',
					button: {
						text: 'Utiliser cette image'
					},
					multiple: false,
					library: {
						type: 'image'
					}
				});

				frame.on('select', function () {
					const attachment = frame.state().get('selection').first().toJSON();

					document.getElementById('ldm_maison_image_' + target).value = attachment.id;

					const preview = document.querySelector(
						'.ldm-maison-preview[data-preview="' + target + '"]'
					);

					const imageUrl =
						attachment.sizes && attachment.sizes.medium
							? attachment.sizes.medium.url
							: attachment.url;

					preview.innerHTML =
						'<img src="' + imageUrl + '" style="width:100%;height:100%;object-fit:cover;" alt="">';

					const removeButton = document.querySelector(
						'.ldm-remove-maison-image[data-target="' + target + '"]'
					);

					removeButton.disabled = false;
				});

				frame.open();
			});
		});

		document.querySelectorAll('.ldm-remove-maison-image').forEach(function (button) {
			button.addEventListener('click', function () {
				const target = this.dataset.target;

				document.getElementById('ldm_maison_image_' + target).value = '';

				const preview = document.querySelector(
					'.ldm-maison-preview[data-preview="' + target + '"]'
				);

				preview.innerHTML = '<span>Aucune image sélectionnée</span>';

				this.disabled = true;
			});
		});
	});
	</script>
	<?php
}



/* ============================================================
   UNIVERS IMAGES — WORDPRESS MEDIA
   ============================================================ */

function ldm_get_universe_custom_image( $universe ) {
	$image_id = absint(
		get_option( 'ldm_universe_image_' . $universe, 0 )
	);

	if ( $image_id ) {
		$url = wp_get_attachment_image_url( $image_id, 'large' );

		if ( $url ) {
			return $url;
		}
	}

	return '';
}

function ldm_universe_images_admin_menu() {
	add_theme_page(
		'Images des univers',
		'Images des univers',
		'manage_options',
		'ldm-universe-images',
		'ldm_universe_images_admin_page'
	);
}
add_action( 'admin_menu', 'ldm_universe_images_admin_menu' );

function ldm_universe_images_admin_assets( $hook ) {
	if ( 'appearance_page_ldm-universe-images' !== $hook ) {
		return;
	}

	wp_enqueue_media();
}
add_action( 'admin_enqueue_scripts', 'ldm_universe_images_admin_assets' );

function ldm_universe_images_admin_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	if ( isset( $_POST['ldm_universe_images_save'] ) ) {
		check_admin_referer( 'ldm_universe_images_save' );

		update_option(
			'ldm_universe_image_luminaires',
			isset( $_POST['ldm_universe_image_luminaires'] )
				? absint( $_POST['ldm_universe_image_luminaires'] )
				: 0
		);

		update_option(
			'ldm_universe_image_tableware',
			isset( $_POST['ldm_universe_image_tableware'] )
				? absint( $_POST['ldm_universe_image_tableware'] )
				: 0
		);

		echo '<div class="notice notice-success is-dismissible"><p><strong>Les images des univers ont été enregistrées.</strong></p></div>';
	}

	$luminaires_id = absint(
		get_option( 'ldm_universe_image_luminaires', 0 )
	);

	$tableware_id = absint(
		get_option( 'ldm_universe_image_tableware', 0 )
	);

	$luminaires_url = $luminaires_id
		? wp_get_attachment_image_url( $luminaires_id, 'medium' )
		: '';

	$tableware_url = $tableware_id
		? wp_get_attachment_image_url( $tableware_id, 'medium' )
		: '';
	?>

	<div class="wrap">

		<h1>Images des univers</h1>

		<p>
			Modifie ici les deux images affichées dans
			<strong>01 — Deux mondes. Une même lumière.</strong>
		</p>

		<div
			style="
				display:grid;
				grid-template-columns:repeat(2,minmax(300px,1fr));
				gap:30px;
				max-width:1100px;
				margin-top:30px;
			"
		>

			<!-- LUMINAIRES -->

			<div style="background:#fff;border:1px solid #dcdcde;padding:25px;">

				<h2>01 — Luminaires</h2>

				<div
					class="ldm-universe-preview"
					data-preview="luminaires"
					style="
						height:300px;
						background:#f6f6f6;
						display:flex;
						align-items:center;
						justify-content:center;
						margin:20px 0;
						overflow:hidden;
					"
				>
					<?php if ( $luminaires_url ) : ?>

						<img
							src="<?php echo esc_url( $luminaires_url ); ?>"
							style="width:100%;height:100%;object-fit:cover;"
							alt=""
						>

					<?php else : ?>

						<span>Aucune image personnalisée</span>

					<?php endif; ?>
				</div>

				<input
					type="hidden"
					name="ldm_universe_image_luminaires"
					id="ldm_universe_image_luminaires"
					value="<?php echo esc_attr( $luminaires_id ); ?>"
				>

				<button
					type="button"
					class="button button-primary ldm-select-universe-image"
					data-target="luminaires"
				>
					Choisir une image
				</button>

				<button
					type="button"
					class="button ldm-remove-universe-image"
					data-target="luminaires"
					<?php disabled( ! $luminaires_id ); ?>
				>
					Supprimer
				</button>

			</div>
