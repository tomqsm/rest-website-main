// requires utilsApp
var menuApp = menuApp || {};
menuApp.groupModel = Backbone.Model.extend({
    text: ''
});
menuApp.menuView = Backbone.View.extend({
    el: '#nav',
    menuGroups: $('#nav').find('ul'),
    initialize: function() {
        this.menuGroupsViews = [];
        console.log('found: ' + this.menuGroups.length + ' ul in #nav')
        var self = this;
        _.each(this.menuGroups, function(element, index, list) {
            console.log('index ' + index);
            var $ul = $(element);
            self.menuGroupsViews.push(new menuApp.groupView({$list: $ul}));
        });
        this.render();
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
    getGroupByIndex: function(index) {
        var returnValue = this.menuGroupsViews[index];
        return returnValue;
    },
    getGroupNameByIndex: function(index) {
        return this.getGroupByIndex(index).getGroupName();
    },
    render: function() {
        // set starting <li>
        this.menuGroupsViews[3].itemViews[0].markActive();
    }
});

menuApp.groupView = Backbone.View.extend({
    events: {
        // events to all items in group where clicked item 
//        'click': 'listClicked'
    },
    initialize: function(options) {
        this.itemViews = [];
        this.$el = options.$list;
        var lis = this.$el.find('li');
        var groupName = '';
        //proxy used to bind to this
        _.each(lis, $.proxy(function(element, index, list) {
            var itemModel = new menuApp.menuItemModel();
            var $li = $(element);
            // we get ul passed in and each first item is a header
            if (index === 0) {
                groupName = $li.text().trim();
            }
            itemModel.set({group: groupName});
            itemModel.set({text: $li.text()});
            this.itemViews.push(new menuApp.itemView({model: itemModel, $el: $li, $parentUl: this.$el, parentView: this}));
        }, this));
        this.groupName = groupName;
    },
    listClicked: function(event) {
//        console.log('List clicked after item.');
//        this.render();
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

    },
    setActiveModel: function(model) {
        this.model = model;
    }
});
menuApp.menuItemModel = Backbone.Model.extend({
    defaults: {
        group: 'none',
        text: 'some text',
        href: '',
        active: ''
    },
    initialize: function() {
        publishSubscribe.bind(GLOBAL_EVENTS.GROUP_CHANGED, this.eventsListener);
        this.on('change:active', function() {
            console.log('XXXXXXXXXXXXXXXXXX ');
        });
    },
    eventsListener: function() {
        console.log('Picked up ' + GLOBAL_EVENTS.GROUP_CHANGED);
    }
});
menuApp.itemView = Backbone.View.extend({
    events: {
        // events to all items in group where clicked item 
        'click': 'itemClicked'
    },
    initialize: function(options) {
        this.model = options.model;
        this.$el = options.$el;
        this.$parentUl = options.$parentUl;
        this.parentView = options.parentView;
        this.render();
    },
    render: function() {

    },
    markActive: function() {
        this.$el.fadeOut(50).fadeIn(50).fadeOut(100).fadeIn(50);
        var offset = this.$el.offset();
        var liHeight = this.$el.height();
        console.log('made active');
        $('#menuPointer .heap').css({height: liHeight + 18});//css({position: 'relative', top: offset.top +'px', left: 0 +'px'});
        $('#menuPointer').offset({top: offset.top + 1, left: offset.left + 240});
    },
    destroy: function() {
        console.log('destroying itemView');
    },
    getGroupName: function() {
        return this.model.get('group');
    },
    itemClicked: function(event) {
        event.preventDefault();
        this.parentView.listClicked(); // for want of <ul> actions before <li>
        this.parentView.setActiveModel(this.model);
        console.log('Item clicked before list.');
        var text = this.model.get('text'), group = this.model.get('group');

        // all models will hear this event
//        publishSubscribe.trigger(GLOBAL_EVENTS.GROUP_CHANGED, {groupName: group});
//        if (text === group) {
//            this.model.set({active: true});
//        }
        this.markActive();
        this.updateJestestu(group, text);
        this.updateTitle(text)
        this.sendGetRequest(group, text);
        this.render();
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
        $('#contentContainer h1:first-child').text(text);
    },
    sendGetRequest: function(group, text) {
        var rootUrl = 'lukasfloorcom-1.0/';
        console.log('sending get request from ' + this.model.get('text'));
        if (group === text) {
            var txt = utilsApp.encoder.encodeToURL(group);
            Backbone.history.navigate(rootUrl + txt, true);
        } else {
            Backbone.history.navigate(rootUrl + utilsApp.encoder.encodeToURL(group) + '-' + utilsApp.encoder.encodeToURL(text), true);
//            window.location = this.encodeToUrl(group) + '-' + this.encodeToUrl(text);
        }
    }
});
menuApp.MyRouter = Backbone.Router.extend({
    routes: {
        "lukasfloorcom-1.0/Schody-Instalacja-nowych-schodow": "say"
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

    $("a[rel^='lukasfloor']").prettyPhoto({social_tools:false});
});