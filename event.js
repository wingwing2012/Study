/**
 * Created by home on 14-10-31.
 */
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_event', function() {
    console.log('some_event occured.');
});
setTimeout(function() {
    event.emit('some_event');
}, 2000);