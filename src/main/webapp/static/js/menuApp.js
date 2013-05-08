var menuApp = menuApp || {};
menuApp.groupModel = Backbone.Model.extend({
    text: ''
});
menuApp.menuView = Backbone.View.extend({
    el: '#nav',
    menuGroups: this.$('ul'),
    initialize: function() {
        this.menuGroupsViews = [];
        var self = this;
        _.each(this.menuGroups, function(element, index, list) {
            var $ul = $(element);
            self.menuGroupsViews.push(new menuApp.groupView({$list: $ul}));
        });
        this.render();
    },
    destroy: function() {
        console.log('destroying menu view');
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
//re-rendering the App just means refreshing the statistics -- the rest of the app doesn't change.
    render: function() {
//        $(this.menuGroups[2]).hide();
    }
});

menuApp.groupView = Backbone.View.extend({
    initialize: function(options) {
        this.itemView = [];
        this.el = options.$list;
        var lis = this.el.find('li');
        var groupName = '';
        //proxy used to bind to this
        _.each(lis, $.proxy(function(element, index, list) {
            var itemModel = new menuApp.menuItemModel();
            var $li = $(element);
            // we get ul passed in and each first item is a header
            if (index === 0) {
                groupName = $li.text();
            }
            itemModel.set({group: groupName});
            itemModel.set({text: $li.text()});
            this.itemView.push(new menuApp.itemView({model: itemModel, el: $li}));
        }, this));
        this.groupName = groupName;
    },
    destroy: function() {
        console.log('destroying group view');
        _.invoke(this.itemView, 'destroy');
    },
    countLis: function() {
        return this.itemView.length;
    },
    getGroupName: function() {
        return this.groupName;
    }
});
menuApp.menuItemModel = Backbone.Model.extend({
    defaults: {
        group: 'none',
        text: 'some text',
        href: '',
        active: ''
    }
});
menuApp.itemView = Backbone.View.extend({
    events: {
        // events to all items in group where clicked item 
        'click': 'activateLi'
    },
    initialize: function(options) {
        this.model = options.model;
        this.el = options.el;
    },
    destroy: function() {
        console.log('destroying itemView');
    },
    getGroupName: function() {
        return this.model.get('group');
    },
    activateLi: function(event) {
        var text = this.model.get('text'), group = this.model.get('group');
        event.preventDefault();
        this.updateJestestu(group, text);
        this.sendGetRequest(group, text);
    },
    updateJestestu: function(group, text) {
        var $jestestuSpan = $('#jestestu span'),
                separator = ' » ';

//        alert('clicked ' + event.target.parentElement.offsetTop);
        if (group === text) {
            $jestestuSpan.text(group);
        } else {
            $jestestuSpan.text(group + separator + text);
        }
        $('#contentContainer h1').text(separator + text);
    },
    sendGetRequest: function(group, text) {
        var rootUrl = 'lukasfloorcom-1.0/';
        console.log('sending get request from ' + this.model.get('text'));
        if (group === text) {
            window.location.hash = group;
        } else {
            Backbone.history.navigate(this.encodeToUrl(group) + '-' + this.encodeToUrl(text), true);
//            window.location = this.encodeToUrl(group) + '-' + this.encodeToUrl(text);
        }
        // todo
    },
    encodeToUrl: function(textToEncode) {
        var encoded, disallowed = 'ĄąĘęŚśŻżŹźÓóŁłŃń', allowed = 'AaEeSsZzZzOoLlNn';
        encoded = this.replace(disallowed, allowed, textToEncode);
        return encoded;
    },
    replace: function(disallowed, allowed, string) {
        var encoded = string.replace(/ /g, '-');
        _.each(disallowed.split(""), function(element, index, list) {
            var regex = new RegExp(element, "gi");
            encoded = encoded.replace(regex, allowed[index + 1]);
        });
        return encoded;
    }
});
menuApp.MyRouter = Backbone.Router.extend({
    routes: {
        "Schody-Instalacja-nowych-schodow": "say"
    },
    say: function() {
        alert('hello');
    }
});
$(function() {
    // Enable pushState for compatible browsers.
    var menuview = new menuApp.menuView(),
    router = new menuApp.MyRouter(),
    enablePushState = true,
    pushState = !!(enablePushState && window.history && window.history.pushState),
    historyHash = {pushState: pushState};
//    if (pushState) {
//        historyHash = {pushState: pushState}
//    } else {
//        historyHash = {pushState: pushState, root: 'lukasfloorcom-1.0/'}
//    }
    Backbone.history.start(historyHash);
//    var itemview = new menuApp.itemView();
});