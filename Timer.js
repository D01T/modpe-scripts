/**
 * @file ModPE timer library for providing timer API.
 * @author Astro <astr36@naver.com>
 * @version 1.0
 * @license Apache-2.0
 */
/** @namespace global */
($ => {
    "use strict";

    const Thread_ = java.lang.Thread;

    /**
     * Class representing a timer.
     * @since 2017-01-26
     * @class
     * @memberOf global
     * @param {Number} [time=120] Time(sec)
     */
    function Timer(time) {
        this._isRunning = false;
        this._time = time || 120;
    }

    Timer.prototype.getTime = function () {
        return this._time;
    };

    Timer.prototype.setOnSecListener = function (func) {
        this._onSec = func;
    };

    Timer.prototype.setOnStartListener = function (func) {
        this._onStart = func;
    };

    Timer.prototype.setOnStopListener = function (func) {
        this._onStop = func;
    };

    Timer.prototype.start = function () {
        let thiz = this;
        new Thread_({
            run() {
                if (typeof thiz._onStart === "function") {
                    thiz._onStart();
                }
                thiz._isRunning = true;
                while (thiz._isRunning && thiz._time > 0) {
                    if (typeof thiz._onSec === "function") {
                        thiz._onSec(thiz._time);
                    }
                    Thread_.sleep(1000);
                    thiz._time--;
                }
                if (typeof thiz._onStop === "function") {
                    thiz._onStop();
                }
                thiz._isRunning = false;
            }
        }).start();
    };

    Timer.prototype.stop = function () {
        this._isRunning = false;
    };

    $.Timer = Timer;
})(this);