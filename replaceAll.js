/**
 * @file replaceAll function
 * @author Astro <astr36@naver.com>
 * @version 1.0
 * @license Apache-2.0
 */
/**
 * Replaces each substring of this string that matches the literal target sequence with the specified literal replacement sequence.
 * @since 2016-08-24
 * @param {String} string The string to be checked
 * @param {String} target The sequence of char values to be replaced
 * @param {String} replacement The replacement sequence
 * @param {Boolean} [insensitive=false] Case-insensitive mode
 * @returns {String} The resulting string
 */
function replaceAll(string, target, replacement, insensitive) {
    if (insensitive) {
        return string.replace(new RegExp(target.replace(/[\\\^\$\.\[\]\|\(\)\?\*\+\{\}\-]/g, ""), "gi"), replacement);
    } else {
        return string.split(target).join(replacement);
    }
}