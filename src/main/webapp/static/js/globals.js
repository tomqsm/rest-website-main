$.fn.animateHighlight = function(highlightColor, duration) {
    var highlightBg = highlightColor || "#FFFF9C";
    var animateMs = duration || 1500;
    var originalBg = this.css("backgroundColor");
    this.fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
};
var publishSubscribe = _.extend({}, Backbone.Events);
var GLOBAL_EVENTS = GLOBAL_EVENTS || {
    GROUP_CHANGED: 'groupChanged',
    somethingElse: 2
};