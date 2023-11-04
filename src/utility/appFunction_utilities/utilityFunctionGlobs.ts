'use strict';

async function setAttributes(
	element: HTMLElement,
	attributes: object | string | any
): Promise<void> {
	Object.keys(attributes).map((keys: string | any): Promise<void> => {
		try {
			return Promise.resolve()
				.then(() => {
					element.setAttribute(keys, attributes[keys]);
				})
				.then(() => {
					console.log(
						`element: ${element} as the following key/attributes added: ${keys}: ${attributes}`
					);
				})
				.catch((error: any) => {
					console.error(
						`Error in setAttributes: ${error} for element: ${element} with the following key/attributes added: ${keys}: ${attributes}`
					);
					return Promise.reject() as Promise<void>;
				}) as Promise<void>;
		} catch (error: unknown) {
			console.error(`Error in setAttributes: ${error}`);

			return Promise.reject() as Promise<void>;
		}
	});
}

async function appendChildren(
	parent: HTMLElement,
	[...children]: HTMLElement[]
): Promise<void> {
	try {
		let child: HTMLElement | any | null = null;
		return Promise.resolve()
			.then(() => {
				for (child in children) {
					parent.appendChild(child);
				}
			})
			.then(() => {
				console.log(
					`parent: ${parent} had the following children added: ${children}`
				);
			})
			.catch((error: any) => {
				console.error(
					`Error in appendChildren: ${error} for parent: ${parent} had the following children added: ${children}`
				);
				return Promise.reject() as Promise<void>;
			}) as Promise<void>;
	} catch (error: unknown) {
		console.error(`Error in appendChildren: ${error}`);

		return Promise.reject() as Promise<void>;
	}
}

export { setAttributes as default, appendChildren };
