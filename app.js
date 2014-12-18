/**
 * Created by home on 14-10-31.
 */
//var hello = require("./sample");
//hello.hello();
//console.log(process.argv);

//process.stdin.resume();
//var i = 0;
//process.stdin.on('data', function(data) {
//    process.stdout.write('read from console: ' + data.toString());
//    i++;
//    if(i === 5){
//        process.exit(0);
//    }
//});

//var util = require('util');
//function Person() {
//    this.name = 'byvoid';
//    this.toString = function() {
//        return this.name;
//    };
//}
//var obj = new Person();
//console.log(util.inspect(obj));
//console.log(util.inspect(obj, true, 2, true));
//
//
//var events = require('events');
//var emitter = new events.EventEmitter();
//emitter.on('someEvent', function(arg1, arg2) {
//    console.log('listener1', arg1, arg2);
//});
//emitter.on('someEvent', function(arg1, arg2) {
//    console.log('listener2', arg1, arg2);
//});
//emitter.emit('someEvent', 'byvoid', 1991);
//
//
//var someuser = {
//    name: 'byvoid',
//    display: function(words) {
//        console.log(this.name + ' says ' + words);
//    }
//};
//var foo = {
//    name: 'foobar'
//};
//someuser.display.call(foo, 'hello'); // 输出 foobar says hello
//someuser.display.call(foo, 'world'); // 输出 foobar says hello
//
//someuser.display.apply(foo, ['world']); // 输出 foobar says hello
//
//someuser = {
//    name: 'byvoid',
//    func: function() {
//        console.log(this.name);
//    }
//};
//foo.func = someuser.func;
//foo.func(); // 输出 foobar
//foo.func1 = someuser.func.bind(someuser);
//foo.func1(); // 输出 byvoid
//func = someuser.func.bind(foo);
//func(); // 输出 foobar
//func2 = func;
//func2(); // 输出 foobar
//var func3 = foo.func.bind(someuser);
//func3();
//
//var func4 = func3.bind(foo);
//func4();


/**
 * Created with JetBrains WebStorm.
 * User: hexie
 * Date: 12-12-6
 * Time: 上午9:58
 * To change this template use File | Settings | File Templates.
 */

var async = require('async');
var util = require('util');
var fun = function(err, first) {
    console.log('call ' + first);
}
async.parallel([
    function(callback){
        console.log('1');
        fun(null, 'one');
        callback(null);
    },
    function(callback){
        console.log('2');
        fun(null, 'two');
        callback(null);
    },
    function(callback){
        // arg1 now equals 'three'
        console.log('3');
        fun(null, 'three');
        callback(null);
    }
], function (err, results) {
    console.log(results);
    // result now equals 'done'
      console.log('done');
});
var arrDemo = [];
async.auto({
    func1: function (callback) {
        arrDemo.push('1');
        console.log('fun1')
        callback(null, 1);
    },

    func2: function (callback) {
        arrDemo.push('2');
        console.log('fun2')
        callback(null, 2);
    },
    func3: function (callback) {
        arrDemo.push('3');
        console.log('fun3')
        callback(null);
    },
    func4: function (callback) {
        arrDemo.push('4');
        console.log('fun4')
        callback(null, 4);
    }
}, function(err, results) {
    console.log(arrDemo);
    console.log(results);
});
