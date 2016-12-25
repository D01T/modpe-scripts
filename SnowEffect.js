/**
 * @file Snow effect library for providing showing snow effect on screen.
 * @author Astro <astr36@naver.com>
 * @version 1.0
 * @license Apache-2.0
 */
/** @namespace global */
($ => {
    "use strict";

    const Bitmap_ = android.graphics.Bitmap,
        BitmapFactory_ = android.graphics.BitmapFactory,
        Base64_ = android.util.Base64,
        Gravity_ = android.view.Gravity,
        ImageView_ = android.widget.ImageView,
        PopupWindow_ = android.widget.PopupWindow,
        MainActivity_ = com.mojang.minecraftpe.MainActivity,
        Thread_ = java.lang.Thread,
        CONTEXT = MainActivity_.currentMainActivity.get(),
        DP = CONTEXT.getResources().getDisplayMetrics().density,
        DEVICE_WIDTH = CONTEXT.getScreenWidth(),
        DEVICE_HEIGHT = CONTEXT.getScreenHeight(),
        SCREEN = CONTEXT.getWindow().getDecorView();

    /**
     * Class representing a snow effect.
     * @since 2016-12-20
     * @class
     * @memberOf global
     */
    function SnowEffect() {
        this._isRunning = false;
    }

    /**
     * Finishes the snow effect.
     * @since 2016-12-20
     */
    SnowEffect.prototype.finish = function () {
        this._isRunning = false;
    };

    /**
     * Starts a snow effect.
     * @since 2016-12-20
     */
    SnowEffect.prototype.start = function () {
        let thiz = this;
        thiz._isRunning = true;
        new Thread_({
            run() {
                while (thiz._isRunning) {
                    let particle = new SnowParticle();
                    particle.create();
                    Thread_.sleep(500);
                }
            }
        }).start();
    };



    /**
     * Class representing a snow particle.
     * @since 2016-12-20
     * @class
     */
    function SnowParticle() {
        this._isShowing = false;
    }

    /**
     * Snow particle resource bitmap.
     * @type {android.graphics.Bitmap}
     * @see {@link https://thenounproject.com/term/snow/64/}
     */
    SnowParticle.RESOURCE = (() => {
        let bytes = Base64_.decode("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", 0);
        return BitmapFactory_.decodeByteArray(bytes, 0, bytes.length);
    })();

    /**
     * Creates a snow particle.
     * @since 2016-12-20
     */
    SnowParticle.prototype.create = function () {
        let thiz = this,
            size = Math.floor(Math.random() * 10 + 5) * DP,
            x = Math.floor(Math.random() * DEVICE_WIDTH - DEVICE_WIDTH / 2),
            particle = new ImageView_(CONTEXT);
        CONTEXT.runOnUiThread({
            run() {
                particle.setImageBitmap(Bitmap_.createScaledBitmap(SnowParticle.RESOURCE, DP * size, DP * size, false));
                thiz._window = new PopupWindow_(particle, -2, -2);
                thiz._window.showAtLocation(SCREEN, Gravity_.TOP, x, 0);
            }
        });
        thiz._isShowing = true;
        new Thread_({
            run() {
                let y = 5;
                while (thiz._isShowing && y < DEVICE_HEIGHT) {
                    CONTEXT.runOnUiThread({
                        run() {
                            thiz._window.update(x, y, -2, -2);
                        }
                    });
                    Thread_.sleep(50);
                    y += 5;
                }
                if (thiz._isShowing) {
                    thiz._isShowing = false;
                    if (thiz._window instanceof PopupWindow_) {
                        CONTEXT.runOnUiThread({
                            run() {
                                thiz._window.dismiss();
                                thiz._window = null;
                            }
                        });
                    }
                }
            }
        }).start();
    };

    $.SnowEffect = SnowEffect;
    $.SnowParticle = SnowParticle;
})(this);