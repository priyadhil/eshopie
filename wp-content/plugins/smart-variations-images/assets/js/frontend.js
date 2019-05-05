pluginWebpack([0],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_image_vue__ = __webpack_require__(7);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_27160a16_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_image_vue__ = __webpack_require__(22);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(21)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_image_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_27160a16_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_image_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/image.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-27160a16", Component.options)
  } else {
    hotAPI.reload("data-v-27160a16", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_stacked_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_static_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_slider_vue__ = __webpack_require__(29);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
    components: {
        stackedComponent: __WEBPACK_IMPORTED_MODULE_0__components_stacked_vue__["a" /* default */],
        staticComponent: __WEBPACK_IMPORTED_MODULE_1__components_static_vue__["a" /* default */],
        sliderComponent: __WEBPACK_IMPORTED_MODULE_2__components_slider_vue__["a" /* default */]
    },
    mounted: function () {
        if (this.type) {
            // SINGLE PRODUCTS
            if (this.slider) {
                let slider_data = {
                    main: this.images,
                    thumbs: this.images
                };
                this.$bus.$emit("thumbImages_" + $jQsvi(this.$root.$el).data('svidx'), slider_data);
            } else {
                this.$bus.$emit("mainImage_" + $jQsvi(this.$root.$el).data('svidx'), this.images[0]);
                this.$bus.$emit("thumbImages_" + $jQsvi(this.$root.$el).data('svidx'), this.images);
            }
        } else {
            // VARIABLE PRODUCTS
            this.variationBus();
            this.getChosenAttributes();
            this.varitionTriggers();
            this.$bus.$on('variationSwap', imgObj => {
                this.findVariationSwap(imgObj);
            });
        }

        this.$nextTick(function () {
            window.addEventListener('resize', this.getWindowWidth);
            //Init
            this.getWindowWidth();
        });
    },
    computed: {
        form: function () {
            return this.findSummary();
        },
        attributeFields: function () {
            return this.form.find(".variations select");
        },
        singleVariation: function () {
            return this.form.find(".single_variation");
        },
        resetVariations: function () {
            return this.form.find(".reset_variations");
        },
        variationData: function () {
            return this.form.data("product_variations");
        },
        sviflex() {
            var thumbpos;
            if (wcsvi.data.position == "1") thumbpos = " sviflex-l";
            if (wcsvi.data.position == "2") thumbpos = " sviflex-r";

            return wcsvi.data.position == "0" ? "svi-horizontal" : "sviflex" + thumbpos;
        }

    },
    props: ["data"],
    name: 'SVI',
    data: function () {
        this.data.slider = wcsvi.data.slider;
        this.data.stacked = wcsvi.data.stacked;
        this.data.template = 'svi-' + wcsvi.data.template;
        this.data.neutral = false;
        //this.data.custom_class = wcsvi.data.custom_class;
        this.data.attributes = {};
        this.data.active_class = 'svi-loaded';

        this.data.lightbox = wcsvi.data.lightbox;
        this.data.lightbox_icon = wcsvi.data.lightbox_icon;
        this.data.lightbox_iconcolor = {
            color: wcsvi.data.lightbox_iconcolor
        };
        this.disable_thumb = wcsvi.data.disable_thumb;
        this.thumbImages = false;
        this.data.neutral = false;
        this.data.windowType = 'desktop';
        return this.data;
    },
    methods: {
        findSummary() {
            let $count = 0;
            let $variations_form;
            let $obj = $jQsvi(this.$el).parent();

            while ($count < 1) {
                if ($obj.parent().find(".variations_form").length > 0) {
                    $count++;
                    $variations_form = $obj.parent().find(".variations_form");
                } else {
                    $obj = $obj.parent();
                }
            }

            return $variations_form;
        },
        getWindowWidth(event) {
            if (document.documentElement.clientWidth < 768) this.windowType = 'mobile';
            if (document.documentElement.clientWidth >= 768) this.windowType = 'desktop';
        },
        removeDups: function ($obj) {
            var $arr = {};
            var $return = [];
            $jQsvi.each($obj, function (i, v) {
                $arr["x" + v.id] = v;
            });
            $jQsvi.each($arr, function (i, v) {
                $return.push(v);
            });

            return $return;
        },
        findVariationSwap: function (imgObj) {

            var selected = [];

            $jQsvi.each(this.attributeFields, function (i, v) {
                if ($jQsvi(this).val()) selected.push($jQsvi(this).val());
            });

            if (!wcsvi.data.keep_thumbnails && selected.length > 0 && wcsvi.data.swselect) return; //If attributes already seleted and image may be present in other attributes dont run again.

            var $svislugs = $jQsvi.map(this.woosvislug, (i, v) => {
                return $jQsvi.map(Object.keys(i), (i2, v2) => {
                    if (i2 == 'x' + imgObj.id) return v;
                });
            });

            if ($svislugs.length > 0) this.triggerVariationSwap($svislugs);
        },
        triggerVariationSwap: function ($svislugs) {
            let _this = this;
            $jQsvi.each($svislugs, function (i, slug) {
                let _slug = slug.split("_svipro_");
                _this.attributeFields.map(function (i3, select) {
                    $jQsvi.each(_slug, function (i2, v) {
                        $jQsvi(select).find("option").map(function (selIndex, option) {
                            if (option.value.toLowerCase().replace(/\s/g, '') == v.toLowerCase().replace(/\s/g, '') && !$jQsvi(option).is(':selected')) {
                                $jQsvi(select).val(option.value).trigger("change");
                            }
                        });
                    });
                });
            });
        },
        photo: function () {
            if (this.slider) $jQsvi(this.$el).find('.gallery-top .swiper-slide-active .sviLigthgallery-trigger').unbind('click').trigger('click');else //#endregion
                $jQsvi(this.$el).find('.sviLigthgallery-trigger').unbind('click').trigger('click');
        },
        getTheImages: function (svislugs) {
            return $jQsvi.map(svislugs, slug => {
                if (slug in this.woosvislug) {
                    return $jQsvi.map(this.woosvislug[slug], (v2, i2) => {
                        return $jQsvi.map(this.images, (value, index) => {
                            if (Number(value.id) == i2.match(/\d+/g).map(Number)) {
                                if (v2.video) value.video = v2.video;
                                return value;
                            }
                        });
                    });
                }
            });
        },
        variationBus: function () {
            this.$bus.$on('svislugs_' + $jQsvi(this.$root.$el).data('svidx'), svislugs => {
                if (svislugs == undefined || svislugs.length < 1 || this.woosvislug.length < 1) {
                    if (this.slider) {
                        let slider_data = {
                            main: this.images,
                            thumbs: this.images
                        };
                        this.$bus.$emit("thumbImages_" + $jQsvi(this.$root.$el).data('svidx'), slider_data);
                    } else {
                        this.$bus.$emit("mainImage_" + $jQsvi(this.$root.$el).data('svidx'), this.images[0]);
                        this.$bus.$emit("thumbImages_" + $jQsvi(this.$root.$el).data('svidx'), this.images);
                    }
                    this.thumbImages = this.images;
                } else {
                    var $thumbs = this.getTheImages(svislugs);

                    if (this.thumbImages && this.isEquivalent(this.thumbImages, $thumbs)) {
                        if (wcsvi.data.keep_thumbnails) {
                            if (this.woosvislug[this.attributes.chosenAttribute]) {
                                this.$bus.$emit("triggerImage_" + $jQsvi(this.$root.$el).data('svidx'), Object.keys(this.woosvislug[this.attributes.chosenAttribute])[0]);
                            }
                        }
                        return;
                    }

                    if ($thumbs.length < 1) {
                        //Check if Default Gallery exist
                        svislugs = [];
                        svislugs.push("svidefault");
                        $thumbs = this.getTheImages(svislugs);
                    }

                    if ($thumbs.length > 0) {
                        $thumbs = this.removeDups($thumbs); //PREVENT DUPLICATE KEY for handling

                        if (this.slider) {
                            let slider_data = {
                                main: $thumbs,
                                thumbs: $thumbs
                            };
                            this.$bus.$emit("thumbImages_" + $jQsvi(this.$root.$el).data('svidx'), slider_data);
                        } else {
                            this.$bus.$emit("mainImage_" + $jQsvi(this.$root.$el).data('svidx'), $thumbs[0]);
                            this.$bus.$emit("thumbImages_" + $jQsvi(this.$root.$el).data('svidx'), $thumbs);
                        }
                        this.thumbImages = $thumbs;
                    } else {
                        if (this.slider) {
                            let slider_data = {
                                main: this.images
                            };

                            if (svislugs.length <= 1 && wcsvi.data.hidden_thumb) {
                                slider_data.thumbs = [];
                                this.$bus.$emit("thumbImages_" + $jQsvi(this.$root.$el).data('svidx'), slider_data);
                                this.thumbImages = $thumbs;
                            }

                            if (!wcsvi.data.hidden_thumb) {
                                //If hidden thumbs active
                                slider_data.thumbs = this.images;
                                this.$bus.$emit("thumbImages_" + $jQsvi(this.$root.$el).data('svidx'), slider_data);
                                this.thumbImages = $thumbs;
                            }
                        } else {
                            this.$bus.$emit("mainImage_" + $jQsvi(this.$root.$el).data('svidx'), this.images[0]);

                            if (svislugs.length <= 1 && wcsvi.data.hidden_thumb) {

                                this.$bus.$emit("thumbImages_" + $jQsvi(this.$root.$el).data('svidx'), []);
                                this.thumbImages = $thumbs;
                            }

                            if (!wcsvi.data.hidden_thumb) {
                                //If hidden thumbs active
                                this.$bus.$emit("thumbImages_" + $jQsvi(this.$root.$el).data('svidx'), this.images);
                                this.thumbImages = $thumbs;
                            }
                        }
                    }
                }
            });
        },
        varitionTriggers: function () {
            this.form.on('change', '.variations select', {
                variationForm: this
            }, this.getChosenAttributes);
        },
        getChosenAttributes: function () {
            var data = {};
            var count = 0;
            var chosen = 0;

            this.attributeFields.each(function (i, v) {
                var name = $jQsvi(v).attr("id");
                var value = $jQsvi(this).val().replace(/ /g, "").toLowerCase() || "";

                if (value.length > 0) {
                    chosen++;
                }

                count++;
                // data[ attribute_name ] = value;
                if (value) data[name] = value;
            });

            if (!wcsvi.data.swselect) {
                // IF SELECT SWAP TRUE THAN TRIGGER ON ALL CHANGES
                if (chosen < count) data = false;
            }

            this.attributes = {
                count: count,
                chosenCount: chosen,
                data: data,
                chosenAttribute: this.triggerImageChange(data)
            };
            this.getCombinations();
        },
        getCombinations: function ($empty_results = false) {
            var result = [];
            if (!wcsvi.data.keep_thumbnails) {
                var obj = this.attributes.data ? this.attributes.data : {};

                if (!$empty_results && Object.keys(obj).length > 0) {
                    var arr = Object.keys(obj).map(function (key) {
                        return obj[key];
                    });
                    if (wcsvi.data.triger_match && arr.length > 1) {
                        var combo = arr.join('_svipro_');
                        result.push(combo);
                    } else {
                        if (arr.length > 0) {
                            var f = function (prefix, arr) {
                                for (var i = 0; i < arr.length; i++) {
                                    if (prefix) {
                                        result.push(prefix + "_svipro_" + arr[i]);
                                        f(prefix + "_svipro_" + arr[i], arr.slice(i + 1));
                                    } else {
                                        result.push(prefix + arr[i]);

                                        f(prefix + arr[i], arr.slice(i + 1));
                                    }
                                }
                            };
                            f("", arr);
                        }
                    }
                }

                if (result.length < 1) {
                    result.unshift("svidefault");
                } else {
                    result.push("sviproglobal");
                }
            } else {
                if (wcsvi.data.keep_thumbnails_option == 'svidefault') result.unshift("svidefault");
            }

            this.$bus.$emit("svislugs_" + $jQsvi(this.$root.$el).data('svidx'), result);
            return result;
        },
        triggerImageChange(data) {
            let $data = Object.keys(data).map((i, v) => {
                return data[i];
            }).join("_svipro_");
            return $data;
        }

    }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__image_vue__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    props: ["disable_thumb"],
    components: {
        imageComponent: __WEBPACK_IMPORTED_MODULE_0__image_vue__["a" /* default */]
    },
    name: 'StaticComponent',
    mounted: function () {
        this.$bus.$on('thumbImages_' + $jQsvi(this.$root.$el).data('svidx'), thumbImages => {
            this.thumbs = thumbImages;
        });

        if (wcsvi.data.sticky) {
            $jQsvi('.product-summary').wrapInner(function () {
                return '<div class="stickysvi" style="top:' + wcsvi.data.sticky_margin + 'px;"></div>';
            });
        }
    },
    data() {
        return {
            image: '',
            mainImage: '',
            thumbs: '',
            thumbnailsPostion: wcsvi.data.position
        };
    },
    methods: {}
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name: "imageComponent",
    props: ["data", "type", "imgobj", "prethumbs", "index", "stacked"],
    mounted: function () {

        this.$bus.$on('thumbImages_' + $jQsvi(this.$root.$el).data('svidx'), thumbImages => {
            let images = thumbImages;

            if (this.slider) images = thumbImages.main;

            this.items = {
                box: this.lightbox_prep(images),
                slider: images
            };
        });
        this.$bus.$on('triggerImage_' + $jQsvi(this.$root.$el).data('svidx'), imageChange => {
            if (imageChange == this.imgX) {
                if (this.slider && this.type != 'thumb') this.triggerSliderChange();else if (!this.slider && this.type == 'thumb') this.triggerChange();
            }
        });
        if (this.prethumbs) {
            this.items = {
                box: this.lightbox_prep(this.prethumbs),
                slider: this.prethumbs
            };
        }
        if (this.stacked) {

            this.items = {
                box: this.lightbox_prep(this.prethumbs),
                slider: this.prethumbs
            };
        }
    },
    computed: {
        photoSwipeOptions: function () {
            return {
                closeEl: wcsvi.data.lightbox_close ? true : false,
                captionEl: wcsvi.data.lightbox_title ? true : false,
                fullscreenEl: wcsvi.data.lightbox_fullScreen ? true : false,
                zoomEl: wcsvi.data.lightbox_zoom ? true : false,
                shareEl: wcsvi.data.lightbox_share ? true : false,
                counterEl: wcsvi.data.lightbox_counter ? true : false,
                arrowEl: wcsvi.data.lightbox_controls ? true : false,
                preloaderEl: true
            };
        },
        zoom: function () {
            return this.data.full_image;
        },
        image_src: function () {
            return this.data.src;
        },
        image_class: function () {
            return this.data.class;
        },
        image_alt: function () {
            return this.data.alt ? this.data.alt : "";
        },
        image_title: function () {
            return this.data.title ? this.data.title : "";
        },
        woosvislug: function () {
            return this.data.woosvislug ? this.data.woosvislug : "";
        },
        image_svikey: function () {
            return ""; //this.skey;
        },
        image_srcset: function () {
            return this.data.srcset ? this.data.srcset : "";
        },
        image_sizes: function () {
            return this.data.sizes ? this.data.sizes : "";
        },
        image_width: function () {
            if (this.type == 'thumb') return this.imgobj.thumb.thumb_image_width ? this.imgobj.thumb.thumb_image_width : "";else return this.data.width ? this.data.width : "";
        },
        image_height: function () {
            if (this.type == 'thumb') return this.imgobj.thumb.thumb_image_height ? this.imgobj.thumb.thumb_image_height : "";else return this.data.height ? this.data.height : "";
        },
        image_class: function () {
            return this.data.class ? this.data.class : "";
        },
        title: function () {
            return wcsvi.data.imagecaption ? wcsvi.data.imagecaption == 'caption' ? this.data.caption : this.data.title : false;
        },
        imgX: function () {
            return 'x' + this.imgobj.id;
        }
    },
    data: function () {
        return {
            lens: wcsvi.data.lens,
            items: [],
            lightbox: wcsvi.data.lightbox,
            lightbox_icon: wcsvi.data.lightbox_icon,
            sviactive: wcsvi.data.thumbnails_showactive,
            slider: wcsvi.data.slider,
            lightbox_iconcolor: {
                color: wcsvi.data.lightbox_iconcolor
            }
        };
    },
    methods: {
        possibleActions: function ($evt) {
            if (wcsvi.data.variation_swap) this.$bus.$emit("variationSwap", this.imgobj);
            if (wcsvi.data.thumbnails_showactive) {
                $jQsvi('img.sviactive').removeClass('sviactive');
                $jQsvi(this.$el).find('img').addClass('sviactive');
            }
        },
        photo: function ($event) {
            if (!wcsvi.data.lightbox) return;

            if (wcsvi.data.lightbox_iconclick && $event.target.tagName == 'IMG') //ACTIVA LIGTHBOX SOMENTE NO ICON
                return;

            var options = this.photoSwipeOptions;

            options.index = this.findIndex()[0];
            this.$photoswipe.open(this.findIndex()[0], this.items, wcsvi.data.lightbox_thumbnails, options, this.$photoswipe);
        },
        findIndex: function () {
            var _this = this;

            return $jQsvi.map(this.items.box, (v, i) => {
                if (_this.imgobj.single.full_image == v.src) {
                    return i;
                }
            });
        },
        lightbox_prep: function (thumbImages) {
            var items = [];
            $jQsvi.each(thumbImages, (i, v) => {
                items.push({
                    src: v.single.full_image,
                    msrc: v.single.thumb_image,
                    w: v.single.full_image_width,
                    h: v.single.full_image_height,
                    title: v.single.title // optional alt attribute for thumbnail image
                });
            });
            return items;
        },
        triggerChange: function (el) {
            if (this.type == "thumb" && !this.slider) this.$bus.$emit("mainImage_" + $jQsvi(this.$root.$el).data('svidx'), this.imgobj);
        },
        triggerSliderChange() {
            if (this.$parent.mswiper.activeIndex != this.index) this.$parent.mswiper.slideTo(this.index);
        }
    }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__image_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thumbnails_vue__ = __webpack_require__(9);
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
    props: ["disable_thumb"],
    components: {
        imageComponent: __WEBPACK_IMPORTED_MODULE_0__image_vue__["a" /* default */],
        thumbnailsComponent: __WEBPACK_IMPORTED_MODULE_1__thumbnails_vue__["a" /* default */]
    },
    name: 'StaticComponent',
    mounted: function () {
        this.$bus.$on('mainImage_' + $jQsvi(this.$root.$el).data('svidx'), mainImage => {
            this.mainImage = mainImage.single;
            this.image = mainImage;
        });
        this.$bus.$on('thumbImages_' + $jQsvi(this.$root.$el).data('svidx'), thumbImages => {
            this.thumbs = thumbImages;
        });
    },
    data() {
        return {
            image: '',
            mainImage: '',
            thumbs: '',
            thumbnailsPostion: wcsvi.data.position
        };
    }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_thumbnails_vue__ = __webpack_require__(10);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_76399e5c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_thumbnails_vue__ = __webpack_require__(27);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(26)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-76399e5c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_thumbnails_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_76399e5c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_thumbnails_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/thumbnails.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-76399e5c", Component.options)
  } else {
    hotAPI.reload("data-v-76399e5c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__image_vue__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
    components: {
        imageComponent: __WEBPACK_IMPORTED_MODULE_0__image_vue__["a" /* default */]
    },
    name: 'ThumbnailComponent',
    props: ["data", "stacked"],
    data() {
        return {
            columns: this.stacked ? 1 : wcsvi.data.columns
        };
    },
    methods: {
        colposition: function (index) {
            var skey = Number(index);
            var $classes = [""];
            if (skey === 0 || skey % this.columns === 0) {
                $classes.push("first");
            }

            if ((skey + 1) % this.columns === 0) {
                $classes.push("last");
            }

            return $classes.join(" ");
        }
    }
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__image_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thumbnails_vue__ = __webpack_require__(9);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  props: ["disable_thumb"],

  components: {
    imageComponent: __WEBPACK_IMPORTED_MODULE_0__image_vue__["a" /* default */],
    thumbnailsComponent: __WEBPACK_IMPORTED_MODULE_1__thumbnails_vue__["a" /* default */]
  },
  name: "SliderComponent",
  render: function (createElement, context) {
    // ...
  },
  methods: {
    testPhoto($evt) {
      if (!wcsvi.data.lightbox || !wcsvi.data.lens) return;

      if ($evt && ($evt.target.className == 'zoomLens' || $evt.target.className == 'zoomWindow')) $jQsvi(this.$el).find('.gallery-top .swiper-slide-active img').unbind('click').trigger('click');
    },
    onReady(e, v) {
      var handle = setInterval(() => {
        if ($jQsvi(this.$el).find(".gallery-top .swiper-slide").length > 0 && Object.keys(this.mainImage).length == $jQsvi(this.$el).find(".gallery-top .swiper-slide").length) {
          this.waitLoad();
          clearInterval(handle);
        }
      }, 15);
    },
    waitLoad() {
      var _this = this;
      var $images = $jQsvi(this.$el).find(".gallery-top img");
      var loaded_images_count = 0;

      $images.load(() => {}).each(function (i, v) {
        loaded_images_count++;
        if (loaded_images_count == Object.keys(_this.mainImage).length) {
          setTimeout(() => {
            _this.runSwipperUpdate();
          }, 200);
        }
      });
    },
    runSwipperUpdate() {
      this.mswiper.slideTo(0);
      this.activeIndex = 0;
      if (this.tswiper) {
        if (wcsvi.data.position > 0) {
          this.resizeThumbs();
        } else {
          this.tswiper.update();
        }
      }
      setTimeout(() => {
        $jQsvi(this.$el).fadeIn();
        this.mswiper.update();
        this.$forceUpdate(); //Importante para detectar mudança de imagem na Lens e carregar imagem correcta
      }, 100);
    },
    resizeThumbs: function () {
      var maxHeight = 0;
      var handle = setInterval(() => {
        if ($jQsvi(this.$el).find(".gallery-top").height() > 100) {
          $jQsvi(this.$el).find(".gallery-top img").each(function () {
            var h = $jQsvi(this).height();
            if (h > maxHeight) {
              maxHeight = h;
            }
          });
          if (maxHeight) {
            $jQsvi(this.$el).find("div.gallery-thumbs").attr("style", "height:" + parseInt(maxHeight) + "px!important;overflow:hidden;");
          }
          this.tswiper.update();
          clearInterval(handle);
        }
      }, 15);
    },
    onSlideChange() {
      this.$forceUpdate(); //Importante para detectar mudança de imagem na Lens e carregar imagem correcta
    },
    transitionEnd() {
      this.activeIndex = this.tswiper.realIndex;
    }
  },
  mounted: function () {

    let swiperOptionThumbs = {
      spaceBetween: 10,
      touchRatio: 0.2,
      slidesPerView: wcsvi.data.position == 0 ? parseInt(wcsvi.data.columns) : 4, //auto    
      centeredSlides: true,
      slideToClickedSlide: true,
      direction: wcsvi.data.position == 0 ? 'horizontal' : 'vertical',
      autoHeight: false,
      on: {
        init: () => {
          setTimeout(() => {
            this.onReady();
          }, 100);
        },
        transitionStart: () => {
          this.transitionEnd();
        }
      },
      navigation: {
        nextEl: ".swiperThumbs-swiper-button-next",
        prevEl: ".swiperThumbs-swiper-button-prev"
      }
    };

    let swiperOptionTop = {
      freeModeSticky: true,
      effect: wcsvi.data.slider_effect, //cube,fade,coverflow,flip
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiperTop-swiper-button-next",
        prevEl: ".swiperTop-swiper-button-prev"
      },
      autoHeight: wcsvi.data.slider_effect == 'cube' ? false : true, //TER QUE VER era FALSE
      pagination: {
        el: ".sviswiper-pagination",
        dynamicBullets: wcsvi.data.slider_paginationDynamicBullets,
        type: wcsvi.data.slider_paginationType,
        clickable: wcsvi.data.slider_paginationclickable
      },
      autoplay: wcsvi.data.slider_autoslide ? {
        delay: wcsvi.data.slider_autoslide_ms
      } : wcsvi.data.slider_autoslide,
      on: {
        touchEnd: e => {
          this.testPhoto(e);
        },
        slideChange: () => {
          this.onSlideChange();
        }
      }
    };

    if (wcsvi.data.position > 0) {
      swiperOptionThumbs.centeredSlides = wcsvi.data.slider_center;
    }

    if (!this.disable_thumb) this.tswiper = new Swiper($jQsvi(this.$el).find(".gallery-thumbs"), swiperOptionThumbs);

    if (wcsvi.data.position > 0 && !this.disable_thumb) {
      swiperOptionTop.thumbs = {
        swiper: this.tswiper
      };
    }

    this.mswiper = new Swiper($jQsvi(this.$el).find(".gallery-top"), swiperOptionTop);

    this.$bus.$on("thumbImages_" + $jQsvi(this.$root.$el).data('svidx'), thumbImages => {
      $jQsvi(this.$el).fadeOut('fast', () => {
        this.mainImage = thumbImages.main;
        this.thumbs = thumbImages.thumbs;
        this.onReady();
      });
    });

    if (wcsvi.data.position == 0) {
      this.$nextTick(() => {
        if (this.tswiper && !this.disable_thumb) {
          this.mswiper.controller.control = this.tswiper;
          this.tswiper.controller.control = this.mswiper;
        }
      });
    }
  },
  data() {
    let url_prev = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23" + wcsvi.data.slider_navigation_color.replace('#', '') + "'%2F%3E%3C%2Fsvg%3E";
    url_prev = url_prev.replace(/'/g, "\\'");
    let url_next = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23" + wcsvi.data.slider_navigation_color.replace('#', '') + "'%2F%3E%3C%2Fsvg%3E";
    url_next = url_next.replace(/'/g, "\\'");

    return {
      activeIndex: 0,
      mswiper: false,
      tswiper: false,
      title: false,
      clicked: false,
      image: "",
      mainImage: "",
      thumbs: "",
      main: false,
      child: false,
      slider_pagination_color: {
        color: wcsvi.data.slider_pagination_color
      },
      slider_pagination: wcsvi.data.slider_pagination,
      slider_navigation: wcsvi.data.slider_navigation,
      slider_navigation_thumb: wcsvi.data.slider_navigation_thumb,
      slider_navcolor: wcsvi.data.slider_navcolor,
      slider_navigation_color_prev: {
        'background-image': "url(" + url_next + ")!important"
      },
      slider_navigation_color_next: {
        'background-image': "url(" + url_prev + ")!important"
      },
      position: wcsvi.data.slider_center
    };
  }
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    data: function () {
        return {
            thumbnails: false,
            items: [],
            up: 'down',
            mswiper: false,
            photoEl: false
        };
    },
    mounted: function () {},
    methods: {
        open(index, items, thumbnails, options, $photoEl) {
            let _this = this;
            this.thumbnails = thumbnails;
            this.items = items;
            this.photoswipe = new PhotoSwipe(this.$el, PhotoSwipeUI_Default, items.box, options);
            this.photoswipe.init();
            this.photoEl = $photoEl;
            var handle_visible = setInterval(function () {

                if ($jQsvi('.pswp').is(":visible")) {
                    if (wcsvi.data.lightbox_thumbnails) {
                        var handle_slidervisible = setInterval(function () {
                            if ($jQsvi('.gallery-pswp img').length >= Object.keys(_this.items.slider).length) {
                                _this.waitLoad();
                                clearInterval(handle_slidervisible);
                            }
                        }, 5);
                    } else {
                        _this.photoswipe.listen('close', () => {
                            _this.close();
                        });
                    }
                    clearInterval(handle_visible);
                }
            }, 5);
        },
        onSlideChange() {
            this.photoswipe.goTo(this.mswiper.activeIndex);
        },
        initSlider() {
            let _this = this;
            var swiperOptionTop = {
                slidesPerView: 'auto',
                spaceBetween: 10,
                centeredSlides: true,
                slideToClickedSlide: true,
                watchSlidesVisibility: true,
                observer: true,
                on: {
                    init: function () {},
                    slideChange: function () {
                        _this.onSlideChange();
                    },
                    imagesReady: function () {
                        $jQsvi('.togglehidesvi').slideDown();
                        _this.initClick();
                    }
                },
                breakpoints: {
                    // when window width is <= 320px
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    // when window width is <= 480px
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    // when window width is <= 640px
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                }
            };
            if (typeof Swiper !== "undefined") _this.mswiper = new Swiper($jQsvi(".gallery-pswp"), swiperOptionTop);
        },
        initClick() {
            setTimeout(() => {
                this.mswiper.update();
            }, 300);
            var _this = this;
            var slider = $jQsvi('.gallery-pswp');
            var slide = $jQsvi("div.gallery-pswp .swiper-slide");

            var theEl = $jQsvi("div.gallery-pswp .swiper-slide").eq(this.photoswipe.getCurrentIndex());

            theEl.addClass('svifaded');

            this.photoswipe.listen('afterChange', function () {
                $jQsvi('div.gallery-pswp .swiper-slide').removeClass("svifaded");
                _this.mswiper.slideTo(_this.photoswipe.getCurrentIndex());
                $jQsvi("div.gallery-pswp .swiper-slide").eq(_this.photoswipe.getCurrentIndex()).addClass('svifaded');
            });

            this.photoswipe.listen('close', function () {
                $jQsvi('.flexslider-svi').fadeOut();
                $jQsvi('div.gallery-pswp .swiper-slide').removeClass("svifaded");
                _this.close();
            });

            var handle_visible = setInterval(function () {
                if (_this.mswiper) {
                    _this.mswiper.slideTo(_this.photoswipe.getCurrentIndex());
                    clearInterval(handle_visible);
                    setTimeout(() => {
                        $jQsvi('.flexslider-svi').fadeIn();
                    }, 150);
                }
            }, 5);

            slider.slideDown();
            $jQsvi('.togglehidesvi').slideDown();
        },
        toggle() {
            var slider = $jQsvi('div.gallery-pswp');
            if (this.up = 'down') this.up = 'up';else this.up = 'down';
            slider.toggle();
        },
        close() {
            if (this.mswiper) this.mswiper.destroy();
            this.photoEl.close();
        },
        waitLoad() {
            var _this = this;
            var $images = $jQsvi("div.gallery-pswp img");
            var loaded_images_count = 0;

            $images.load(() => {}).each(function (i, v) {
                loaded_images_count++;
                if (loaded_images_count == Object.keys(_this.items.slider).length) {
                    setTimeout(() => {
                        _this.initSlider();
                    }, 100);
                }
            });
        }
    }
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _Svi = __webpack_require__(16);

var _Svi2 = _interopRequireDefault(_Svi);

var _PhotoSwipe = __webpack_require__(33);

var _PhotoSwipe2 = _interopRequireDefault(_PhotoSwipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.productionTip = false;

window.jQuery = window.$jQsvi = jQuery;

//if ($jQsvi('.svi-vue-frontend-app').length < 1)
//   throw new Error('Yeah... Sorry, no SVI PRO running here.');

if (wcsvi.data.lightbox) {
    var $vm = void 0;

    var PhotoSwipe = _vue2.default.extend(_PhotoSwipe2.default);

    if (!$vm) {
        $vm = new PhotoSwipe({
            el: document.createElement('div')
        });
        //
    }

    _vue2.default.$photoswipe = {
        open: function open(index, items, thumbnails, options, $photoEl) {
            document.body.appendChild($vm.$el);
            $vm.open(index, items, thumbnails, options, $photoEl);
        },
        close: function close() {
            $jQsvi($vm.$el).remove();
        }
    };

    _vue2.default.mixin({
        created: function created() {
            this.$photoswipe = _vue2.default.$photoswipe;
        }
    });
}

_vue2.default.prototype.$bus = new _vue2.default();

var lensoptions = {
    zoomContainerAppendTo: '.woosvi_strap',
    container: 'sviZoomContainer',
    cursor: 'pointer',
    attrImageZoomSrc: 'svizoom-image',
    galleryActiveClass: 'active',
    containLensZoom: wcsvi.data.lens_containlenszoom,
    borderColour: wcsvi.data.lens_border,
    lensBorderSize: wcsvi.data.lens_lensBorder,
    lensShape: wcsvi.data.lens_type ? wcsvi.data.lens_type : 'round',
    lensSize: wcsvi.data.lens_size ? wcsvi.data.lens_size : 125,
    zoomType: wcsvi.data.lens_zoomtype ? wcsvi.data.lens_zoomtype : 'lens',
    easing: wcsvi.data.lens_easing,
    scrollZoom: wcsvi.data.lens_scrollzoom,
    lensFadeIn: wcsvi.data.lens_lensFadeIn ? wcsvi.data.lens_lensFadeIn : false,
    zoomWindowFadeIn: wcsvi.data.lens_zoomWindowFadeIn ? wcsvi.data.lens_zoomWindowFadeIn : false,
    zIndex: wcsvi.data.lens_zIndex,
    zoomWindowWidth: wcsvi.data.lens_zoomWindowWidth ? wcsvi.data.lens_zoomWindowWidth : 400,
    zoomWindowHeight: wcsvi.data.lens_zoomWindowHeight ? wcsvi.data.lens_zoomWindowHeight : 400,
    zoomWindowPosition: wcsvi.data.rtl ? 11 : 1
};

_vue2.default.directive('ezPlus', {

    update: function update(el, binding, vnode) {
        if (!wcsvi.data.lens) return;
        $jQsvi("div.sviZoomContainer").remove();
        $jQsvi(el).ezPlus(lensoptions);
    }

});

_vue2.default.directive('ezPlusStacked', {
    bind: function bind(el, binding, vnode) {
        if (!wcsvi.data.lens) return;

        var stacklensoptions = lensoptions;
        //delete stacklensoptions.zoomContainerAppendTo;
        stacklensoptions.container = 'sviStackedZoomContainer';

        var handle = setInterval(function () {
            if ($jQsvi('#' + el.id).length > 0) {

                $jQsvi('#' + el.id).mouseover(function () {
                    $jQsvi('#' + el.id).ezPlus(stacklensoptions);
                });
                clearInterval(handle);
            }
        }, 15);
    }
});

_vue2.default.directive('ezPlusSlider', {
    componentUpdated: function componentUpdated(el, binding, vnode) {
        if (!wcsvi.data.lens) return;

        lensoptions.zoomContainerAppendTo = '.woosvi_strap .gallery-top';
        lensoptions.zIndex = 9;

        $jQsvi("div.zoomContainer,div.zoomWindowContainer").remove();
        if (el.className == 'swiper-slide swiper-slide-active') {
            $jQsvi(el).ezPlus(lensoptions);
            if (wcsvi.data.lens_zoomtype == 'window') {
                var refreshId = setInterval(function () {
                    if ($jQsvi("div.sviZoomContainer div.zoomWindowContainer").length > 0) {
                        $jQsvi("div.sviZoomContainer div.zoomWindowContainer").detach().appendTo(".woosvi_strap");
                        clearInterval(refreshId);
                    }
                }, 10);
            }
        }
    },
    // When the bound element is inserted into the DOM...
    bind: function bind(el) {
        if (!wcsvi.data.lens) return;

        lensoptions.zoomContainerAppendTo = '.woosvi_strap .gallery-top';
        lensoptions.zIndex = 9;

        if (el.className == 'swiper-slide swiper-slide-active') {
            $jQsvi(el).ezPlus(lensoptions);
            if (wcsvi.data.lens_zoomtype == 'window') {
                var refreshId = setInterval(function () {
                    if ($jQsvi("div.sviZoomContainer div.zoomWindowContainer").length > 0) {
                        $jQsvi("div.sviZoomContainer div.zoomWindowContainer").detach().appendTo(".woosvi_strap");
                        clearInterval(refreshId);
                    }
                }, 10);
            }
        }
    }
});

_vue2.default.prototype.isEquivalent = function (a, b) {
    // Create arrays of property names
    if (JSON.stringify(a) === JSON.stringify(b)) return true;

    // If we made it this far, objects
    // are considered equivalent
    return false;
};

if ($jQsvi('.svi-vue-frontend-app').length > 0) {
    //   throw new Error('Yeah... Sorry, no SVI PRO running here.');
    $jQsvi.each($jQsvi('.svi-vue-frontend-app'), function (i, v) {
        var svidata = $jQsvi(this).parent().data('svi');
        svidata.idx = i;
        new _vue2.default({
            el: this,
            render: function render(h) {
                return h(_Svi2.default, {
                    props: {
                        data: svidata
                    }
                });
            }
        });
    });
}
$jQsvi(document).ajaxComplete(function (ix, vx, cx) {
    if ($jQsvi('.svi-woocommerce-product-gallery').length > 0) {
        $jQsvi('.woocommerce-product-gallery:not(.svi-woocommerce-product-gallery)').hide();
        $jQsvi('.whitespacesvi').not(':first').remove();
        $jQsvi('.svi-woocommerce-product-gallery').not(':first').remove();

        $jQsvi.each($jQsvi('.svi-vue-frontend-app'), function (i, v) {
            var svidata = $jQsvi(this).parent().data('svi');
            svidata.idx = i;
            new _vue2.default({
                el: this,
                render: function render(h) {
                    return h(_Svi2.default, {
                        props: {
                            data: svidata
                        }
                    });
                }
            });
        });
    }
});

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Svi_vue__ = __webpack_require__(5);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_911a9dfc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Svi_vue__ = __webpack_require__(32);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(17)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Svi_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_911a9dfc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Svi_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/Svi.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-911a9dfc", Component.options)
  } else {
    hotAPI.reload("data-v-911a9dfc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_stacked_vue__ = __webpack_require__(6);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_334a8b22_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_stacked_vue__ = __webpack_require__(23);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(20)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-334a8b22"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_stacked_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_334a8b22_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_stacked_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/stacked.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-334a8b22", Component.options)
  } else {
    hotAPI.reload("data-v-334a8b22", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { class: [this.type == "thumb" ? "svi-thumb" : "svi-mainsection"] },
    [
      this.type == "thumb"
        ? [
            _c("img", {
              class: [
                _vm.image_class,
                _vm.index == 0 && _vm.sviactive ? "sviactive" : ""
              ],
              attrs: {
                src: _vm.image_src,
                alt: _vm.image_alt,
                width: _vm.image_width,
                height: _vm.image_height
              },
              on: {
                click: [
                  function($event) {
                    _vm.triggerChange()
                  },
                  function($event) {
                    _vm.possibleActions($event)
                  }
                ]
              }
            })
          ]
        : [
            _vm.lightbox && _vm.lightbox_icon && !_vm.stacked
              ? _c("span", {
                  staticClass: "sviLigthgallery-trigger",
                  on: {
                    click: function($event) {
                      _vm.photo($event)
                    }
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            !_vm.stacked
              ? _c("img", {
                  directives: [{ name: "ezPlus", rawName: "v-ezPlus" }],
                  class: [_vm.image_class, "preview-img-item"],
                  attrs: {
                    src: _vm.image_src,
                    alt: _vm.image_alt,
                    width: _vm.image_width,
                    height: _vm.image_height,
                    "data-svizoom-image": _vm.zoom
                  },
                  on: {
                    click: [
                      function($event) {
                        _vm.triggerChange()
                      },
                      function($event) {
                        _vm.photo($event)
                      }
                    ]
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.lightbox && _vm.lightbox_icon && _vm.stacked
              ? _c("span", {
                  staticClass: "sviLigthgallery",
                  style: _vm.lightbox_iconcolor,
                  on: {
                    click: function($event) {
                      _vm.photo($event)
                    }
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.stacked
              ? _c("img", {
                  directives: [
                    { name: "ezPlusStacked", rawName: "v-ezPlusStacked" }
                  ],
                  class: [_vm.image_class, "preview-img-item"],
                  attrs: {
                    id: "stackedsvi-" + _vm.imgobj.id,
                    src: _vm.image_src,
                    alt: _vm.image_alt,
                    width: _vm.image_width,
                    height: _vm.image_height,
                    "data-svizoom-image": _vm.zoom
                  },
                  on: {
                    click: [
                      function($event) {
                        _vm.triggerChange()
                      },
                      function($event) {
                        _vm.photo($event)
                      }
                    ]
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.title
              ? _c("div", {
                  staticClass: "svititleimg",
                  domProps: { innerHTML: _vm._s(_vm.title) }
                })
              : _vm._e()
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-27160a16", esExports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "svistatic" },
    [
      _vm._l(_vm.thumbs, function(item, index) {
        return [
          item.single.src
            ? _c(
                "div",
                { key: item.key, staticClass: "svistacked-img" },
                [
                  _c("imageComponent", {
                    attrs: {
                      data: item.single,
                      imgobj: item,
                      index: index,
                      prethumbs: _vm.thumbs,
                      stacked: true
                    }
                  })
                ],
                1
              )
            : _vm._e()
        ]
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-334a8b22", esExports)
  }
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_static_vue__ = __webpack_require__(8);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0db73ac3_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_static_vue__ = __webpack_require__(28);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(25)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0db73ac3"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_static_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0db73ac3_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_static_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/static.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0db73ac3", Component.options)
  } else {
    hotAPI.reload("data-v-0db73ac3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "svi-thumbsection" }, [
    _c(
      "ul",
      {
        staticClass: "svithumbnails",
        class: ["columns-" + _vm.columns, _vm.data.length < 1 ? "svi100" : ""]
      },
      _vm._l(_vm.data, function(item, index) {
        return item.single.src
          ? _c(
              "li",
              { key: item.key, class: _vm.colposition(index) },
              [
                _c("imageComponent", {
                  attrs: {
                    data: item.thumb,
                    type: "thumb",
                    imgobj: item,
                    index: index
                  }
                })
              ],
              1
            )
          : _vm._e()
      }),
      0
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-76399e5c", esExports)
  }
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "svistatic" },
    [
      _c("imageComponent", {
        attrs: { data: _vm.mainImage, imgobj: _vm.image }
      }),
      _vm._v(" "),
      !_vm.disable_thumb
        ? _c("thumbnailsComponent", { attrs: { data: _vm.thumbs } })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0db73ac3", esExports)
  }
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_slider_vue__ = __webpack_require__(11);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_563973b6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_slider_vue__ = __webpack_require__(31);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(30)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-563973b6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_slider_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_563973b6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_slider_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/slider.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-563973b6", Component.options)
  } else {
    hotAPI.reload("data-v-563973b6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "sviproslider" }, [
    _c(
      "div",
      {
        ref: "swiperTop",
        staticClass: "swiper-container gallery-top",
        class: [_vm.disable_thumb ? "svi100" : ""]
      },
      [
        _c(
          "div",
          { staticClass: "swiper-wrapper" },
          [
            _vm._l(_vm.mainImage, function(item, index) {
              return [
                item.single.src
                  ? _c(
                      "div",
                      {
                        directives: [
                          { name: "ezPlusSlider", rawName: "v-ezPlusSlider" }
                        ],
                        key: item.key,
                        staticClass: "swiper-slide",
                        attrs: { "data-svizoom-image": item.single.full_image }
                      },
                      [
                        _c("imageComponent", {
                          attrs: {
                            data: item.single,
                            imgobj: item,
                            index: index,
                            prethumbs: _vm.mainImage
                          }
                        })
                      ],
                      1
                    )
                  : _vm._e()
              ]
            })
          ],
          2
        ),
        _vm._v(" "),
        _vm.slider_navigation
          ? _c("div", {
              staticClass: "swiper-button-next swiperTop-swiper-button-next",
              class: "swiper-button" + _vm.slider_navcolor,
              style: [
                _vm.slider_navcolor == "custom"
                  ? _vm.slider_navigation_color_prev
                  : ""
              ],
              attrs: { slot: "button-next" },
              slot: "button-next"
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.slider_navigation
          ? _c("div", {
              staticClass: "swiper-button-prev swiperTop-swiper-button-prev",
              class: "swiper-button" + _vm.slider_navcolor,
              style: [
                _vm.slider_navcolor == "custom"
                  ? _vm.slider_navigation_color_next
                  : ""
              ],
              attrs: { slot: "button-prev" },
              slot: "button-prev"
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.slider_pagination
          ? _c("div", {
              staticClass: "swiper-pagination sviswiper-pagination",
              style: _vm.slider_pagination_color,
              attrs: { slot: "pagination" },
              slot: "pagination"
            })
          : _vm._e()
      ]
    ),
    _vm._v(" "),
    !_vm.disable_thumb
      ? _c(
          "div",
          {
            ref: "swiperThumbs",
            staticClass: "swiper-container gallery-thumbs",
            class: [!_vm.position ? "sviUncenter" : ""]
          },
          [
            _c(
              "div",
              {
                staticClass: "swiper-wrapper",
                class: "svi-activeIndex_" + _vm.activeIndex
              },
              [
                _vm._l(_vm.thumbs, function(item, index) {
                  return [
                    item.single.src
                      ? _c(
                          "div",
                          { key: item.key, staticClass: "swiper-slide" },
                          [
                            _c("imageComponent", {
                              attrs: {
                                data: item.thumb,
                                type: "thumb",
                                imgobj: item,
                                sindex: index
                              }
                            })
                          ],
                          1
                        )
                      : _vm._e()
                  ]
                })
              ],
              2
            ),
            _vm._v(" "),
            _vm.slider_navigation_thumb
              ? _c("div", {
                  staticClass:
                    "swiper-button-next swiperThumbs-swiper-button-next",
                  class: "swiper-button" + _vm.slider_navcolor,
                  style: [
                    _vm.slider_navcolor == "custom"
                      ? _vm.slider_navigation_color_prev
                      : ""
                  ],
                  attrs: { slot: "button-next" },
                  slot: "button-next"
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.slider_navigation_thumb
              ? _c("div", {
                  staticClass:
                    "swiper-button-prev swiperThumbs-swiper-button-prev",
                  class: "swiper-button" + _vm.slider_navcolor,
                  style: [
                    _vm.slider_navcolor == "custom"
                      ? _vm.slider_navigation_color_next
                      : ""
                  ],
                  attrs: { slot: "button-prev" },
                  slot: "button-prev"
                })
              : _vm._e()
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-563973b6", esExports)
  }
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "woosvi_strap",
      class: [
        _vm.active_class,
        _vm.sviflex,
        "sviscreen-" + _vm.windowType,
        _vm.template,
        _vm.slider ? "running_svislider" : ""
      ],
      attrs: { "data-svidx": _vm.idx }
    },
    [
      !_vm.stacked
        ? [
            _vm.lightbox && _vm.lightbox_icon
              ? _c("span", {
                  staticClass: "sviLigthgallery",
                  style: _vm.lightbox_iconcolor,
                  on: {
                    click: function($event) {
                      _vm.photo($event)
                    }
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            !_vm.slider
              ? _c("staticComponent", {
                  attrs: { disable_thumb: _vm.disable_thumb }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.slider
              ? _c("sliderComponent", {
                  attrs: { disable_thumb: _vm.disable_thumb }
                })
              : _vm._e()
          ]
        : [
            _vm.lightbox && _vm.lightbox_icon
              ? _c("span", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.windowType != "desktop",
                      expression: 'windowType!="desktop"'
                    }
                  ],
                  staticClass: "sviLigthgallery",
                  style: _vm.lightbox_iconcolor,
                  on: {
                    click: function($event) {
                      _vm.photo($event)
                    }
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.stacked
              ? _c("stackedComponent", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.windowType == "desktop",
                      expression: 'windowType=="desktop"'
                    }
                  ],
                  attrs: { disable_thumb: _vm.disable_thumb }
                })
              : _vm._e(),
            _vm._v(" "),
            !_vm.slider
              ? _c("staticComponent", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.windowType != "desktop",
                      expression: 'windowType!="desktop"'
                    }
                  ],
                  attrs: { disable_thumb: _vm.disable_thumb }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.slider
              ? _c("sliderComponent", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.windowType != "desktop",
                      expression: 'windowType!="desktop"'
                    }
                  ],
                  attrs: { disable_thumb: _vm.disable_thumb }
                })
              : _vm._e()
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-911a9dfc", esExports)
  }
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PhotoSwipe_vue__ = __webpack_require__(12);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f0b451d_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PhotoSwipe_vue__ = __webpack_require__(34);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PhotoSwipe_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f0b451d_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PhotoSwipe_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/PhotoSwipe.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f0b451d", Component.options)
  } else {
    hotAPI.reload("data-v-4f0b451d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "pswp svipropswp",
      attrs: { tabindex: "-1", role: "dialog", "aria-hidden": "true" }
    },
    [
      _c("div", { staticClass: "pswp__bg" }),
      _vm._v(" "),
      _c("div", { staticClass: "pswp__scroll-wrap" }, [
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "pswp__ui pswp__ui--hidden" }, [
          _vm._m(1),
          _vm._v(" "),
          _vm._m(2),
          _vm._v(" "),
          _vm._m(3),
          _vm._v(" "),
          _vm._m(4),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "pswp__caption",
              class: [_vm.thumbnails ? "svicaption-top" : ""]
            },
            [_c("div", { staticClass: "pswp__caption__center" })]
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "flexslider-svi", staticStyle: { display: "none" } },
        [
          _vm.thumbnails
            ? _c(
                "div",
                {
                  staticClass: "arrow-down togglehidesvi",
                  on: {
                    click: function($event) {
                      _vm.toggle()
                    }
                  }
                },
                [
                  _c("span", {
                    staticClass: "dashicons",
                    class: "dashicons-arrow-" + _vm.up + "-alt2"
                  })
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.thumbnails
            ? _c("div", { staticClass: "swiper-container gallery-pswp" }, [
                _c(
                  "div",
                  { staticClass: "swiper-wrapper" },
                  _vm._l(_vm.items.slider, function(item) {
                    return _c(
                      "div",
                      { key: item.key, staticClass: "swiper-slide" },
                      [
                        _c("img", {
                          attrs: {
                            src: item.single.thumb_image,
                            alt: item.single.alt,
                            srcset: item.single.srcset,
                            sizes: item.single.sizes,
                            width: item.single.width,
                            height: item.single.height
                          }
                        })
                      ]
                    )
                  }),
                  0
                )
              ])
            : _vm._e()
        ]
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "pswp__container" }, [
      _c("div", { staticClass: "pswp__item" }),
      _vm._v(" "),
      _c("div", { staticClass: "pswp__item" }),
      _vm._v(" "),
      _c("div", { staticClass: "pswp__item" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "pswp__top-bar" }, [
      _c("div", { staticClass: "pswp__counter" }),
      _vm._v(" "),
      _c("button", {
        staticClass: "pswp__button pswp__button--close",
        attrs: { title: "Close (Esc)" }
      }),
      _vm._v(" "),
      _c("button", {
        staticClass: "pswp__button pswp__button--share",
        attrs: { title: "Share" }
      }),
      _vm._v(" "),
      _c("button", {
        staticClass: "pswp__button pswp__button--fs",
        attrs: { title: "Toggle fullscreen" }
      }),
      _vm._v(" "),
      _c("button", {
        staticClass: "pswp__button pswp__button--zoom",
        attrs: { title: "Zoom in/out" }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "pswp__preloader" }, [
        _c("div", { staticClass: "pswp__preloader__icn" }, [
          _c("div", { staticClass: "pswp__preloader__cut" }, [
            _c("div", { staticClass: "pswp__preloader__donut" })
          ])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass:
          "pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
      },
      [_c("div", { staticClass: "pswp__share-tooltip" })]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "pswp__button pswp__button--arrow--left",
        attrs: { title: "Previous (arrow left)" }
      },
      [_c("span", { staticClass: "dashicons dashicons-arrow-left-alt2" })]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "pswp__button pswp__button--arrow--right",
        attrs: { title: "Next (arrow right)" }
      },
      [_c("span", { staticClass: "dashicons dashicons-arrow-right-alt2" })]
    )
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4f0b451d", esExports)
  }
}

/***/ })
],[13]);