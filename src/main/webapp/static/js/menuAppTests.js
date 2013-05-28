module('menuApp overall', {
    setup: function() {
        this.menuAppView = new menuApp.menuView();
    },
    teardown: function() {
        this.menuAppView.destroy();
    }
});
test('#1 counts menu groups correctly', function() {
    equal(this.menuAppView.countMenuGroups(), 4, 'should count menu groups');
}); 
test('#2 counts menu groups views correctly', function() {
    equal(this.menuAppView.countMenuGroupsViews(), 4, 'should count menu groups');
});
test('#3 counts lis in groups', function() {
    equal(this.menuAppView.countItemsInGroupByIndex(0), 3);
    equal(this.menuAppView.countItemsInGroupByIndex(1), 3);
    equal(this.menuAppView.countItemsInGroupByIndex(2), 5);
    equal(this.menuAppView.countItemsInGroupByIndex(3), 3);
});
test('#4 gets group name by index', function() {
    equal(this.menuAppView.getGroupNameByIndex(0), 'Podłoga');
    equal(this.menuAppView.getGroupNameByIndex(1), 'Schody');
    equal(this.menuAppView.getGroupNameByIndex(2), 'Obsługa klienta');
    equal(this.menuAppView.getGroupNameByIndex(3), 'Witamy');
});
test('#5 gets correct view by id', function(){
    equal(this.menuAppView.getItemViewById('30').model.get('group'), 'Witamy');
});
test('gets view item by url', function(){
   var url = 'schody/odnowa-schodow' ;
   var itemView = this.menuAppView.getItemViewByUrl(url);
   notEqual(itemView, null);
   equal(itemView, 'object');
});
