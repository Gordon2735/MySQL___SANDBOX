'use strict';

import { Response, Request, NextFunction } from '../app.js';
import {
	PopoverElement,
	ButtonElementWithPopover
} from '../@types/interfaces/interfaces.js';
import { status500 } from '../utility/appFunction_utilities/utilityFunctionGlobs.js';

console.info(`You have routed to the Login page.`);

const request: Request = {} as Request;
const response: Response = {} as Response;
const nextFunction: NextFunction = {} as NextFunction;

const body: HTMLElement | null = document.querySelector('.login-body');

const loginSectionButton: ButtonElementWithPopover = document.getElementById(
	'popoverButton'
) as ButtonElementWithPopover;

if (body) {
	body?.addEventListener('DOMContentLoaded', async (): Promise<void> => {
		try {
			const popover: PopoverElement = document.getElementById(
				'popoverContent'
			) as PopoverElement;

			if (loginSectionButton) {
				loginSectionButton.popoverContent = popover;

				popover.toggle = function () {
					if (this.style.display === 'none') {
						this.style.display = 'block';
					} else {
						this.style.display = 'none';
					}
				};

				loginSectionButton.addEventListener(
					'click',
					async (): Promise<void> => {
						if (loginSectionButton?.popoverContent) {
							loginSectionButton.popoverContent.toggle?.();
						}
					}
				);
				return Promise.resolve() as Promise<void>;
			}

			document.addEventListener(
				'click',
				async (event: MouseEvent): Promise<void> => {
					if (
						event.target !== loginSectionButton &&
						event.target !== popover
					) {
						popover.style.display = 'none';
					}
				}
			);

			return Promise.resolve() as Promise<void>;
		} catch (error: unknown) {
			console.error(
				`loginSectionButton.addEventListener had an ERROR: ${
					(error as Error).message
				}`
			);
			status500(request, response, nextFunction);

			return Promise.reject() as Promise<void>;
		}
	});
}
