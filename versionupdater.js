var fs = require('fs');
var util = require('util');
var pathToDeveloperProperties = 'src/main/resources/developer.properties'
function getProperty(name, properties) {
    var lineRegEx = new RegExp('(\s*' + name + '\s*\=\s*.*)', "g"),
            line = properties.match(lineRegEx),
            valueRegEx = /(?=)[\d/\s:\.]+/g,
            value = line[0].match(valueRegEx);
    return {
        line: line.toString(), lineRegEx: lineRegEx,
        value: value.toString(), valueRegEx: valueRegEx
    }
}
fs.readFile(pathToDeveloperProperties, 'UTF-8', function(err, data) {
    var properties = data.toString();
    var versionProp = getProperty('version', properties),
            lastupdateProp = getProperty('lastupdate', properties),
            matches, major, mid, minor;

    try {
        matches = versionProp.line.match(/(\d+)/g);
        major = parseInt(matches[0]), mid = parseInt(matches[1]), minor = parseInt(matches[2]);
        var isCaclulated = false;
        var versionBefore = 'version=' + major + '.' + mid + '.' + minor;
        if (minor < 99 && isCaclulated === false) {
            ++minor;
            isCaclulated = true;
        } else {
            minor = 0;
        }
        if (isCaclulated === false) {
            if (mid < 99) {
                ++mid;
                isCaclulated = true;
            } else {
                mid = 0;
            }
        }
        if (!isCaclulated) {
            if (!isCaclulated) {
                ++major;
            }
        }
        var versionAfter = 'version=' + major + '.' + mid + '.' + minor,
        updatedProperties = properties.replace(versionProp.lineRegEx, versionAfter.trim()),
        presentDate = dateFormat(new Date(), '%d/%m/%Y %H:%M', true),
        lastUpdateAfter = lastupdateProp.line.replace(lastupdateProp.valueRegEx, presentDate);
        updatedProperties = updatedProperties.replace(lastupdateProp.lineRegEx, lastUpdateAfter);

        fs.writeFile(pathToDeveloperProperties, updatedProperties);
        console.info(versionBefore + ' -> ' + versionAfter);
        console.info(lastupdateProp.value + ' -> ' + presentDate);

    } catch (e) {
        console.error('Could not find \'version\' property in ' + pathToDeveloperProperties + e + '\n' + __filename);
    }
});

function dateFormat(date, fstr, utc) {
    utc = utc ? 'getUTC' : 'get';
    return fstr.replace(/%[YmdHMS]/g, function(m) {
        switch (m) {
            case '%Y':
                return date[utc + 'FullYear'](); // no leading zeros required
            case '%m':
                m = 1 + date[utc + 'Month']();
                break;
            case '%d':
                m = date[utc + 'Date']();
                break;
            case '%H':
                m = date[utc + 'Hours']();
                break;
            case '%M':
                m = date[utc + 'Minutes']();
                break;
            case '%S':
                m = date[utc + 'Seconds']();
                break;
            default:
                return m.slice(1); // unknown code, remove %
        }
        // add leading zero if required
        return ('0' + m).slice(-2);
    });
}