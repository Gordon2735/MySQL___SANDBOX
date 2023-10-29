'use strict';

async function setAttributes(
	element: HTMLElement,
	attributes: object | string | any
): Promise<void> {
	Object.keys(attributes).map((keys: string | any): Promise<void> => {
		try {
			element.setAttribute(keys, attributes[keys]);
			Promise.resolve()
				.then(() => {
					console.log(
						`element: ${element} as the following key/attributes added: ${keys}: ${attributes}`
					);
					return;
				})
				.catch((error: any) => {
					console.error(
						`Error in setAttributes: ${error} for element: ${element} with the following key/attributes added: ${keys}: ${attributes}`
					);
				});

			return Promise.resolve() as Promise<void>;
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
		for (child in children) {
			parent.appendChild(child);
		}

		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(`Error in appendChildren: ${error}`);

		return Promise.reject() as Promise<void>;
	}
}

export { setAttributes as default, appendChildren };
