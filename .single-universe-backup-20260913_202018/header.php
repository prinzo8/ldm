<?php
/** @package LumiereDuMonde */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="theme-color" content="#eaff41">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'ldm-body' ); ?>>
<?php wp_body_open(); ?>
	<div class="cursor" aria-hidden="true"></div>
<a class="skip-link" href="#content"><?php esc_html_e( 'Aller au contenu', 'lumiere-du-monde' ); ?></a>
<header class="site-header" data-header>
		<div class="site-header__inner">
			<a class="brand" href="#home" aria-label="Lumière du Monde — accueil" data-transition-link>
				<img class="brand__symbol" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/ldm-official-symbol.png' ); ?>" alt="" aria-hidden="true">
				<span class="brand__name">Lumière<br><em>du Monde</em></span>
			</a>
		<nav class="site-nav" aria-label="<?php esc_attr_e( 'Navigation principale', 'lumiere-du-monde' ); ?>">
			<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'menu_class' => 'nav-list', 'fallback_cb' => 'ldm_nav_fallback' ) ); ?>
		</nav>
		<div class="header-actions">
				<a class="header-whatsapp magnetic" data-cursor="WhatsApp" href="<?php echo esc_url( ldm_whatsapp_url() ); ?>" target="_blank" rel="noopener"><svg class="icon icon--whatsapp" aria-hidden="true" viewBox="0 0 24 24"><path d="M20.5 3.5A11.7 11.7 0 0 0 12.1 0C5.6 0 .4 5.2.4 11.7c0 2.1.6 4.2 1.7 6L.3 24l6.5-1.7a11.7 11.7 0 0 0 5.3 1.3h.1c6.4 0 11.7-5.2 11.7-11.7 0-3.1-1.2-6.1-3.4-8.4Zm-8.4 18.1h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 7 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.8-9.8 9.8Zm5.4-7.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2.9 2.5.8 3 .7.7-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.2-.2-.4-.3-.7-.5Z"/></svg><span>WhatsApp</span></a>
			<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle><span></span><span></span><span class="screen-reader-text"><?php esc_html_e( 'Ouvrir le menu', 'lumiere-du-monde' ); ?></span></button>
		</div>
	</div>
	<nav class="mobile-menu" id="mobile-menu" aria-label="<?php esc_attr_e( 'Menu mobile', 'lumiere-du-monde' ); ?>" data-mobile-menu>
		<a href="#home">Accueil</a><a href="#luminaires">Luminaires</a><a href="#maison">La maison</a><a href="#abidjan">Nous trouver</a><a href="#contact">Contact</a>
	</nav>
	</header>
	<div class="scroll-progress" data-scroll-progress aria-hidden="true"><span data-scroll-progress-label>INTRO</span><i></i></div>
