'use strict';

var re = require( './../lib' );

var base;

// Assuming a POSIX platform...
base = re.exec( '/foo/bar/index.js' )[ 1 ];
console.log( base );
// returns 'index.js'

base = re.posix.exec( '/foo/bar/home.html' )[ 1 ];
console.log( base );
// returns 'home.html'

base = re.win32.exec( 'C:\\foo\\bar\\home.html' )[ 1 ];
console.log( base );
// returns 'home.html'
