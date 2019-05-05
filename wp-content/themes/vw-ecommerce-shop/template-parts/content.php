<?php
/**
 * The template part for displaying content 
 *
 * @package VW Ecommerce Shop 
 * @subpackage vw_ecommerce_shop
 * @since VW Ecommerce Shop 1.0
 */
?>
<div id="post-<?php the_ID(); ?>" <?php post_class('inner-service'); ?>>
  <div class="post-main-box">
    <div class="row">
      <div class="col-lg-2 col-md-3">
        <div class="datebox">
            <div class="date-monthwrap">
               <span class="date-month"><?php echo esc_html( get_the_date( 'M' ) ); ?></span>
               <span class="date-day"><?php echo esc_html( get_the_date( 'd') ); ?></span>
            </div>
            <div class="yearwrap">
                <span class="date-year"><?php echo esc_html( get_the_date( 'Y' ) ); ?></span>
            </div>
          </div>
      </div>
      <div class="col-lg-10 col-md-9">
        <h3 class="section-title"><?php the_title();?></h3>      
        <div class="new-text">
          <p><?php $excerpt = get_the_excerpt(); echo esc_html( vw_ecommerce_shop_string_limit_words( $excerpt,20 ) ); ?></p>
        </div>
         <div class="content-bttn">
          <a href="<?php echo esc_url( get_permalink() );?>" class="blogbutton-small hvr-sweep-to-right" title="<?php esc_attr_e( 'Read More', 'vw-ecommerce-shop' ); ?>"><?php esc_html_e('Read More','vw-ecommerce-shop'); ?></a>
        </div>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
</div>