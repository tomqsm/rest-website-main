if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
} // IE ver 8 didnt't work without this 14/05/2013
$.fn.animateHighlight = function(highlightColor, duration) {
    var highlightBg = highlightColor || "#FFFF9C";
    var animateMs = duration || 1500;
    var originalBg = this.css("backgroundColor");
    this.fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
};
var eventDispatcher = _.extend({}, Backbone.Events);
var GLOBAL_EVENTS = GLOBAL_EVENTS || {
    GROUP_CLICKED: 'groupClicked',
    ITEM_CLICKED: 'itemClicked',
};