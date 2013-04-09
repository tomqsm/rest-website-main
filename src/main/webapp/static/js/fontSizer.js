var FontSizerModel = Backbone.Model.extend({
    defaults: {
        text: 'This is my sample text'
    },
    initialize: function () {}
})
var FontSizerContainer = Backbone.View.extend({
    tagName: 'div',
    events: {
        
    },
    initialize: function (options) {
        this.model = options.model;
        console.log('font sizer initialised');
        console.log('font sizer model text: ' + this.model.get('text'));
        this.render(this.model);
    },
    render: function (model) {
        console.log('render function run');
        console.log($('.fontScaler').text(model.get('text')).height());
    }
})
$(function() {
  new FontSizerContainer({model: new FontSizerModel()});
});