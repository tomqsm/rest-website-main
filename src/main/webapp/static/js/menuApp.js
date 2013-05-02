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
    initialize: function(listObject) {
        this.itemView = [];
        this.el = listObject.$list;
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
        var text = this.model.get('text');
        alert('clicked ' + event.target.parentElement.offsetTop);
        
    }
});
$(function() {
//    var itemview = new menuApp.itemView();
    var menuview = new menuApp.menuView();
});