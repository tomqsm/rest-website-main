var textimageApp = {} || textimageApp;
textimageApp.model = Backbone.Model.extend({
    baseURL: '/lukasfloorcom-1.0',
    fileName: 'fruits',
    imageFileEnd: 'png',
    textFileEnd: 'txt'
});
textimageApp.imageView = Backbone.View.extend({
    //background
    el: '#categoryIllustrator .zero',
    initialize: function() {
        console.log(this.$el.html());
    },
    eventsListener: function() {
        console.log('Image view picked up: ' + GLOBAL_EVENTS.GROUP_CHANGED);
    }
});
textimageApp.textView = Backbone.View.extend({
    el: '#categoryIllustrator .one',
    initialize: function() {
        console.log($el);
    }
});