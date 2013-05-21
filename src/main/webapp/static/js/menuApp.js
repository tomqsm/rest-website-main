// requires utilsApp
var menuApp = menuApp || {};
menuApp.menuView = Backbone.View.extend({
    previousItemId: '30',
    currentItemId: '30',
    el: '#nav',
    menuGroups: $('#nav').find('ul'),
    initialize: function() {
        _.bindAll(this);
        eventDispatcher.bind(GLOBAL_EVENTS.ITEM_CLICKED, this.eventsListener);
        this.menuGroupsViews = [];
        console.log('found: ' + this.menuGroups.length + ' ul in #nav')
        var self = this;
        _.each(this.menuGroups, function(ul, index, list) { // there are 4 ul
            var groupView = new menuApp.groupView({$ul: $(ul), index: index});
            self.menuGroupsViews.push(groupView);
        });
    },
    eventsListener: function(data) {
        var previousItemView = this.getItemViewById(this.previousItemId);
        var currentItemView = this.getItemViewById(data.itemId).addHighlight();
        previousItemView.removeHighlight();
        this.currentItemId = data.itemId;
        if (this.previousItemId === this.currentItemId) {
            // nothing changed
        } else {
            if (this.getGroupIndexFromId(this.previousItemId) === this.getGroupIndexFromId(data.itemId)) {
                // group hasn't changed
            } else {
                console.log('group has changed to ' + this.getCurrentGroupIndex());
            }
        }
        this.previousItemId = data.itemId;
    },
    destroy: function() {
        console.log('destroying menu view');
        // Calls the method named by destroy on each value in the list. 
        // Any extra arguments passed to invoke will be forwarded on to the method invocation.
        _.invoke(this.menuGroupsViews, 'destroy');
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
    }
});

menuApp.groupView = Backbone.View.extend({
    groupName: '',
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
                item.model.set({href: utilsApp.encoder.encodeToURL(this.groupName + ' ' + text).toLowerCase()});
            }
            this.itemViews.push(item);
        }, this));
    },
    listClicked: function() {
        console.log(' <ul> clicked ');
    },
    destroy: function() {
        console.log('destroying group view');
        _.invoke(this.itemViews, 'destroy');
    },
    countLis: function() {
        return this.itemViews.length;
    },
    getGroupName: function() {
        return this.groupName;
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
        _.bindAll(this); //without this you cannot use this.id

    },
});
menuApp.itemView = Backbone.View.extend({
    events: {
        // events to all items in group where clicked item 
        'click': 'itemClicked'
    },
    initialize: function(options) {
        _.bindAll(this);
        this.model = options.model;
        this.activeClass = 'toactive'; //css class to highlight <li>
        this.$el = options.$el;
        this.render();
    },
    render: function() {
        if (this.model.get('id') === '30') { //set active on startup
            this.moveMenuPointer();
            this.addHighlight();
        }
    },
    addHighlight: function() {
        this.$el.addClass(this.activeClass);
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
    destroy: function() {
        console.log('destroying itemView');
    },
    getGroupName: function() {
        return this.model.get('group');
    },
    itemClicked: function(event) {
        event.preventDefault();
        var id = this.model.get('id');

        eventDispatcher.trigger(GLOBAL_EVENTS.ITEM_CLICKED, {itemId: id, type: GLOBAL_EVENTS.ITEM_CLICKED});

        this.addHighlight();
        this.moveMenuPointer();
        var text = $.trim(this.model.get('text')), group = $.trim(this.model.get('group'));
        this.updateJestestu(group, text);
        this.updateTitle(text);
        this.sendGetRequest(group, text);
    },
    isGroup: function() {
        var idx = _.indexOf(['00', '10', '20', '30'], this.model.get('id'));
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
        
        Backbone.history.navigate(rootUrl + _.escape(this.model.get('href')));
        var htmlOrig = $('.ajaxSpinner').html();
        var $ajaxSpinner = $('.ajaxSpinner').html(' ');
        var $growl = $('#growl');
        $growl.empty();
        var showErrorFlash = function(message) {
            $growl.append('<div class="errorMessage">' + message + '</div>');
            $('.errorMessage').fadeOut(4200);
        }
        var tout = setTimeout(function() {
            $ajaxSpinner.html('<img class="spinner" src="static/images/ajax-loading.gif"> ładuje ...</img>');
        }, 700);

        var jqxhr = $.ajax({
            url: this.model.get('href'),
            type: 'get',
            dataType: 'json',
            timeout: 5000,
            beforeSend: function(xhr) {
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
            },
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
    }
});
menuApp.MyRouter = Backbone.Router.extend({
    routes: {
        "lukasfloorcom-1.0/schody-odnowa-schodow": "say"
    },
    say: function() {
        alert('hello');
    }
});
$(function() {
    new textimageApp.imageView();
    var menuview = new menuApp.menuView(),
            router = new menuApp.MyRouter(),
            // Enable pushState for compatible browsers.
            enablePushState = true,
            pushState = !!(enablePushState && window.history && window.history.pushState),
//    historyHash = {};
//    if (pushState) {
//        historyHash = {pushState: pushState, root: 'lukasfloorcom-1.0/'}
//    } else {
//        historyHash = {pushState: pushState}
//    }
            historyHash = {pushState: pushState}
    Backbone.history.start(historyHash);
//    var itemview = new menuApp.itemView();

    $("a[rel^='lukasfloor']").prettyPhoto({social_tools: false});
});