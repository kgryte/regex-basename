/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	proxyquire = require( 'proxyquire' ),
	re = require( './../lib' );


// VARIABLES //

var assert = chai.assert;


// TESTS //

describe( 'regex-basename', function tests() {

	it( 'should export a regular expression', function test() {
		assert.isTrue( re instanceof RegExp );
	});

	it( 'should export a regular expression for POSIX paths', function test() {
		assert.isTrue( re.posix instanceof RegExp );
	});

	it( 'should export a regular expression for Windows paths', function test() {
		assert.isTrue( re.win32 instanceof RegExp );
	});

	it( 'should export a POSIX specific regular expression if on a POSIX platform', function test() {
		var re;

		re = proxyquire( './../lib', {
			'check-if-windows': false
		});

		assert.strictEqual( re, re.posix );
	});

	it( 'should export a Windows specific regular expression if on a Windows platform', function test() {
		var re;

		re = proxyquire( './../lib', {
			'check-if-windows': true
		});

		assert.strictEqual( re, re.win32 );
	});

	it( 'should capture POSIX path basenames', function test() {
		var expected,
			values,
			base,
			i;

		values = [
			'index.js',
			'/foo/bar/home.html'
		];

		expected = [
			'index.js',
			'home.html'
		];

		for ( i = 0; i < values.length; i++ ) {
			base = re.posix.exec( values[ i ] )[ 1 ];
			assert.strictEqual( base, expected[ i ], values[ i ] );
		}
	});

	it( 'should capture Windows path basenames', function test() {
		var expected,
			values,
			base,
			i;

		values = [
			'index.js',
			'C:\\foo\\bar\\home.html'
		];

		expected = [
			'index.js',
			'home.html'
		];

		for ( i = 0; i < values.length; i++ ) {
			base = re.win32.exec( values[ i ] )[ 1 ];
			assert.strictEqual( base, expected[ i ], values[ i ] );
		}
	});

});
