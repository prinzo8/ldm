<article class="page-width" style="padding:120px 0 60px;">
    <div class="section-label"><?php echo esc_html( get_the_date() ); ?></div>
    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    <div class="entry-content"><?php the_excerpt(); ?></div>
</article>
