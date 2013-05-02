module('menuApp overall', {
    setup: function() {
        this.menuAppView = new menuApp.menuView();
    },
    teardown: function() {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        this.menuAppView = null;
//        this.menuAppView.destroy();
    }
});
test('counts menu groups correctly', function() {
    equal(this.menuAppView.countMenuGroups(), 4, 'should count menu groups');
});
test('counts menu groups views correctly', function() {
    equal(this.menuAppView.countMenuGroupsViews(), 4, 'should count menu groups');
});
test('counts lis in groups', function() {
    equal(this.menuAppView.countItemsInGroupByIndex(0), 3);
    equal(this.menuAppView.countItemsInGroupByIndex(1), 3);
    equal(this.menuAppView.countItemsInGroupByIndex(2), 4);
    equal(this.menuAppView.countItemsInGroupByIndex(3), 3);
});
test('gets group name by index', function() {
    equal(this.menuAppView.getGroupNameByIndex(0), 'Podłoga');
    equal(this.menuAppView.getGroupNameByIndex(1), 'Schody');
    equal(this.menuAppView.getGroupNameByIndex(2), 'Obsługa klienta');
    equal(this.menuAppView.getGroupNameByIndex(3), 'Strona startowa');
});
//test('gets text from model name by index', function(){
//    equal(this.menuAppView.getGroupNameByIndex(0), 'Podłoga');
//    equal(this.menuAppView.getGroupNameByIndex(1), 'Schody');
//    equal(this.menuAppView.getGroupNameByIndex(2), 'Obsługa klienta');
//    equal(this.menuAppView.getGroupNameByIndex(3), 'Strona startowa');
//});