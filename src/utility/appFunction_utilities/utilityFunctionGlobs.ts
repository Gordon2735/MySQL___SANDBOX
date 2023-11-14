'use strict';

import { Response, Request, NextFunction } from '../../app.js';

async function setAttributes(
	element: HTMLElement | undefined,
	attributes: object | string | any
): Promise<void> {
	Object.keys(attributes).map((keys: string): void => {
		try {
			element?.setAttribute(keys, attributes[keys]);
		} catch (error: unknown) {
			console.error(`Error in setAttributes: ${error}`);
		}
	}) as void[];
	return;
}
// async function setAttributes(
// 	element: HTMLElement,
// 	attributes: object | string | any
// ): Promise<void> {
// 	Object.keys(attributes).map((keys: string | any): Promise<void> => {
// 		try {
// 			return Promise.resolve()
// 				.then(() => {
// 					element.setAttribute(keys, attributes[keys]);
// 				})
// 				.then(() => {
// 					console.log(
// 						`element: ${element} as the following key/attributes added: ${keys}: ${attributes}`
// 					);
// 				})
// 				.catch((error: any) => {
// 					console.error(
// 						`Error in setAttributes: ${error} for element: ${element} with the following key/attributes added: ${keys}: ${attributes}`
// 					);
// 					return Promise.reject() as Promise<void>;
// 				}) as Promise<void>;
// 		} catch (error: unknown) {
// 			console.error(`Error in setAttributes: ${error}`);

// 			return Promise.reject() as Promise<void>;
// 		}
// 	});
// }

async function appendChildren(
	parent: HTMLElement,
	[...children]: HTMLElement[]
): Promise<void> {
	try {
		let child: HTMLElement | any | null = null;

		for (child in children) {
			parent.appendChild(child);
		}
		console.log(
			`parent: ${parent} had the following children added: ${children}`
		);
	} catch (error: unknown) {
		console.error(`Error in appendChildren: ${error}`);
	}
}
// async function appendChildren(
// 	parent: HTMLElement,
// 	[...children]: HTMLElement[]
// ): Promise<void> {
// 	try {
// 		let child: HTMLElement | any | null = null;
// 		return Promise.resolve()
// 			.then(() => {
// 				for (child in children) {
// 					parent.appendChild(child);
// 				}
// 			})
// 			.then(() => {
// 				console.log(
// 					`parent: ${parent} had the following children added: ${children}`
// 				);
// 			})
// 			.catch((error: any) => {
// 				console.error(
// 					`Error in appendChildren: ${error} for parent: ${parent} had the following children added: ${children}`
// 				);
// 				return Promise.reject() as Promise<void>;
// 			}) as Promise<void>;
// 	} catch (error: unknown) {
// 		console.error(`Error in appendChildren: ${error}`);

// 		return Promise.reject() as Promise<void>;
// 	}
// }

async function status500(
	req: Request,
	res: Response,
	_next: NextFunction
): Promise<void> {
	try {
		res.status(500).send('Server Error');
		// next();
		console.info(
			`
				%c
				req.url: ${req.url},
				req.body.username: ${req.body.username},
				req.body.password: ${req.body.password},
				req.body.id: ${req.body.id}					
			`,
			`
				color: chartreuse;
				font-family: 'Titillium Web', sans-serif; 
				font-size: 0.85rem;
				font-weight: bold;
				background-color: black;						
			`
		);
		// next();
		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		res.status(500).send(
			`
				<p class="status-500">
					Post Login Error: ${(error as Error).message}
				</p>
			`
		);
		// next();
		console.info(
			`
				%c
				req.url: ${req.url},
				req.body.username: ${req.body.username},
				req.body.password: ${req.body.password},
				req.body.id: ${req.body.id}					
			`,
			`
				color: chartreuse;
				font-family: 'Titillium Web', sans-serif; 
				font-size: 0.85rem;
				font-weight: bold;
				background-color: black;						
			`
		);
		return Promise.reject() as Promise<void>;
	}
}

export { setAttributes as default, appendChildren, status500 };
