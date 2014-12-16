var log = require('../../server/lib/logger')();
var db = require('../../server/lib/db');
var app = require('../../server/app.js');
app.db = db;
var request = require('supertest');
var chai = require('chai');
chai.should();

global.app = app;
global.expect = chai.expect;
global.assert = chai.assert;
global.request = request;
