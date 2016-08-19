/**
 * @file ModPE widget library for providing timer button API.
 * @author Astro <astr36@naver.com>
 * @version 1.0
 */
($ => {
    "use strict";

    const Bitmap_ = android.graphics.Bitmap,
        Canvas_ = android.graphics.Canvas,
        Color_ = android.graphics.Color,
        Paint_ = android.graphics.Paint,
        RectF_ = android.graphics.RectF,
        BitmapDrawable_ = android.graphics.drawable.BitmapDrawable,
        Gravity_ = android.view.Gravity,
        View_ = android.view.View,
        LinearLayout_ = android.widget.LinearLayout,
        PopupWindow_ = android.widget.PopupWindow,
        TextView_ = android.widget.TextView,
        Thread_ = java.lang.Thread,
        CONTEXT = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
        DP = CONTEXT.getResources().getDisplayMetrics().density;

    /**
     * Class representing a progress button.
     * @since 2016-08-11
     * @class
     * @global
     */
    function ProgressButton() {
        let thiz = this,
            params = this._params = new LinearLayout_.LayoutParams(DP * 40, DP * 40),
            view = this._view = new TextView_(CONTEXT);
        this._unpressedColor = Color_.argb(128, 50, 50, 50);
        this._pressedColor = Color_.rgb(255, 128, 0);
        this._func = () => {};
        this._drawables = [];
        this._progress = 360;
        params.setMargins(DP * 6, DP * 6, DP * 6, DP * 6);
        view.setGravity(Gravity_.CENTER);
        view.setLayoutParams(params);
        view.setOnClickListener(new View_.OnClickListener({
            onClick(view) {
                this._func(view);
            }
        }));
        view.setText("");
        view.setTextColor(-1);
        view.setTextSize(1, 14);
    }

    /**
     * Returns the progress which is displayed on the button.
     * @since 2016-08-11
     * @returns {Number} Progress
     */
    ProgressButton.prototype.getProgress = function () {
        return this._progress;
    };

    /**
     * Returns the displayed text.
     * @since 2016-08-11
     * @returns {String} Displayed text
     */
    ProgressButton.prototype.getText = function () {
        return this._view.getText().toString();
    };

    /**
     * Returns the color of displayed text.
     * @since 2016-08-11
     * @returns {Number} Color of text
     */
    ProgressButton.prototype.getTextColor = function () {
        return this._view.getTextColor();
    };

    /**
     * Returns the size of displayed text.
     * @since 2016-08-11
     * @returns {Number} Size of text
     */
    ProgressButton.prototype.getTextSize = function () {
        return this._view.getTextSize();
    };

    /**
     * Returns the view.
     * @since 2016-08-11
     * @returns {android.view.View} View
     */
    ProgressButton.prototype.getView = function () {
        return this._view;
    };

    /**
     * Returns the width and height of the view.
     * @since 2016-08-11
     * @returns {Array.<Number>} Width and height of the view
     */
    ProgressButton.prototype.getWH = function () {
        let params = this._params;
        return [params.width, params.height];
    };

    /**
     * Sets the color of the button.
     * @since 2016-08-11
     * @param {Number} color Color of the button
     */
    ProgressButton.prototype.setColor = function (color) {
        this._unpressedColor = color;
        if (typeof this._drawables[360] !== "undefined") {
            this.updateCache();
        }
        return this;
    };

    /**
     * Sets the effect function.
     * @since 2016-08-11
     * @param {Function} func Effect function
     */
    ProgressButton.setEffect = function (func) {
        if (typeof func === "function") {
            this._func = func;
        } else {
            this._func = () => {};
        }
        return this;
    };

    /**
     * Sets the color of the clicked button.
     * @since 2016-08-11
     * @param {Number} color Color of the clicked button
     */
    ProgressButton.prototype.setEffectColor = function (color) {
        this._pressedColor = color;
        if (typeof this._drawables[360] !== "undefined") {
            this.updateCache();
        }
        return this;
    };

    /**
     * Sets a gravity for the view.
     * @since 2016-08-11
     * @param {Number} gravity Gravity for the view
     */
    ProgressButton.prototype.setGravity = function (gravity) {
        this._view.setGravity(gravity);
        return this;
    };

    /**
     * Sets the padding of the view.
     * @since 2016-08-11
     * @param {Number} left Left padding
     * @param {Number} top Top padding
     * @param {Number} right Right padding
     * @param {Number} bottom Bottom padding
     */
    ProgressButton.prototype.setPadding = function (left, top, right, bottom) {
        this._params.setMargins(left, top, right, bottom);
        return this;
    };

    /**
     * Sets the progress which is displayed on the button.
     * @since 2016-08-11
     * @param {Number} Progress
     */
    ProgressButton.prototype.setProgress = function (progress) {
        this._progress = progress;
        if (this._drawables[progress]) {
            this._view.setBackgroundDrawable(this._drawables[progress]);
        }
        return this;
    };

    /**
     * Sets a displayed text.
     * @since 2016-08-11
     * @param {String} text Displayed text
     */
    ProgressButton.prototype.setText = function (text) {
        this._view.setText(text.toString());
        return this;
    };

    /**
     * Sets the color of displayed text.
     * @since 2016-08-11
     * @param {Number} textColor Color of displayed text.
     */
    ProgressButton.prototype.setTextColor = function (textColor) {
        this._view.setTextColor(textColor);
        return this;
    };

    /**
     * Sets the size of displayed text.
     * @since 2016-08-11
     * @param {Number} textSize Size of displayed text.
     */
    ProgressButton.prototype.setTextSize = function (textSize) {
        this._view.setTextSize(1, textSize);
        return this;
    };

    /**
     * Sets the width and height of the view.
     * @since 2016-08-11
     * @param {Number} width Width of the view
     * @param {Number} height Height of the view
     */
    ProgressButton.prototype.setWH = function (width, height) {
        let params = this._params;
        params.width = width;
        params.height = height;
        return this;
    };

    /**
     * Returns the view.
     * @since 2016-08-11
     * @returns {android.view.View} View
     */
    ProgressButton.prototype.show = function () {
        this.updateCache();
        this._view.setBackgroundDrawable(this._drawables[this._progress]);
        return this._view;
    };

    /**
     * Update drawable cache for drawing on the view.
     * @since 2016-08-11
     */
    ProgressButton.prototype.updateCache = function () {
        let drawables = this._drawables,
            width = this._params.width,
            height = this._params.height,
            bitmap = Bitmap_.createBitmap(width, height, Bitmap_.Config.ARGB_8888),
            canvas = new Canvas_(bitmap),
            rectF0 = new RectF_(0, 0, width, height),
            rectF1 = new RectF_(Math.round(width / 10), Math.round(height / 10), Math.round(width * 0.9), Math.round(height * 0.9)),
            paint0 = new Paint_(Paint_.ANTI_ALIAS_FLAG),
            paint1 = new Paint_(Paint_.ANTI_ALIAS_FLAG);
        paint0.setColor(this._unpressedColor);
        paint1.setColor(this._pressedColor);
        canvas.drawOval(rectF0, paint0);
        paint0.setAlpha(255);
        for (let i = 0; i <= 360; i++) {
            canvas.drawArc(rectF0, -90, i, true, paint1);
            canvas.drawOval(rectF1, paint0);
            drawables[i] = new BitmapDrawable_(bitmap.copy(Bitmap_.Config.ARGB_8888, false));
        }
    };



    /**
     * Class representing a timer button.
     * @since 2016-08-11
     * @class
     * @extends ProgressButton
     * @global
     */
    function TimerButton() {
        let thiz = this,
            params = this._params = new LinearLayout_.LayoutParams(DP * 40, DP * 40),
            view = this._view = new TextView_(CONTEXT);
        this._unpressedColor = Color_.argb(128, 50, 50, 50);
        this._pressedColor = Color_.rgb(255, 128, 0);
        this._func = () => {};
        this._drawables = [];
        this._progress = 360;
        this._time = 5;
        params.setMargins(DP * 6, DP * 6, DP * 6, DP * 6);
        view.setGravity(Gravity_.CENTER);
        view.setLayoutParams(params);
        view.setOnClickListener(new View_.OnClickListener({
            onClick(view) {
                if (thiz._progress >= 360) {
                    thiz._func(view, thiz);
                }
            }
        }));
        view.setText("A");
        view.setTextColor(-1);
        view.setTextSize(1, 14);
        this.setEffect();
    }

    TimerButton.prototype = Object.create(ProgressButton.prototype);

    TimerButton.prototype.setEffect = function (func) {
        let defaultFunc = (v, thiz) => {
            new Thread_({
                run() {
                    let interval = Math.ceil(thiz._time * 2.7);
thiz._progress = -1;
                    while (++thiz._progress < 360) {
                        Thread_.sleep(interval);
                        CONTEXT.runOnUiThread({
                            run() {
                                thiz._view.setBackgroundDrawable(thiz._drawables[thiz._progress]);
                            }
                        });
                    }
                }
            }).start();
        };
        if (typeof func === "function") {
            this._func = (v, thiz_) => {
                func(v);
                defaultFunc(v, thiz_);
            };
        } else {
            this._func = defaultFunc;
        }
        return this;
    };

    /** 
     * Sets the timer.
     * @since 2016-08-11
     * @param {Number} time Time to run the button
     */
    TimerButton.prototype.setTime = function (time) {
        this._time = time;
        return this;
    };

    $.ProgressButton = ProgressButton;
    $.TimerButton = TimerButton;
})(this);



