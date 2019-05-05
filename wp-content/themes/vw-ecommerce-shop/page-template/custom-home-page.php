<?php
/**
 * Template Name: Custom Home
 */

get_header(); ?>

<?php do_action( 'vw_ecommerce_shop_above_slider' ); ?>

<div class="container">
	<div class="row m-0">
		<div class="col-lg-3 col-md-4 padremove ">
			<div class="categry-header"><i class="fa fa-bars" aria-hidden="true"></i><span><?php echo esc_html_e('ALL CATEGORIES','vw-ecommerce-shop'); ?></span></div>
			<div class="cat-drop">
			<?php
				$args = array(
			    //'number'     => $number,
			    'orderby'    => 'title',
			    'order'      => 'ASC',
			    'hide_empty' => 0,
			    'parent'  => 0
			    //'include'    => $ids
				);
				$product_categories = get_terms( 'product_cat', $args );
				$count = count($product_categories);
				if ( $count > 0 ){
				    foreach ( $product_categories as $product_category ) {
				    		$cat_id   = $product_category->term_id;
							$cat_link = get_category_link( $cat_id );
							$thumbnail_id = get_woocommerce_term_meta( $product_category->term_id, 'thumbnail_id', true ); // Get Category Thumbnail
							$image = wp_get_attachment_url( $thumbnail_id );
				    	if ($product_category->category_parent == 0) {
				    		?>
						 <li class="drp_dwn_menu"><a href="<?php echo esc_url(get_term_link( $product_category ) ); ?>">
						 	<?php
						 if ( $image ) {
						echo '<img class="thumd_img" src="' . esc_url( $image ) . '" alt="" />';
					}
						echo esc_html( $product_category->name ); ?></a></li>
						 <?php
						}			    
					}
				}
			?>
			</div>
		</div>
		<div class="col-lg-9 col-md-8 padremove">
			<?php if( get_theme_mod('vw_ecommerce_shop_slider_hide_show') != ''){ ?>
			  	<section class="slider">
				    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel"> 
				      <?php $pages = array();
				        for ( $count = 1; $count <= 4; $count++ ) {
				          $mod = intval( get_theme_mod( 'vw_ecommerce_shop_slider_page' . $count ));
				          if ( 'page-none-selected' != $mod ) {
				            $pages[] = $mod;
				          }
				        }
				        if( !empty($pages) ) :
				          $args = array(
				            'post_type' => 'page',
				            'post__in' => $pages,
				            'orderby' => 'post__in'
				          );
				          $query = new WP_Query( $args );
				          if ( $query->have_posts() ) :
				            $i = 1;
				      ?>     
				      <div class="carousel-inner" role="listbox">
				        <?php  while ( $query->have_posts() ) : $query->the_post(); ?>
				          <div <?php if($i == 1){echo 'class="carousel-item active"';} else{ echo 'class="carousel-item"';}?>>
				            <img src="<?php the_post_thumbnail_url('full'); ?>"/>
				            <div class="carousel-caption">
				              <div class="inner_carousel">
				                <h2><?php the_title(); ?></h2>
				                <p><?php $excerpt = get_the_excerpt(); echo esc_html( vw_ecommerce_shop_string_limit_words( $excerpt,20 ) ); ?></p>
				                <div class="more-btn">              
				                  <a href="<?php the_permalink(); ?>"><?php esc_html_e('READ MORE','vw-ecommerce-shop'); ?></a>
				                </div>
				              </div>
				            </div>
				          </div>
				        <?php $i++; endwhile; 
				        wp_reset_postdata();?>
				      </div>
				      <?php else : ?>
				          <div class="no-postfound"></div>
				        <?php endif;
				      endif;?>
				      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
				        <span class="carousel-control-prev-icon" aria-hidden="true"><i class="fas fa-angle-left"></i></span>
				      </a>
				      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
				        <span class="carousel-control-next-icon" aria-hidden="true"><i class="fas fa-angle-right"></i></span>
				      </a>
				    </div>  
			    	<div class="clearfix"></div>
			  	</section> 
			<?php }?>
		</div>
		<div class="clearfix"></div>
	</div>
</div>

<?php do_action( 'vw_ecommerce_shop_below_slider' ); ?>

<?php if( get_theme_mod('vw_ecommerce_shop_maintitle') != ''){ ?>
	<section class="our-products">
		<div class="container">
		    <div class="text-center">
		        <?php if( get_theme_mod('vw_ecommerce_shop_maintitle') != ''){ ?>     
		            <h3><?php echo esc_html(get_theme_mod('vw_ecommerce_shop_maintitle','')); ?></h3>
		        <?php }?>
		    </div>
			<?php $pages = array();
			for ( $count = 0; $count <= 0; $count++ ) {
				$mod = absint( get_theme_mod( 'vw_ecommerce_shop_page' . $count ));
				if ( 'page-none-selected' != $mod ) {
				  $pages[] = $mod;
				}
			}
			if( !empty($pages) ) :
			  $args = array(
			    'post_type' => 'page',
			    'post__in' => $pages,
			    'orderby' => 'post__in'
			  );
			  $query = new WP_Query( $args );
			  if ( $query->have_posts() ) :
			    $count = 0;
					while ( $query->have_posts() ) : $query->the_post(); ?>
					    <div class="row box-image text-center m-0">
					        <p><?php the_content(); ?></p>
					        <div class="clearfix"></div>
					    </div>
					<?php $count++; endwhile; ?>
			  <?php else : ?>
			      <div class="no-postfound"></div>
			  <?php endif;
			endif;
			wp_reset_postdata()?>
		    <div class="clearfix"></div> 
		</div>
	</section>
<?php }?>

<?php do_action( 'vw_ecommerce_shop_below_trending_product' ); ?>

<div id="content-vw" class="container">
  <?php while ( have_posts() ) : the_post(); ?>
        <?php the_content(); ?>
    <?php endwhile; // end of the loop. ?>
</div>

<?php get_footer(); ?>