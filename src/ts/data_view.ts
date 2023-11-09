'use strict';

console.info(`data_view.ts is running...`);

let td_counter: number = 0;

const td_counterElement: HTMLElement | null =
	document.getElementById('td_counter');

if (td_counterElement) {
	let counter = (td_counterElement.innerHTML = `${td_counter++}`);
	// td_counterElement.insertAdjacentHTML('afterbegin', `${td_counter++}`);
	console.info(`td_counter: ${td_counter++}, counter: ${counter}`);
}