const Bitmap_ = android.graphics.Bitmap,
        Canvas_ = android.graphics.Canvas,
        Color_ = android.graphics.Color,
        Paint_ = android.graphics.Paint,
        RectF_ = android.graphics.RectF,
        BitmapDrawable_ = android.graphics.drawable.BitmapDrawable,
ColorDrawable_ = android.graphics.drawable.ColorDrawable,
        Gravity_ = android.view.Gravity,
        View_ = android.view.View,
        LinearLayout_ = android.widget.LinearLayout,
        PopupWindow_ = android.widget.PopupWindow,
        TextView_ = android.widget.TextView,
        CONTEXT = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
        DP = CONTEXT.getResources().getDisplayMetrics().density;


function useItem() {
    CONTEXT.runOnUiThread({
        run() {
try{
            let layout = new LinearLayout_(CONTEXT),
                window = new PopupWindow_(layout, -2, -2);
            layout.addView(new TimerButton().show());
layout.addView(new TimerButton().setEffectColor(-2794024).setTime(3).show());
            layout.setOrientation(1);
            window.setBackgroundDrawable(new ColorDrawable_(Color_.rgb(97, 97, 97)));
            window.showAtLocation(CONTEXT.getWindow().getDecorView(), Gravity_.CENTER, 0, 0);
}catch(e){
print(e +"___"+e.lineNumber);
}
        }
    })
}
