'use strict';

console.log('MySQL Essential Training || LinkedIn Learning');

const button: HTMLElement | null = document.getElementById('indexBtn');

button?.addEventListener('click', (event: MouseEvent) => {
	event.preventDefault();
	console.log('indexBtn EventListener fired');
	window.location.href = '/register';
});
