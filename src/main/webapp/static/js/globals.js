/**
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
 */
(function() {
  if (!window.console) {
    window.console = {};
  }
  // union of Chrome, FF, IE, and Safari console methods
  var m = [
    "log", "info", "warn", "error", "debug", "trace", "dir", "group",
    "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
    "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
  ];
  // define undefined methods as noops to prevent errors
  for (var i = 0; i < m.length; i++) {
    if (!window.console[m[i]]) {
      window.console[m[i]] = function() {};
    }    
  } 
})();
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
    CATEGORY_CHANGED: 'categoryChanged',
    ITEM_CLICKED: 'itemClicked',
    URL_CHANGED: 'urlChanged'
};
var DIC = DIC || {
    timeout: [{pl: 'Czas minął'}, {en: 'Timeout'}]
};