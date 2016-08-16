/**
 * @file ModPE widget library for providing color picker API.
 * @author Astro <astr36@naver.com>
 * @version 1.0
 */
($ => {
    "use strict";

    const Bitmap_ = android.graphics.Bitmap,
        Canvas_ = android.graphics.Canvas,
        Color_ = android.graphics.Color,
        LinearGradient_ = android.graphics.LinearGradient,
        Paint_ = android.graphics.Paint,
        Shader_ = android.graphics.Shader,
        BitmapDrawable_ = android.graphics.drawable.BitmapDrawable,
        ColorDrawable_ = android.graphics.drawable.ColorDrawable,
        Gravity_ = android.view.Gravity,
        MotionEvent_ = android.view.MotionEvent,
        View_ = android.view.View,
        LinearLayout_ = android.widget.LinearLayout,
        PopupWindow_ = android.widget.PopupWindow,
        TextView_ = android.widget.TextView,
        CONTEXT = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
        DP = CONTEXT.getResources().getDisplayMetrics().density;

    /**
     * Class representing a color picker.
     * @since 2016-05-04
     * @class
     * @memberOf global
     * @param {Number} [r=255] Red
     * @param {Number} [g=0] Blue
     * @param {Number} [b=0] Green
     * @param {Function} [func=function(){}] Callback to be invoked when color was changed
     */
    function ColorPicker(r, g, b, func) {
        r = r || 255;
        g = g || 0;
        b = b || 0;
        func = func || (() => {});
        let controller = this._controller = new TextView_(CONTEXT),
            picker = this._picker = new TextView_(CONTEXT),
            paint = new Paint_(),
            bitmapC = Bitmap_.createBitmap(40, 240, Bitmap_.Config.ARGB_8888),
            bitmapP = Bitmap_.createBitmap(240, 240, Bitmap_.Config.ARGB_8888),
            canvasC = new Canvas_(bitmapC),
            canvasP = new Canvas_(bitmapP),
            pickerX = 240,
            pickerY = 0;

        paint.setShader(new LinearGradient_(0, 0, 0, 40, Color_.rgb(255, 0, 0), Color_.rgb(255, 255, 0), Shader_.TileMode.CLAMP));
        canvasC.drawRect(0, 0, 40, 40, paint);
        paint.setShader(new LinearGradient_(0, 40, 0, 80, Color_.rgb(255, 255, 0), Color_.rgb(0, 255, 0), Shader_.TileMode.CLAMP));
        canvasC.drawRect(0, 40, 40, 80, paint);
        paint.setShader(new LinearGradient_(0, 80, 0, 120, Color_.rgb(0, 255, 0), Color_.rgb(0, 255, 255), Shader_.TileMode.CLAMP));
        canvasC.drawRect(0, 80, 40, 120, paint);
        paint.setShader(new LinearGradient_(0, 120, 0, 160, Color_.rgb(0, 255, 255), Color_.rgb(0, 0, 255), Shader_.TileMode.CLAMP));
        canvasC.drawRect(0, 120, 40, 160, paint);
        paint.setShader(new LinearGradient_(0, 160, 0, 200, Color_.rgb(0, 0, 255), Color_.rgb(255, 0, 255), Shader_.TileMode.CLAMP));
        canvasC.drawRect(0, 160, 40, 200, paint);
        paint.setShader(new LinearGradient_(0, 200, 0, 240, Color_.rgb(255, 0, 255), Color_.rgb(255, 0, 0), Shader_.TileMode.CLAMP));
        canvasC.drawRect(0, 200, 40, 240, paint);
        paint.setShader(new LinearGradient_(240, 0, 0, 0, Color_.rgb(r, g, b), Color_.WHITE, Shader_.TileMode.CLAMP));
        canvasP.drawRect(0, 0, 240, 240, paint);
        paint.setShader(new LinearGradient_(0, 0, 0, 240, Color_.TRANSPARENT, Color_.BLACK, Shader_.TileMode.CLAMP));
        canvasP.drawRect(0, 0, 240, 240, paint);

        controller.setBackgroundDrawable(new BitmapDrawable_(bitmapC));
        controller.setOnTouchListener(new View_.OnTouchListener({
            onTouch: function(view, event) {
                let action = event.getAction();
                if (action === MotionEvent_.ACTION_DOWN || action === MotionEvent_.ACTION_MOVE || action === MotionEvent_.ACTION_UP) {
                    let x = Math.floor(event.getX() / DP),
                        y = Math.floor(event.getY() / DP);
                    if (x >= 0 && x <= 40 && y >= 0 && y <= 240) {
                        paint.setShader(new LinearGradient_(240, 0, 0, 0, bitmapC.getPixel(20, y), Color_.WHITE, Shader_.TileMode.CLAMP));
                        canvasP.drawRect(0, 0, 240, 240, paint);
                        paint.setShader(new LinearGradient_(0, 0, 0, 240, Color_.TRANSPARENT, Color_.BLACK, Shader_.TileMode.CLAMP));
                        canvasP.drawRect(0, 0, 240, 240, paint);
                        picker.setBackgroundDrawable(new BitmapDrawable_(bitmapP));
                        func(bitmapP.getPixel(pickerX, pickerY));
                    }
                }
                return true;
            }
        }));

        picker.setBackgroundDrawable(new BitmapDrawable_(bitmapP));
        picker.setOnTouchListener(new View_.OnTouchListener({
            onTouch: function(view, event) {
                let action = event.getAction();
                if (action === MotionEvent_.ACTION_DOWN || action === MotionEvent_.ACTION_MOVE || action === MotionEvent_.ACTION_UP) {
                    let x = Math.floor(event.getX() / DP),
                        y = Math.floor(event.getY() / DP);
                    if (x >= 0 && x <= 240 && y >= 0 && y <= 240) {
                        pickerX = x;
                        pickerY = y;
                        func(bitmapP.getPixel(x, y));
                    }
                }
                return true;
            }
        }));
    }

    /**
     * Returns the widget of color picker.
     * @since 2016-05-04
     * @returns {android.widget.LinearLayout} the widget of color picker
     */
    ColorPicker.prototype.show = function() {
        let layout = new LinearLayout_(CONTEXT);
        layout.addView(this._picker, DP * 240, DP * 240);
        layout.addView(this._controller, DP * 40, DP * 240);
        return layout;
    };



    /**
     * Class representing a window that shows a color picker.
     * @since 2016-05-04
     * @class
     * @memberOf global
     * @param {Number} [r=255] Red
     * @param {Number} [g=0] Green
     * @param {Number} [b=0] Blue
     * @param {Function} [func=function(){}] Callback to be invoked when color was changed
     */
    function ColorPickerWindow(r, g, b, func) {
        let viewer = this._viewer = new TextView_(CONTEXT);
        this._picker = new ColorPicker(r, g, b, color => {
            viewer.setBackgroundDrawable(new ColorDrawable_(color));
            func(color);
        });
        viewer.setBackgroundDrawable(new ColorDrawable_(Color_.rgb(r, g, b)));
    }

    /**
     * Display the window of color picker.
     * @since 2016-05-04
     */
    ColorPickerWindow.prototype.show = function() {
        let thiz = this;
        CONTEXT.runOnUiThread({
            run() {
                let layout = new LinearLayout_(CONTEXT),
                    window = new PopupWindow_(layout, -2, -2);
                layout.addView(thiz._picker.show(), DP * 280, DP * 240);
                layout.addView(thiz._viewer, DP * 280, DP * 100);
                layout.setOrientation(1);
                window.setBackgroundDrawable(new ColorDrawable_(Color_.rgb(97, 97, 97)));
                window.showAtLocation(CONTEXT.getWindow().getDecorView(), Gravity_.CENTER, 0, 0);
            }
        });
    };

    $.ColorPicker = ColorPicker;
    $.ColorPickerWindow = ColorPickerWindow;
})(this);
