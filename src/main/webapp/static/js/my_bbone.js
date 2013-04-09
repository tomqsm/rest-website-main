var Item = Backbone.Model.extend({
  defaults: {
    price: 35,
    photo: "http://www.placedog.com/100/100"
  }
});

var Cart = Backbone.Collection.extend({
  model: Item
});

var collection = new Cart({title: "football"});
collection.at(0).get("price"); //35

var items = [
  {title: "Macbook Air", price: 799},
  {title: "Macbook Pro", price: 999},
  {title: "The new iPad", price: 399},
  {title: "Magic Mouse", price: 50},
  {title: "Cinema Display", price: 799}
];

var ItemView = Backbone.View.extend({
  tagName: "div",
  className: "item-wrap",
  template: $("#itemTemplate").html(),

  render: function() {
    var templ = _.template(this.template);
    // $el referes to this element
    this.$el.html(templ(this.model.toJSON()));
    return this;
  }
});

var CartCollectionView = Backbone.View.extend({
  el: $("#yourcart"),
  initialize: function() {
    this.collection = new Cart(items);
    this.render();
  },
    render: function() {
        this.collection.each(function(item) {
            var itemView = new ItemView({
                model: item
            });
            this.$el.append(itemView.render().el);
        }, this);
    }
});

$(function() {
  var cart = new CartCollectionView();
});
