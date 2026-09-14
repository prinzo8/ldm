# Lumière du Monde — thème WordPress `ldm`

Thème WordPress complet pour le showroom digital Lumière du Monde à Abidjan. La version 4 conserve l’expérience immersive existante : loader de marque, transitions d’univers, cartes avec profondeur 3D, parallax, spotlight, curseur adaptatif, progress indicator, WhatsApp flottant, modale produit, section La Maison enrichie et responsive desktop/tablette/mobile.

## Installation

1. Téléversez `ldm.zip` dans **Apparence → Thèmes → Ajouter un thème → Téléverser un thème**.
2. Activez le thème **Lumière du Monde**.
3. Dans **Réglages → Lecture**, choisissez la page d’accueil souhaitée. Le fichier `front-page.php` compose l’expérience monopage.
4. Dans **Apparence → Menus**, assignez votre menu à l’emplacement **Navigation principale**. Si aucun menu n’est assigné, le thème fournit automatiquement les ancres de navigation.
5. Dans **Réglages → Permaliens**, enregistrez à nouveau les réglages après activation afin de rafraîchir les URLs du post type produit.

Le dossier installé doit être exactement :

```text
wp-content/themes/ldm/
```

## Structure

| Élément | Fonction |
| --- | --- |
| `front-page.php` | Compose le parcours d’accueil et les sections de la maison. |
| `header.php`, `footer.php` | Structure globale WordPress, navigation, CTA, modale produit et interfaces flottantes. |
| `template-parts/` | Hero, loader, univers, luminaires, art de la table, Maison, Abidjan et contact. |
| `inc/products.php` | Données de démonstration des 12 produits et helpers d’affichage. |
| `inc/product-cpt.php` | Post type `ldm_product` et métadonnées prêtes pour une future évolution catalogue. |
| `assets/css/main.css` | Design system, responsive, transitions, motion, cartes, curseur et états reduced-motion. |
| `assets/js/main.js` | Loader, transitions d’univers, modale, tilt, spotlight, parallax, progress indicator et micro-interactions. |
| `assets/images/products/` | Les 12 images produit incluses dans le thème. |
| `assets/images/ldm-official-symbol.png` | Symbole officiel de la marque. |
| `archive.php`, `404.php`, `index.php`, `page.php`, `single.php` | Templates de repli WordPress complets. |

## Configuration WhatsApp

Les coordonnées de démonstration sont centralisées dans `ldm_contact_details()` dans `functions.php`. Remplacez le champ `whatsapp` par le numéro réel au format international, sans espaces ni signe `+`. Remplacez également `phone` et `email`.

Les fiches produit construisent automatiquement un message contenant le nom du produit sélectionné. Exemple :

```text
Bonjour Lumière du Monde, je souhaite en savoir plus sur Opale.
```

Le bouton flottant, le header, la section contact, le footer et la modale produit utilisent le même système d’icône et de lien.

## Google Maps

L’adresse actuellement utilisée est **Riviera 3, Abidjan, Côte d’Ivoire**, conformément aux informations fournies. Le lien Google Maps se trouve dans `template-parts/abidjan.php`. Remplacez le paramètre `query` par l’adresse réelle si nécessaire. Aucune coordonnée GPS n’est inventée par le thème.

## Facebook

Le pictogramme Facebook est présent dans le footer, mais aucun faux lien n’est utilisé. Ajoutez l’URL officielle lorsqu’elle sera disponible, en remplaçant le bloc d’attente dans `footer.php` par un lien externe sécurisé avec `target="_blank"` et `rel="noopener"`.

## Gestion des assets

Toutes les images produit et le symbole officiel sont inclus dans le dossier `assets/images/`. Les styles et scripts sont chargés par `wp_enqueue_style()` et `wp_enqueue_script()` depuis `functions.php`, avec versionnement `4.0.0` pour l’invalidation du cache. Les polices utilisent Google Fonts comme source stable ; elles peuvent être auto-hébergées ultérieurement si la politique de déploiement l’exige.

Le thème ne dépend d’aucune URL de prévisualisation, d’aucun serveur de développement externe et d’aucun fichier local non inclus dans l’archive.

## WooCommerce et catalogue futur

Le post type `ldm_product` et ses champs `ldm_price`, `ldm_availability`, `ldm_category` et `ldm_whatsapp_url` sont déjà préparés. Pour une future intégration WooCommerce, remplacez progressivement la source de données de `ldm_get_products()` ou ajoutez un adaptateur WooCommerce dans `inc/`, sans modifier les composants visuels ni le système d’interactions.

## Accessibilité et performance

Le thème utilise des landmarks sémantiques, des textes alternatifs, des états `focus-visible`, une navigation clavier, des images lazy-loading hors hero et la préférence `prefers-reduced-motion`. Les animations privilégient `transform` et `opacity`. Les interactions nécessitant une souris sont limitées aux périphériques à pointeur fin et les effets sont simplifiés sur mobile.

Avant publication, remplacez les coordonnées de démonstration, fournissez les vraies photos du showroom dans `La Maison`, renseignez le lien Facebook officiel et optimisez les images selon les contraintes de votre hébergement.
