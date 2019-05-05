<?php
/**
 * Template Name:Page with Right Sidebar
 */

get_header(); ?>

<?php do_action( 'vw_ecommerce_shop_pageright_top' ); ?>

<div class="container">
    <div class="middle-align row">       
		<div class="col-lg-8 col-md-8" id="content-vw" >
			<?php while ( have_posts() ) : the_post(); ?>
                <h1><?php the_title(); ?></h1>
                <img src="<?php the_post_thumbnail_url(); ?>">
                <p><?php the_content();?></p>
                <?php
                    //If comments are open or we have at least one comment, load up the comment template
                    if ( comments_open() || '0' != get_comments_number() )
                        comments_template();
                ?>
            <?php endwhile; // end of the loop. ?>
        </div>
        <div class="col-lg-4 col-md-4">
			<?php get_sidebar('page'); ?>
		</div>
        <div class="clear"></div>    
    </div>
</div>

<?php do_action( 'vw_ecommerce_shop_pageright_bottom' ); ?>

<?php get_footer(); ?>