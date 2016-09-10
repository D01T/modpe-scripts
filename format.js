/**
 * @file Javscript utils library for providing format method of python.
 * @author Astro <astr36@naver.com>
 * @version 1.0
 * @license Apache-2.0
 */
/** @namespace global */
($ => {
    "use strict";
    
    const REGEX_INDEX = /\{(\d+(?:\:.?[\>\<\^]\d+)?)\}/g,
        REGEX_GRAVITY_CENTER = /^(\d+)\:(.?)\^(\d+)$/,
        REGEX_GRAVITY_LEFT = /^(\d+)\:(.?)\<(\d+)$/,
        REGEX_GRAVITY_RIGHT = /^(\d+)\:(.?)\>(\d+)$/,
        REGEX_SPACE = /\:(.?)[\>\<\^]/;
    
    /**
     * Format the string.
     * @since 2016-09-09
     * @memberOf global
     * @param {String} str Target string
     * @param {...String} args Arguments
     */
    function format(str) {
        let args = Array.prototype.slice.call(arguments, 1);
        return str.replace(REGEX_INDEX, ($1, $2) => {
            if (REGEX_GRAVITY_CENTER.test($2)) {
                let arr = $2.split(REGEX_SPACE),
                    text = args[arr[0]],
                    space = arr[1] || " ",
                    len = arr[2] - text.length;
                return space.repeat(Math.ceil(len / 2)) + text + space.repeat(Math.floor(len / 2));
            } else if (REGEX_GRAVITY_LEFT.test($2)) {
                let arr = $2.split(REGEX_SPACE),
                    text = args[arr[0]],
                    space = arr[1] || " ";
                return text + space.repeat(arr[2] - text.length);
            } else if (REGEX_GRAVITY_RIGHT.test($2)) {
                let arr = $2.split(REGEX_SPACE),
                    text = args[arr[0]],
                    space = arr[1] || " ";
                return space.repeat(arr[2] - text.length) + text;
            }
            return args[$2] || "";
        });
    };
    
    $.format = format;
})(this);