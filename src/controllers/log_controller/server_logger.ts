'use strict';

// import { EventEmitter } from 'node:events';

// ServerEmitter();

// async function ServerEmitter(): Promise<void> {
// 	const serverEmitter: EventEmitter = new EventEmitter();
// 	serverEmitter.on('foo', () => console.log('a'));
// 	serverEmitter.prependListener('foo', () => console.log('b'));
// 	serverEmitter.emit('foo');
// 	// First listener
// 	serverEmitter.on('event', function firstListener() {
// 		console.log('Hello! first listener');
// 	});
// 	// Second listener
// 	serverEmitter.on('event', function secondListener(arg1, arg2) {
// 		console.log(
// 			`event with parameters ${arg1}, ${arg2} in second listener`
// 		);
// 	});
// 	// Third listener
// 	serverEmitter.on('event', function thirdListener(...args) {
// 		const parameters: string = args.join(', ');
// 		console.log(`event with parameters ${parameters} in third listener`);
// 	});

// 	console.log(serverEmitter.listeners('event'));

// 	serverEmitter.emit('event', 1, 2, 3, 4, 5);
// }
