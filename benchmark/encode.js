var polyline = require( '..' )
var leaflet = require('polyline-encoded')
var example = require( '../test/data/example-01' )

suite( 'encode', function() {

  bench( '3 points', function() {
    return polyline.encode([
      [ 38.5, -120.2 ],
      [ 40.7, -120.95 ],
      [ 43.252, -126.453 ]
    ])
  })

  bench( '~350 points', function() {
    return polyline.encode( example.points )
  })

})

suite( 'leaflet encode', function() {

  bench( '3 points', function() {
    return leaflet.encode([
      [ 38.5, -120.2 ],
      [ 40.7, -120.95 ],
      [ 43.252, -126.453 ]
    ])
  })

  bench( '~350 points', function() {
    return leaflet.encode( example.points )
  })

})
