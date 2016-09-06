/**
 * @file ModPE widget library for providing colored scroll view.
 * @author Astro <astr36@naver.com>
 * @version 1.0
 * @license Apache-2.0
 */
/** @namespace global */
($ => {
    "use strict";

    const ColorDrawable_ = android.graphics.drawable.ColorDrawable,
        MotionEvent_ = android.view.MotionEvent,
        View_ = android.view.View,
        LinearLayout_ = android.widget.LinearLayout,
        ScrollView_ = android.widget.ScrollView,
        TextView_ = android.widget.TextView,
        MainActivity_ = com.mojang.minecraftpe.MainActivity,
        CONTEXT = MainActivity_.currentMainActivity.get(),
        DP = CONTEXT.getResources().getDisplayMetrics().density;

    /**
     * Class representing a scroll view.
     * @since 2016-09-06
     * @class
     * @memberOf global
     */
    function ColoredScrollView() {
        let thiz = this;
        this._scrollView = new ScrollView_(CONTEXT);
        this._scroller = new LinearLayout_(CONTEXT);
        this._track = new TextView_(CONTEXT);
        this._thumb = new TextView_(CONTEXT);
        this._width = DP * 340;
        this._scrollView.setLayoutParams(new LinearLayout_.LayoutParams(this._width - DP * 6, -1));
        this._scrollView.setOnScrollChangeListener(new View_.OnScrollChangeListener({
            onScrollChange(v, scrollX, scrollY, oldScrollX, oldScrollY) {
                CONTEXT.runOnUiThread({
                    run() {
                        thiz._track.setLayoutParams(new LinearLayout_.LayoutParams(DP * 12, v.getHeight() * scrollY / v.getChildAt(0).getHeight()));
                    }
                });
            }
        }));
        this._scrollView.setOverScrollMode(View_.OVER_SCROLL_NEVER);
        this._scrollView.setVerticalScrollBarEnabled(false);
        this._scrollView.setHorizontalScrollBarEnabled(false);
        this._scroller.addView(this._track);
        this._scroller.addView(this._thumb);
        this._scroller.setOrientation(1);
        this._track.setLayoutParams(new LinearLayout_.LayoutParams(DP * 6, 0));
        this._thumb.setBackgroundDrawable(new ColorDrawable_(-14575885));
        this._thumb.setLayoutParams(new LinearLayout_.LayoutParams(DP * 6, DP * 36));
        this._thumb.setOnTouchListener(new View_.OnTouchListener({
            onTouch(v, event) {
                let y = event.getRawY();
                if (event.getAction() === MotionEvent_.ACTION_MOVE) {
                    thiz._track.setLayoutParams(new LinearLayout_.LayoutParams(DP * 12, thiz._scrollView.getChildAt(0).getHeight() * y / (thiz._scrollView.getHeight() - DP * 18)));
                    thiz._scrollView.scrollTo(0, thiz._scrollView.getChildAt(0).getHeight() * y / (thiz._scrollView.getHeight() - DP * 18));
                }
                return true;
            }
        }));
    }

    /**
     * Adds a view on the scroll view.
     * @since 2016-09-06
     * @param {android.view.View} view View
     */
    ColoredScrollView.prototype.addView = function (view) {
        this._scrollView.addView(view);
        return this;
    };

    /**
     * Returns the scroll view.
     * @since 2016-09-06
     * @returns {android.widget.LinearLayout} Scroll view
     */
    ColoredScrollView.prototype.getLayout = function () {
        return this._layout;
    };

    /**
     * Sets the color of the thumb of the scroll view.
     * @since 2016-09-06
     * @param {Number} color Color of the thumb of the scroll view
     */
    ColoredScrollView.prototype.setThumbColor = function (color) {
        this._thumb.setBackgroundDrawable(new ColorDrawable_(color));
        return this;
    };

    /**
     * Sets the drawable of the thumb of the scroll view.
     * @since 2016-09-06
     * @param {android.graphics.drawable.Drawable} drawable Drawable of the thumb of the scroll view
     */
    ColoredScrollView.prototype.setThumbDrawable = function (drawable) {
        this._thumb.setBackgroundDrawable(drawable);
        return this;
    };

    /**
     * Sets the color of the track of the scroll view.
     * @since 2016-09-06
     * @param {Number} color Color of the track of the scroll view
     */
    ColoredScrollView.prototype.setTrackColor = function (color) {
        this._track.setBackgroundDrawable(new ColorDrawable_(color));
        return this;
    };

    /**
     * Sets the drawable of the track of the scroll view.
     * @since 2016-09-06
     * @param {android.graphics.drawable.Drawable} drawable Drawable of the track of the scroll view
     */
    ColoredScrollView.prototype.setTrackDrawable = function (drawable) {
        this._track.setBackgroundDrawable(drawable);
        return this;
    };

    /**
     * Returns the scroll view.
     * @since 2016-09-06
     * @returns {android.widget.LinearLayout} Scroll view
     */
    ColoredScrollView.prototype.show = function () {
        let mainLayout = new LinearLayout_(CONTEXT);
        mainLayout.addView(this._scrollView);
        mainLayout.addView(this._scroller);
        mainLayout.setLayoutParams(new LinearLayout_.LayoutParams(this._width, -1));
        return mainLayout;
    };

    $.ColoredScrollView = ColoredScrollView;
})(this);