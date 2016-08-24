/**
 * @file ModPE design library for providing squircle drawable API.
 * @author Astro <astr36@naver.com>
 * @version 1.0
 */
($ => {
    "use strict";

    const BitmapFactory_ = android.graphics.BitmapFactory,
        PorterDuff_ = android.graphics.PorterDuff,
        PorterDuffColorFilter_ = android.graphics.PorterDuffColorFilter,
        BitmapDrawable_ = android.graphics.drawable.BitmapDrawable,
        Base64_ = android.util.Base64;

    /**
     * Class representing a squircle drawable.
     * @since 2016-08-24
     * @class
     * @global
     */
    function SquircleDrawable() {}

    /**
     * A drawable to be copied.
     * @type {android.graphics.drawable.BitmapDrawable}
     */
    SquircleDrawable.RESOURCE = (() => {
        let bytes = Base64_.decode("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", 0);
        return new BitmapDrawable_(BitmapFactory_.decodeByteArray(bytes, 0, bytes.length));
    })();

    /**
     * Creates a squircle drawable.
     * @since 2016-08-24
     * @param {Number} [color] Drawable color
     * @returns {android.graphics.drawable.BitmapDrawable} Squircle drawable
     */
    SquircleDrawable.create = function (color) {
        let drawable = SquircleDrawable.RESOURCE;
        if (color) {
            drawable.getPaint().setColorFilter(new PorterDuffColorFilter_(color, PorterDuff_.Mode.SRC_ATOP));
        }
        return drawable;
    };

    $.SquircleDrawable = SquircleDrawable;
})(this);