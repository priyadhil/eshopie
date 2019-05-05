<?php
/**
 * The template part for displaying single post
 *
 * @package VW Ecommerce Shop
 * @subpackage vw-ecommerce-shop
 * @since VW Ecommerce Shop 1.0
 */
?>
<div id="post-<?php the_ID(); ?>" <?php post_class('inner-service'); ?>>
    <h2 class="single-post-title"><?php the_title(); ?></h1>
    <div id="content-vw" class="metabox">
      <span class="entry-date"><i class="fas fa-calendar-alt"></i><?php echo get_the_date(); ?></span>
      <span class="entry-author"><i class="far fa-user"></i><a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' )) ); ?>"><?php the_author(); ?></a></span>
      <span class="entry-comments"><i class="fas fa-comments"></i><?php comments_number( __('0 Comments','vw-ecommerce-shop'), __('0 Comments','vw-ecommerce-shop'), __('% Comments','vw-ecommerce-shop')); ?></span>
    </div><!-- metabox -->
    <?php if(has_post_thumbnail()) { ?>
            <hr>
            <div class="feature-box">   
                <img src="<?php the_post_thumbnail_url('full'); ?>"  width="100%">
            </div><hr>                 
        <?php } the_content();
        the_tags(); ?>
        <?php
        // If comments are open or we have at least one comment, load up the comment template
        if ( comments_open() || '0' != get_comments_number() )
        comments_template();

        if ( is_singular( 'attachment' ) ) {
            // Parent post navigation.
            the_post_navigation( array(
                'prev_text' => _x( '<span class="meta-nav">Published in</span><span class="post-title">%title</span>', 'Parent post link', 'vw-ecommerce-shop' ),
            ) );
        } elseif ( is_singular( 'post' ) ) {
            // Previous/next post navigation.
            the_post_navigation( array(
                'next_text' => '<span class="meta-nav" aria-hidden="true">' . __( 'Next', 'vw-ecommerce-shop' ) . '</span> ' .
                    '<span class="screen-reader-text">' . __( 'Next post:', 'vw-ecommerce-shop' ) . '</span> ' .
                    '<span class="post-title">%title</span>',
                'prev_text' => '<span class="meta-nav" aria-hidden="true">' . __( 'Previous', 'vw-ecommerce-shop' ) . '</span> ' .
                    '<span class="screen-reader-text">' . __( 'Previous post:', 'vw-ecommerce-shop' ) . '</span> ' .
                    '<span class="post-title">%title</span>',
            ) );
        }
    ?>
</div>