var PointerModel = Backbone.Model.extend({
    defaults: {
        text: 'default text',
        cssClass: 'pointerOff',
        isRolling: true
    },
    initialize: function() {
        this.on('change:cssClass', function() {
//            console.log('model listens to cssClass property change: ' + this.get('text'))
        })
    }
}),
PointersCollection = Backbone.Collection.extend({
    model: PointerModel
}),
PointerView = Backbone.View.extend({
    tagName: 'div',
    className: 'leftPointer ',
    events: {
        'click': 'whenClicked'
    },
    /**/
    initialize: function(options) {
        this.vent = options.vent;
    },
    whenClicked: function(e) {
// produces event markActiveEvent and encloses data
        this.vent.trigger('markActiveEvent', {modelView: this});
        this.vent.trigger('doAjaxGetJson', {modelView: this});
    },
    render: function() {
        this.$el.html('<span class="pointerText">' + this.model.get('text') + '</span>');
        this.$el.addClass(this.model.get('cssClass'));
//        console.log('rendering pointer: ' + this.el.outerHTML + ' model id: ' + this.model.get('id'));
//        this.$el.html();
        return this;
    },
    markActive: function() {
        this.$el.parent().find('.leftPointer').removeClass('pointerOn').addClass('pointerOff');
        this.$el.removeClass('pointerOff').toggleClass('pointerOn');
        this.$el.fadeIn();
    }
}),
PointersView = Backbone.View.extend({
    el: $("#leftPointers"),
    template: $('#pointersTemplate').html(),
    events: {
        'click .leftPointer': 'whenClicked'
    },
    pointerViews: [],
    currentPointer: 0,
    interval: null,
    /* initialise runs on startup */
    initialize: function(options) {
        this.vent = options.vent;
        /* bindAll binds this to all functions in render pointer */
        _.bindAll(this, 'renderPointer', 'pointerInterval', 'intervalMarker', 'doAjaxGetJson'); //needs to be 'proxied'
        this.collection = new PointersCollection([
            {id: 0, cssClass: 'pointerOn', text: 'Klienci indywidualni'},
            {id: 1, text: 'Instytucje i firmy'},
            {id: 2, text: 'Deweloperzy www'}
        ]);
        _.bind(this.eventFunction, this);
        // registers event function on event markActiveEvent
        this.vent.bind('markActiveEvent', this.eventFunction);
        this.vent.bind('doAjaxGetJson', this.doAjaxGetJson);
        this.render();
        this.intervalMarker();
    },
    renderPointer: function(pointer) {
        var pointerView = new PointerView({model: pointer, vent: this.vent});
        this.pointerViews.push(pointerView);
        pointerView.render();
        this.$el.append(pointerView.el);
    },
    render: function() {
        this.collection.each(this.renderPointer); // needs to be proxied because is passed in
        return this;
    },
    whenClicked: function(event) {
        if (this.interval !== null) {
            clearInterval(this.interval);
//            console.log('cleared interval')
        }
        event.preventDefault();
//        var id = $(event.currentTarget).data('id');
//        console.log('clicked: in collection');
//        console.log('from model: ' + this.collection.get(id).get('text'));
//        event.target.style.backgroundColor = 'blue';
    },
    /* registered   */
    eventFunction: function(pointerView) {
        pointerView.modelView.markActive();
        this.currentPointer = pointerView.modelView.model.get('id');
//        console.log('currentPointer: ' + this.currentPointer);
    },
    startIntervalMarker: function(fn, t) {
        fn();
        return setInterval(fn, t);
    },
    pointerInterval: function() {
        this.pointerViews[this.currentPointer++].markActive();
        if (this.currentPointer === this.collection.length) {
            this.currentPointer = 0;
        }
    },
    intervalMarker: function() {
        this.interval = this.startIntervalMarker(this.pointerInterval, 3000);
    },
    doAjaxGetJson: function(pointerView) {
        $.getJSON('/website-1.0/message/' + (pointerView.modelView.model.get('id')+1), function(data) {
            alert(data.text);
        });
    }
}),
MyController = Backbone.Router.extend({
    routes: {
        "website-1.0/rest": "say"
    },
    say: function(something) {
        alert('hello');
    }
}),
pubsub = _.extend({}, Backbone.Events);
$(function() {
    new PointersView({vent: pubsub});
    new MyController();
    // Enable pushState for compatible browsers.
    var enablePushState = true;
    var pushState = !!(enablePushState && window.history && window.history.pushState);
    Backbone.history.start({pushState: pushState});
});
