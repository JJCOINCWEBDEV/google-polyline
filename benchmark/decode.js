var fs = require('fs');
var leaflet = require('polyline-encoded');
var polyline = require( '..' );
var example = require( '../test/data/example-01' );

function readPolyline(filename) {
  var path = [__dirname, '../test/data', filename].join('/');
  return fs.readFileSync(path, 'utf8');
}

var huge = readPolyline('usa.txt');

suite( 'decode', function() {

  bench( '3 points', function() {
    return polyline.decode( '_p~iF~ps|U_ulLnnqC_mqNvxq`@' );
  });

  bench( '~350 points', function() {
    return polyline.decode( example.polyline );
  });

  bench( '~35000 points', function() {
    return polyline.decode( huge );
  });
});

suite('leaflet decode', function() {

  bench( '3 points', function() {
    return leaflet.decode( '_p~iF~ps|U_ulLnnqC_mqNvxq`@' );
  });

  bench( '~350 points', function() {
    return leaflet.decode( example.polyline );
  });

  bench( '~35000 points', function() {
    return leaflet.decode( huge );
  });
});
