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