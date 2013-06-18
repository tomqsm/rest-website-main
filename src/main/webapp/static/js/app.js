/*

Author: Tomasz Kusmierczyk
Resources used: 
Nicholas C. Zakas, 'Professional Java Script for Web Developers', ed. 3, Wiley 2012.

*/

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

// utils application 
var utilsApp = {} || utilsApp;
utilsApp.encoder = {
    encodeToURL: function(someString) {
        var encoded, disallowed = 'ĄąĘęŚśŻżŹźÓóŁłŃń', allowed = 'AaEeSsZzZzOoLlNn';
        encoded = utilsApp.replace(disallowed, allowed, someString);
        return encoded;
    }
}
utilsApp.replace = function(disallowed, allowed, string) {
    var encoded = string.replace(/ /g, '-');
    _.each(disallowed.split(""), function(element, index, list) {
        var regex = new RegExp(element, "gi");
        encoded = encoded.replace(regex, allowed[index + 1]);
    });
    return encoded;
};

var textimageApp = {} || textimageApp;
textimageApp.model = Backbone.Model.extend({
    defaults: {
        baseURL: '/lukasfloorcom-1.0',
        category: 'witamy',
        url: 'http://localhost:8080/lukasfloorcom',
        fileName: 'fruits',
        imageFileEnd: 'png',
        textFileEnd: 'txt'
    }
});
textimageApp.categoryPictureView = Backbone.View.extend({
    //background
    el: '#categoryIllustrator .zero',
    initialize: function() {
//        console.log(this.$el.html());
        eventDispatcher.on(GLOBAL_EVENTS.CATEGORY_CHANGED, this.eventsListener, this);
    },
    eventsListener: function(data) {
        console.log('Image view picked up: ' + data.itemId);
    },
    render: function() {
    },
    destroy: function() {
        eventDispatcher.off(GLOBAL_EVENTS.CATEGORY_CHANGED, this.eventsListener);
    }
});
textimageApp.categoryTextView = Backbone.View.extend({
    el: '#categoryIllustrator .zero',
    initialize: function() {
        eventDispatcher.on(GLOBAL_EVENTS.CATEGORY_CHANGED, this.eventsListener, this);
    },
    eventsListener: function(data) {
        console.log('Text view picked up: ' + data.itemId);
    },
    render: function() {
    },
    destroy: function() {
        eventDispatcher.off(GLOBAL_EVENTS.CATEGORY_CHANGED, this.eventsListener);
    }
});
// requires utilsApp
var menuApp = menuApp || {};
menuApp.menuView = Backbone.View.extend({
    isPushState: false,
    previousItemId: '30',
    currentItemId: '30',
    menuGroupsViews: [],
    el: '#nav',
    menuGroups: $('#nav').find('ul'),
    initialize: function(options) {
//        _.bindAll(this);
        this.isPushState = options.isPushState;
        console.log('enablePushState is ' + this.isPushState);
        eventDispatcher.on(GLOBAL_EVENTS.ITEM_CLICKED, this.eventsListener, this);
        eventDispatcher.on(GLOBAL_EVENTS.URL_CHANGED, this.eventsListener, this);
        var self = this;
        _.each(this.menuGroups, function(ul, index, list) { // there are 4 ul
            var groupView = new menuApp.groupView({$ul: $(ul), index: index});
            self.menuGroupsViews.push(groupView);
        });
        console.log('app initialised');
    },
    /* tracks previous and currently focused menu item */
    eventsListener: function(data) {
        var currentItemView = null;
        var previousItemView = this.getItemViewById(this.previousItemId);
        if (data.type === GLOBAL_EVENTS.ITEM_CLICKED) {
            currentItemView = data.view;
            this.currentItemId = currentItemView.model.get('id');
            if (this.previousItemId === this.currentItemId) {
                // nothing changed
            } else {
                currentItemView.addHighlight();
                previousItemView.removeHighlight();

                if (this.getGroupIndexFromId(this.previousItemId) === this.getGroupIndexFromId(this.currentItemId)) {
                    // group hasn't changed
                } else {
                    console.log('group has changed to ');
                    this.getGroupViewById(this.currentItemId).updateCategoryText();
                    eventDispatcher.trigger(GLOBAL_EVENTS.CATEGORY_CHANGED, {itemId: this.getCurrentGroupIndex(), type: GLOBAL_EVENTS.CATEGORY_CHANGED});
                }
            }
        }
        this.previousItemId = this.currentItemId;
        if (data.type === GLOBAL_EVENTS.URL_CHANGED) {
            console.log('path piced up');
            currentItemView = this.getItemViewByUrl(data.url);
            /**
             * router sends url_changed event, this pics it up, locates
             * a itemView by URL and triggers a 'click' upon itself
             * thus we get all action as if user clicked an item
             */
            currentItemView.$el.trigger('click');
        }
    },
    countMenuGroups: function() {
        return this.menuGroups.length;
    },
    countMenuGroupsViews: function() {
        return this.menuGroupsViews.length;
    },
    countItemsInGroupByIndex: function(index) {
        return this.getGroupByIndex(index).countLis();
    },
    getCurrentGroupIndex: function() {
        return this.getGroupIndexFromId(this.currentItemId);
    },
    getItemViewById: function(id) {
        var ids = id.split('');
        return this.menuGroupsViews[ids[0]].itemViews[ids[1]];
    },
    getItemViewByUrl: function(url) {
        var returnItem = null, group;
        //TODO split url to get a group name and loop only inside group
        for (var i = 0; i < this.menuGroupsViews.length; i++) {
            group = this.menuGroupsViews[i],
                    returnItem = group.getItemViewByUrl(url);
            if (returnItem !== null) {
                console.log('returning: ' + returnItem.model.get('text'));
                return returnItem;
            }
        }
    },
    getGroupViewById: function(id) {
        var ids = id.split('');
        return this.menuGroupsViews[ids[0]];
    },
    getGroupIndexFromId: function(id) {
        return id.split('')[0];
    },
    getGroupByIndex: function(index) {
        var returnValue = this.menuGroupsViews[index];
        return returnValue;
    },
    getGroupNameByIndex: function(index) {
        return this.getGroupByIndex(index).getGroupName();
    },
    render: function() {
        // set starting <li>
//        this.menuGroupsViews[3].itemViews[0].highlight();
    },
    destroy: function() {
        _.invoke(this.menuGroupsViews, 'destroy');
        eventDispatcher.off(GLOBAL_EVENTS.ITEM_CLICKED, this.eventsListener);
    }
});

