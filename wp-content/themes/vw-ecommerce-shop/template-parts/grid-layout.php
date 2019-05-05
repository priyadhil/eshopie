<?php
/**
 * The template part for displaying grid layout
 *
 * @package VW Ecommerce Shop
 * @subpackage vw-ecommerce-shop
 * @since VW Ecommerce Shop 1.0
 */
?>
<div class="col-lg-4 col-md-4">
	<div id="post-<?php the_ID(); ?>" <?php post_class('inner-service'); ?>>
	    <div class="post-main-box">
	      	<div class="box-image">
	          <?php 
	            if(has_post_thumbnail()) { 
	              the_post_thumbnail(); 
	            }
	          ?>  
	        </div>
	        <h3 class="section-title"><?php the_title();?></h3>
	        <div class="new-text">
	          <p><?php $excerpt = get_the_excerpt(); echo esc_html( vw_ecommerce_shop_string_limit_words( $excerpt,20 ) ); ?></p>
	        </div>
	        <div class="content-bttn">
	          <a href="<?php echo esc_url( get_permalink() );?>" class="blogbutton-small hvr-sweep-to-right" title="<?php esc_attr_e( 'Read More', 'vw-ecommerce-shop' ); ?>"><?php esc_html_e('Read More','vw-ecommerce-shop'); ?></a>
	        </div>
	    </div>
	    <div class="clearfix"></div>
  	</div>
</div>