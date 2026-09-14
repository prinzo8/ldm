<?php /** @package LumiereDuMonde */ ?>
<div class="preloader" data-preloader role="status" aria-label="Chargement de Lumière du Monde">
	<div class="preloader__content">
		<img class="preloader__symbol" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/ldm-official-symbol.png' ); ?>" alt="" aria-hidden="true">
		<p class="preloader__wordmark">Lumière <em>du Monde</em></p>
		<div class="ldm-bulb ldm-bulb--preloader" data-bulb aria-hidden="true">
			<svg viewBox="0 0 120 160" role="presentation">
				<defs>
					<radialGradient id="bulb-glow-preloader" cx="50%" cy="42%" r="50%">
						<stop offset="0%" stop-color="#eaff41" stop-opacity=".55"/>
						<stop offset="55%" stop-color="#eaff41" stop-opacity=".12"/>
						<stop offset="100%" stop-color="#eaff41" stop-opacity="0"/>
					</radialGradient>
				</defs>

				<ellipse class="ldm-bulb__halo" cx="60" cy="66" rx="57" ry="60" fill="url(#bulb-glow-preloader)"/>

				<path class="ldm-bulb__glass"
					d="M60 13
					C36 13 19 30 19 54
					C19 72 28 83 39 94
					C45 100 47 108 47 116
					H73
					C73 108 75 100 81 94
					C92 83 101 72 101 54
					C101 30 84 13 60 13Z"/>

				<path class="ldm-bulb__filament"
					d="M49 61
					C51 53 55 49 60 49
					C65 49 69 53 71 61
					L67 74
					M53 74
					L67 74"/>

				<path class="ldm-bulb__base"
					d="M47 116H73
					M48 121H72
					M50 126H70
					M53 131H67"/>
			</svg>
		</div>
		<div class="preloader__meter"><span data-preloader-bar></span></div>
		<div class="preloader__meta"><span>Chargement de la maison</span><b data-preloader-count>00%</b></div>
	</div>
</div>