menuApp.groupView = Backbone.View.extend({
    groupName: '',
    categoryTextDiv: '#categoryText',
    events: {
    },
    initialize: function(options) {
        this.itemViews = [];
        this.$el = options.$ul;
        var lis = this.$el.find('li');
        //proxy used to bind to this
        _.each(lis, $.proxy(function(element, index, list) {
            var $li = $(element),
                    id = options.index + '' + index,
                    text = $.trim($li.text());
            // we get ul passed in and each first item is a header
            if (index === 0) {
                this.groupName = text;
            }
            var itemModel = new menuApp.menuItemModel({id: id, group: this.groupName, text: text});

            var item = new menuApp.itemView({model: itemModel, $el: $li});
            if (item.isGroup()) {
                item.model.set({href: utilsApp.encoder.encodeToURL(this.groupName).toLowerCase()})
            } else {
                item.model.set({href: utilsApp.encoder.encodeToURL(this.groupName + '/' + text).toLowerCase()});
            }
            this.itemViews.push(item);
        }, this));
    },
    listClicked: function() {
        console.log(' <ul> clicked ');
    },
    destroy: function() {
        _.invoke(this.itemViews, 'destroy');
        console.log('off group ' + this.groupName);
//        this.off(); // doesn't seem to bind to any events so no need to call off
    },
    getItemViewByUrl: function(url) {
        var returnItem = null;
        for (var i = 0; i < this.itemViews.length; i++) {
            returnItem = this.itemViews[i];
            if (returnItem.model.get('href') === url) {
                return returnItem;
            }
        }
        return null;
    },
    countLis: function() {
        return this.itemViews.length;
    },
    getGroupName: function() {
        return this.groupName;
    },
    updateCategoryText: function() {
        $(this.categoryTextDiv).text(this.groupName);
    },
    render: function() {

    }
});
menuApp.menuItemModel = Backbone.Model.extend({
    defaults: {
        id: '',
        group: 'not set',
        text: 'not set',
        href: '',
        activeId: '',
        cssClass: ''
    },
    initialize: function() {
//        _.bindAll(this); //without this you cannot use this.id
    }
});
menuApp.itemView = Backbone.View.extend({
    activeClass: 'toactive',
    events: {
        // events to all items in group where clicked item 
        'click': 'itemClicked'//css class to highlight <li>
    },
    initialize: function(options) {
//        _.bindAll(this);
        this.model = options.model;
        this.$el = options.$el;
        this.render();
    },
    render: function() {
//        if (this.model.get('id') === '30') { //set active on startup
//            this.moveMenuPointer();
//            this.addHighlight();
//        }
    },
    /* returns this so you can chain in ul view */
    addHighlight: function() {
        return this.$el.addClass(this.activeClass);
    },
    removeHighlight: function() {
        this.$el.removeClass(this.activeClass);
    },
    moveMenuPointer: function() {
        this.$el.fadeOut(50).fadeIn(50).fadeOut(100).fadeIn(50);
        var offset = this.$el.offset();
        var liHeight = this.$el.height();
        $('#menuPointer .heap').css({height: liHeight + 18});//css({position: 'relative', top: offset.top +'px', left: 0 +'px'});
        $('#menuPointer').offset({top: offset.top + 1, left: offset.left + 250}); //allow for 1px border and move to the right
    },
    getGroupName: function() {
        return this.model.get('group');
    },
    itemClicked: function(event) {
        event.preventDefault();
        var id = this.model.get('id');

        eventDispatcher.trigger(GLOBAL_EVENTS.ITEM_CLICKED, {view: this, type: GLOBAL_EVENTS.ITEM_CLICKED});

        this.addHighlight();
        this.moveMenuPointer();
        var text = $.trim(this.model.get('text')), group = $.trim(this.model.get('group'));
        this.updateJestestu(group, text);
        this.updateTitle(text);
        this.sendGetRequest(group, text);
    },
    isGroup: function() {
        var ulIds = ['00', '10', '20', '30'];
        var idx = _.indexOf(ulIds, this.model.get('id'));
        if (idx === -1) {
            return false
        }
        return true;
    },
    updateJestestu: function(group, text) {
        var $jestestuSpan = $('#jestestu span'),
                separator = ' » ';
        if (group === text) {
            $jestestuSpan.text(group);
        } else {
            $jestestuSpan.text(group + separator + text);
        }
    },
    updateTitle: function(text) {
        console.log('updating title? ');
        $('#contentContainer h1').text(text);
    },
    sendGetRequest: function(group) {
        var rootUrl = 'lukasfloorcom-1.0/',
                ajaxFailed = false;
        var modelurl = this.model.get('href');
        console.log(modelurl);
        Backbone.history.navigate(rootUrl + modelurl);
        var htmlOrig = $('.ajaxSpinner').html();
        var $ajaxSpinner = $('.ajaxSpinner').html(' ');
        var $growl = $('#growl');
        $growl.empty();
        var showErrorFlash = function(message) {
            $growl.append('<div class="errorMessage">' + message + '</div>');
            $('.errorMessage').fadeOut(4200);
        }
        /*rooturl is set in script tag in jsp*/
        var tout = setTimeout(function() {
            $ajaxSpinner.html('<img class="spinner" src="' + rooturl + '/static/images/ajax-loading.gif"> ładuje ...</img>');
        }, 700);
        /* appends models url to existing ending in url */
        var jqxhr = $.ajax({
            url: rooturl + '/' + modelurl,
            type: 'get',
            dataType: 'json',
            timeout: 5000,
            beforeSend: function(xhr) {
                console.log('sending AJAX ... ' + this.url);
                var req = xhr;
            },
            statusCode: {
                404: function(data) {
                    showErrorFlash('&nbsp Nie znaleziono (404)');
                }
            },
            success: function(data) {
                console.log('success ' + data.statusText)

            },
            error: function(data) {
                console.log('error ' + data.statusText);
            },
            complete: function(data) {
                console.log('complete ' + data.statusText);
            }
        }).done(function(data) {
            console.log('done ' + data.statusText);
        }).fail(function(data) {
            ajaxFailed = true;
            console.log('fail 1 ' + data.statuText);
        });
        jqxhr.always(function(data) {
            clearTimeout(tout);
            if (ajaxFailed) {
                console.log('fail 2 ' + data.statusText);
                $ajaxSpinner.html(htmlOrig);
                showErrorFlash('Operacja nie powiodła się. Przepraszamy. (' + data.statusText + ')');
                return;
            }
            $ajaxSpinner.html('<p>' + data.text + '</p>' + '<img src="' + data.image + '">');
        })
    },
    destroy: function() {
        console.log('off item ' + this.model.get('id'));
        this.$el.off();
        this.model.off();

    }
});
menuApp.MyRouter = Backbone.Router.extend({
    isPushState: false,
    initialize: function(options) {
        this.isPushState = options.isPushState;
    },
    routes: {
        "lukasfloorcom-1.0/": "rootpush",
        "lukasfloorcom-1.0/schody": "schody",
        "lukasfloorcom-1.0/schody/:usluga": "schody",
        "/*": "rootnopush"
    },
    rootpush: function() {
        /**
         * for cases when the browser supports push state
         */
        if(this.isPushState)
            eventDispatcher.trigger(GLOBAL_EVENTS.URL_CHANGED, {url: 'witamy', type: GLOBAL_EVENTS.URL_CHANGED});
    },
    rootnopush: function() {
        /**
         * for cases when browser doesn't support push state IE
         */
        if(!this.isPushState)
            eventDispatcher.trigger(GLOBAL_EVENTS.URL_CHANGED, {url: 'witamy', type: GLOBAL_EVENTS.URL_CHANGED});
    },
    schody: function(usluga) {
        console.log('router OK: ' + usluga);
        if (usluga === undefined) {
            eventDispatcher.trigger(GLOBAL_EVENTS.URL_CHANGED, {url: 'schody', type: GLOBAL_EVENTS.URL_CHANGED});
        } else {
            eventDispatcher.trigger(GLOBAL_EVENTS.URL_CHANGED, {url: 'schody/' + usluga, type: GLOBAL_EVENTS.URL_CHANGED});
        }
    }
});
$(function() {
    var enablePushState = true,
            pushState = !!(enablePushState && window.history && window.history.pushState);
    new textimageApp.categoryTextView;
    var imageview = new textimageApp.categoryPictureView();
    var menuview = new menuApp.menuView({isPushState: pushState}),
    router = new menuApp.MyRouter({isPushState: pushState}),
    // Enable pushState for compatible browsers.
    historyHash = {pushState: pushState}
    Backbone.history.start(historyHash);
});
