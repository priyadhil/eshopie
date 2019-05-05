if (!WOOSVIADM) {
    var WOOSVIADM = {}
} else {
    if (WOOSVIADM && typeof WOOSVIADM !== "object") {
        throw new Error("WOOSVIADM is not an Object type")
    }
}
WOOSVIADM.isLoaded = false;
WOOSVIADM.STARTS = function ($) {
    var $video_tag = '<input class="svipro-product_video_gallery" name="sviproduct_video_gallery[{{slug}}][{{attachment_id}}]" value="{{video_url}}" type="hidden">';
    return {
        NAME: "Application initialize module",
        VERSION: 1.0,
        init: function () {
            if ($('body').hasClass('woocommerce_page_woocommerce_svi')) {
                this.loadInits();
            }
            this.notices();
            this.initMedia();
            this.goMediaGallery();
            this.initMediaGal();
        },
        loadInits: function () {
            $('input#columns').attr('type', 'number').attr('min', 1).attr('max', 10);
            $('input#lens_size').attr('type', 'number').attr('min', 100).attr('max', 300);
            $('input#slider_spaceBetweenNavigation,input#slider_spaceBetween,#lightbox_thumbnails_thumbWidth,input#lens_zIndex').attr('type', 'number');

            $('input#lightbox_width').attr('type', 'number').attr('min', 10).attr('max', 90);
            $('input#lightbox_height').attr('type', 'number').attr('min', 100).attr('max', 1000);

            $('input#hide_thumbs').change(function () {
                if ($(this).val() == 1) {
                    $('#woosvi_options-variation_swap label.cb-disable').trigger('click');
                    $('#woosvi_options-keep_thumbnails label.cb-disable').trigger('click')
                }
            });

            $('input#keep_thumbnails').change(function () {
                if ($(this).val() == 1) {
                    $('#woosvi_options-swselect label.cb-disable').trigger('click');
                    $('#woosvi_options-hide_thumbs label.cb-disable').trigger('click');
                }
            });

        },
        notices: function () {
            jQuery(document).on('click', '.woosvi-notice-dismissed .notice-dismiss', function () {
                jQuery.ajax({
                    url: ajaxurl,
                    data: {
                        action: 'woosvi_dismiss_notice'
                    }
                });
            });
        },
        /**
         * Block edit screen
         */
        block: function () {
            $('#sviproimages_tab_data').block({
                message: null,
                overlayCSS: {
                    background: '#fff',
                    opacity: 0.6
                }
            });
        },
        /**
         * Unblock edit screen
         */
        unblock: function () {
            $('#sviproimages_tab_data').unblock();
        },
        initMedia: function () {
            $('#svibulkbtn:not(.active)').on('click', function () {
                WOOSVIADM.STARTS.reloadSelect();
                //WOOSVIADM.STARTS.reload();
            });
        },
        reloadSelect: function () {
            WOOSVIADM.STARTS.block();
            var wrapper = $('div#sviselect_container');

            jQuery.ajax({
                url: ajaxurl,
                type: 'POST',
                dataType: 'html',
                data: {
                    action: 'woosvi_reloadselect',
                    data: $('#post_ID').val()
                },
                success: function (response) {
                    wrapper.empty().append(response);

                    // $('div[id^=__wp-uploader]').remove();
                    // WOOSVIADM.STARTS.initMediaGal();
                    //WOOSVIADM.STARTS.goMediaGallery();
                    WOOSVIADM.STARTS.unblock();
                    $('select#sviprobulk').select2();

                    WOOSVIADM.STARTS.tag();
                }
            });
        },
        tag: function () {
            var $tag = $("select#sviprobulk");

            $tag.on('select2:selecting', function (e) {
                var sibling_elements = e.params.args.data.element.parentElement.children
                for (var i = 0; i < sibling_elements.length; i++) {
                    sibling_elements[i].selected = false
                }
            });
        },
        reload: function () {
            WOOSVIADM.STARTS.block();
            var wrapper = $('div#sviproimages_tab_data');

            jQuery.ajax({
                url: ajaxurl,
                type: 'POST',
                dataType: 'html',
                data: {
                    action: 'woosvi_reload',
                    data: $('#post_ID').val()
                },
                success: function (response) {

                    wrapper.empty().append(response);
                    $('select#sviprobulk').select2("destroy");

                    $('div[id^=__wp-uploader]').remove();
                    WOOSVIADM.STARTS.initMediaGal();
                    WOOSVIADM.STARTS.goMediaGallery();
                    WOOSVIADM.STARTS.unblock();
                    $('select#sviprobulk').select2();
                }
            });
        },
        domParser: function (encodedStr) {
            var parser = new DOMParser;
            var dom = parser.parseFromString(
                '<!doctype html><body>' + encodedStr,
                'text/html');
            return dom.body.textContent;
        },
        goMediaGallery: function () {

            $('#addsviprovariation').on('click', function (e) {
                e.preventDefault();
                WOOSVIADM.STARTS.block();
                var $clone = $('div#svipro_clone').clone();
                var $data = $('#sviprobulk').val();
                var $where;
                var textshow;
                var promise = WOOSVIADM.STARTS.esc_html($data);

                promise.success(function ($slug) {

                    $svikey = $('div[id^=svipro_]').size() - 1;

                    if (jQuery.inArray("sviproglobal", $data) >= 0 && $data.length > 1)
                        return;

                    if ($slug !== '' && $('div[data-svigal="' + $slug + '"]').length < 1) {

                        $svikey = $slug != 'svidefault' ? $svikey : $slug;
                        textshow = $data + ' Gallery</span>';

                        $($clone)
                            .attr('id', 'svipro_' + $svikey)
                            .removeClass('hidden')
                            .attr('data-svigal', $slug)
                            .attr('data-svikey', $svikey)
                            .find('h2 span.svititle').html(textshow);

                        $($clone).find('input.svipro-product_image_gallery').attr('name', 'sviproduct_image_gallery[' + $slug + ']');
                        $($clone).hide();

                        switch ($svikey) {
                            default: if ($('#svipro_x').length > 0)
                                $where = '#svipro_x';
                        }

                        if ($where)
                            $($clone).insertAfter($where);
                        else
                            $('#svigallery').prepend($clone);

                        $($clone).fadeIn(1500);
                        $('html, body').animate({
                            scrollTop: $('#svipro_' + $svikey).offset().top - 100
                        }, 500);

                        WOOSVIADM.STARTS.buildMediaGal($slug, $svikey);
                        WOOSVIADM.STARTS.removeMediaGallery($slug, $svikey);
                        WOOSVIADM.STARTS.removeElementMediaGallery($slug, $svikey);
                    }
                    WOOSVIADM.STARTS.unblock();
                });
            });

        },
        initMediaGal: function () {
            $('div[id^=svipro_]').each(function (i, v) {
                WOOSVIADM.STARTS.buildMediaGal($(this).data('svigal'), $(this).data('svikey'));
                WOOSVIADM.STARTS.removeMediaGallery($(this).data('svigal'), $(this).data('svikey'));
                WOOSVIADM.STARTS.removeElementMediaGallery($(this).data('svigal'), $(this).data('svikey'));
            });
        },
        buildMediaGal: function ($slug, $svikey) {
            var product_gallery_frame;
            var $input = $('#svipro_' + $svikey).find('input.svipro-product_image_gallery');
            var $product_images = $('#svipro_' + $svikey).find('ul.product_images');
            var $product_images_woo = $('#product_images_container').find('ul.product_images');

            $('#svipro_' + $svikey).find('.add_product_images_svipro').on('click', 'a', function (event) {
                var $el = $(this);
                //var $input = $(this).closest('.postbox').find('input.svipro-product_image_gallery');
                //var $product_images = $(this).closest('.postbox').find('ul.product_images');

                event.preventDefault();

                // If the media frame already exists, reopen it.
                if (product_gallery_frame) {
                    product_gallery_frame.open();
                    return;
                }

                // Create the media frame.
                product_gallery_frame = wp.media.frames.product_gallery = wp.media({
                    // Set the title of the modal.
                    title: $el.data('choose'),
                    button: {
                        text: $el.data('update')
                    },
                    states: [
                        new wp.media.controller.Library({
                            title: $el.data('choose'),
                            filterable: 'all',
                            multiple: true
                        })
                    ]
                });

                // When an image is selected, run a callback.
                product_gallery_frame.on('select', function () {
                    var selection = product_gallery_frame.state().get('selection');
                    var bulksvi = [];
                    selection.map(function (attachment) {
                        attachment = attachment.toJSON();

                        if (attachment.id && $product_images.find('li.image[data-attachment_id="' + attachment.id + '"]').length < 1) {
                            if ($svikey != 'x')
                                $('#svipro_x').find('ul li.image[data-attachment_id="' + attachment.id + '"]').remove();

                            var attachment_image = attachment.sizes && attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url;

                                var $elm = $('<li class="image" data-attachment_id="' + attachment.id + '"><img src="' + attachment_image + '" /><ul class="actions"><li><a href="#/" class="delete" title="' + $el.data('delete') + '">' + $el.data('text') + '</a></li></ul></li>');
                                $elm.insertBefore($product_images.find('li').last());


                            //$('select#attachments[' + attachment.id + '][woosvi-slug]').val($slug); ??

                            //Add new image to WC product gallery
                            if ($('#product_images_container').find('ul li.image[data-attachment_id="' + attachment.id + '"]').length < 1) {

                                $product_images_woo.append('<li class="image" data-attachment_id="' + attachment.id + '"><img src="' + attachment_image + '" /><ul class="actions"><li><a href="#/" class="delete" title="' + $el.data('delete') + '">' + $el.data('text') + '</a></li></ul></li>');
                            }
                        }
                    });

                    WOOSVIADM.STARTS.updateGal($input, $product_images); //Updates current gallery
                    WOOSVIADM.STARTS.updateGal($('#svipro_x').find('input.svipro-product_image_gallery'), $('#svipro_x')); //UPDATE NULL SVI GALLERY
                    WOOSVIADM.STARTS.updateGal($('input#product_image_gallery'), $('#product_images_container')); //UPDATE MAIN GALLERY
                    WOOSVIADM.STARTS.removeElementMediaGallery($slug, $svikey); //Detect new element for delete

                });


                // Finally, open the modal.
                product_gallery_frame.open();
            });

        },
        removeMediaGallery: function ($slug, $svikey) {
            $('#svipro_' + $svikey).on('click', 'a.sviprobulk_remove', function (event) {
                if (confirm("Delete " + $(this).closest('.postbox').find('h2>span').html() + "?")) {
                    event.preventDefault();
                    var $input = $(this).closest('div.svi-woocommerce-product-images').find('input.svipro-product_image_gallery').val().split(',');

                    $(this).closest('div.svi-woocommerce-product-images').remove();

                    $.each($input, function (i, v) {
                        if ($('#svigallery').find('ul li.image[data-attachment_id="' + v + '"]').length < 1)
                            $('#product_images_container').find('ul li.image[data-attachment_id="' + v + '"]').remove();
                    });

                    WOOSVIADM.STARTS.updateGal($('#product_image_gallery'), $('#product_images_container')); //UPDATE MAIN GALLERY
                }
                return false;
            });

        },
        removeElementMediaGallery: function ($slug, $svikey) {
            // Remove images.
            $('#svipro_' + $svikey).find('li.image').on('click', 'a.delete', function () {
                var att_id = $(this).closest('li.image').attr('data-attachment_id');
                var $product_images = $(this).closest('ul.product_images');
                var $input = $(this).closest('div.svipro-product_images_container').find('input.svipro-product_image_gallery');
                var attachment_ids = [];

                //$('select#attachments[' + att_id + '][woosvi-slug]').val(''); ?? Why is it here?

                $(this).closest('li.image').remove(); // Removes the thumbnail image from gallery

                //START If image not found in SVI Gallery we can remove it from the WC Product Gallery
                if ($('#svigallery').find('ul li.image[data-attachment_id="' + att_id + '"]').length < 1)
                    $('#product_images_container').find('ul li.image[data-attachment_id="' + att_id + '"]').remove();
                //END

                WOOSVIADM.STARTS.updateGal($('input#product_image_gallery'), $('div#product_images_container')); //Updates main gallery
                WOOSVIADM.STARTS.updateGal($input, $product_images); //Updates current gallery

                // Remove any lingering tooltips.
                $('#tiptip_holder').removeAttr('style');
                $('#tiptip_arrow').removeAttr('style');

                return false;
            });

            // Remove images.
            $('#product_images_container').on('click', 'a.delete', function () {
                var attachment_id = $(this).closest('li.image').attr('data-attachment_id');

                var $thumb = $('div#svigallery').find('ul li.image[data-attachment_id="' + attachment_id + '"]');
                $.each($thumb, function () {
                    var $sviblock = $(this).closest('div.svipro-product_images_container');
                    var $input = $sviblock.find('input.svipro-product_image_gallery');
                    $(this).remove();

                    WOOSVIADM.STARTS.updateGal($input, $sviblock); //Updates current gallery
                })
                return false;
            });

        },
        updateUnasignGal: function (attachment_id) {
            var $thumb = $('div#svipro_x').find('ul li.image[data-attachment_id="' + attachment_id + '"]');
            var $sviblock = $thumb.closest('div.svipro-product_images_container');
            var $input = $sviblock.find('input.svipro-product_image_gallery');
            $thumb.remove();

            WOOSVIADM.STARTS.updateGal($input, $sviblock); //Updates current gallery
        },
        updateGal: function ($image_gallery_ids_svi, $product_images) {
            var attachment_ids = [];

            $product_images.find('li.image').each(function () {
                attachment_ids.push($(this).attr('data-attachment_id'));
            });
            var unique = WOOSVIADM.STARTS.onlyUnique(attachment_ids);
            $image_gallery_ids_svi.val(unique.join(','));
        },
        esc_html: function (handleData) {
            return jQuery.ajax({
                url: ajaxurl,
                type: 'POST',
                dataType: 'html',
                data: {
                    action: 'woosvi_esc_html',
                    data: handleData
                }
            });
        },
        onlyUnique: function (ids) {
            var uniqueIds = [];
            $.each(ids, function (i, el) {
                if ($.inArray(el, uniqueIds) === -1) uniqueIds.push(el);
            });
            return uniqueIds;
        },
    }
}(jQuery);
jQuery(document).ready(function () {
    WOOSVIADM.STARTS.init();
});