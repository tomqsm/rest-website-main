
// utils application 
var utilsApp = {} || utilsApp;
utilsApp.encoder = {
    encodeToURL: function(someString) {
        var encoded, disallowed = 'ĄąĘęŚśŻżŹźÓóŁłŃń', allowed = 'AaEeSsZzZzOoLlNn';
        encoded = utilsApp.replace(disallowed, allowed, someString);
        return encoded;
    }
}
utilsApp.replace = function(disallowed, allowed, string) {
    var encoded = string.replace(/ /g, '-');
    _.each(disallowed.split(""), function(element, index, list) {
        var regex = new RegExp(element, "gi");
        encoded = encoded.replace(regex, allowed[index + 1]);
    });
    return encoded;
};
