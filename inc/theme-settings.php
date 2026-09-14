<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * =========================================================
 * LUMIÈRE DU MONDE - RÉGLAGES DU SITE
 * =========================================================
 */

/**
 * Ajouter la page dans WordPress
 */
function ldm_add_settings_page() {

    add_options_page(
        'Lumière du Monde',
        'Lumière du Monde',
        'manage_options',
        'ldm-settings',
        'ldm_render_settings_page'
    );
}

add_action('admin_menu', 'ldm_add_settings_page');


/**
 * Enregistrer les réglages
 */
function ldm_register_settings() {

    register_setting('ldm_settings_group', 'ldm_phone');
    register_setting('ldm_settings_group', 'ldm_email');
    register_setting('ldm_settings_group', 'ldm_whatsapp');
    register_setting('ldm_settings_group', 'ldm_address');
    register_setting('ldm_settings_group', 'ldm_google_maps');
    register_setting('ldm_settings_group', 'ldm_hours');
}

add_action('admin_init', 'ldm_register_settings');


/**
 * Page d'administration
 */
function ldm_render_settings_page() {

    if (!current_user_can('manage_options')) {
        return;
    }

    $hours = get_option('ldm_hours', []);

    $days = [
        'lundi'    => 'Lundi',
        'mardi'    => 'Mardi',
        'mercredi' => 'Mercredi',
        'jeudi'    => 'Jeudi',
        'vendredi' => 'Vendredi',
        'samedi'   => 'Samedi',
        'dimanche' => 'Dimanche',
    ];
    ?>

    <div class="wrap">

        <h1>Lumière du Monde</h1>

        <p>
            Gérez ici les informations affichées sur le site.
        </p>

        <form method="post" action="options.php">

            <?php settings_fields('ldm_settings_group'); ?>


            <!-- CONTACT -->

            <h2>Informations de contact</h2>

            <table class="form-table">

                <tr>
                    <th scope="row">
                        <label for="ldm_phone">
                            Téléphone
                        </label>
                    </th>

                    <td>
                        <input
                            type="text"
                            id="ldm_phone"
                            name="ldm_phone"
                            value="<?php echo esc_attr(get_option('ldm_phone', '')); ?>"
                            class="regular-text"
                        >

                        <p class="description">
                            Numéro de téléphone principal du showroom.
                        </p>
                    </td>
                </tr>


                <tr>
                    <th scope="row">
                        <label for="ldm_email">
                            E-mail
                        </label>
                    </th>

                    <td>
                        <input
                            type="email"
                            id="ldm_email"
                            name="ldm_email"
                            value="<?php echo esc_attr(get_option('ldm_email', '')); ?>"
                            class="regular-text"
                        >

                        <p class="description">
                            Adresse e-mail utilisée par le site.
                        </p>
                    </td>
                </tr>


                <tr>
                    <th scope="row">
                        <label for="ldm_whatsapp">
                            WhatsApp
                        </label>
                    </th>

                    <td>
                        <input
                            type="text"
                            id="ldm_whatsapp"
                            name="ldm_whatsapp"
                            value="<?php echo esc_attr(get_option('ldm_whatsapp', '')); ?>"
                            class="regular-text"
                        >

                        <p class="description">
                            Format international sans le + ni espaces.
                            Exemple : 2250700000000
                        </p>
                    </td>
                </tr>


                <tr>
                    <th scope="row">
                        <label for="ldm_address">
                            Adresse
                        </label>
                    </th>

                    <td>
                        <textarea
                            id="ldm_address"
                            name="ldm_address"
                            rows="3"
                            class="large-text"
                        ><?php echo esc_textarea(get_option('ldm_address', '')); ?></textarea>

                        <p class="description">
                            Adresse physique du showroom.
                        </p>
                    </td>
                </tr>


                <tr>
                    <th scope="row">
                        <label for="ldm_google_maps">
                            Google Maps
                        </label>
                    </th>

                    <td>
                        <input
                            type="url"
                            id="ldm_google_maps"
                            name="ldm_google_maps"
                            value="<?php echo esc_attr(get_option('ldm_google_maps', '')); ?>"
                            class="large-text"
                        >

                        <p class="description">
                            Collez ici le lien Google Maps du showroom.
                        </p>
                    </td>
                </tr>

            </table>


            <!-- HORAIRES -->

            <h2>Horaires d'ouverture</h2>

            <table class="widefat striped">

                <thead>

                    <tr>
                        <th>Jour</th>
                        <th>Ouverture</th>
                        <th>Fermeture</th>
                        <th>Fermé</th>
                    </tr>

                </thead>

                <tbody>

                <?php foreach ($days as $key => $label): ?>

                    <?php

                    $open = $hours[$key]['open'] ?? '';
                    $close = $hours[$key]['close'] ?? '';
                    $closed = !empty($hours[$key]['closed']);

                    ?>

                    <tr>

                        <td>
                            <strong>
                                <?php echo esc_html($label); ?>
                            </strong>
                        </td>


                        <td>

                            <input
                                type="time"
                                name="ldm_hours[<?php echo esc_attr($key); ?>][open]"
                                value="<?php echo esc_attr($open); ?>"
                            >

                        </td>


                        <td>

                            <input
                                type="time"
                                name="ldm_hours[<?php echo esc_attr($key); ?>][close]"
                                value="<?php echo esc_attr($close); ?>"
                            >

                        </td>


                        <td>

                            <label>

                                <input
                                    type="checkbox"
                                    name="ldm_hours[<?php echo esc_attr($key); ?>][closed]"
                                    value="1"
                                    <?php checked($closed, true); ?>
                                >

                                Fermé

                            </label>

                        </td>

                    </tr>

                <?php endforeach; ?>

                </tbody>

            </table>


            <?php submit_button('Enregistrer les informations'); ?>

        </form>

    </div>

    <?php
}


/**
 * =========================================================
 * FONCTIONS DE RÉCUPÉRATION
 * =========================================================
 */

function ldm_get_phone() {

    return get_option('ldm_phone', '');
}


function ldm_get_email() {

    return get_option('ldm_email', '');
}


function ldm_get_whatsapp() {

    return get_option('ldm_whatsapp', '');
}


function ldm_get_address() {

    return get_option('ldm_address', '');
}


function ldm_get_google_maps() {

    return get_option('ldm_google_maps', '');
}


function ldm_get_hours() {

    return get_option('ldm_hours', []);
}
