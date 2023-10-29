'use strict';

// import App from '../app.js';
import {
	PopoverElement,
	ButtonElementWithPopover
} from '../@types/interfaces/interfaces.js';
import createLoginConfirmationPopup from '../utility/appFunction_utilities/login_popup.js';

const loginBody: HTMLElement | null = document.getElementById('loginBody');

const loginFormButton: HTMLButtonElement | null = document.querySelector(
	'.login-form__button'
);

loginFormButton?.addEventListener('click', async (): Promise<void> => {
	try {
		await createLoginConfirmationPopup();

		return Promise.resolve();
	} catch (error) {
		console.error(
			`loginFormButton.addEventListener had an ERROR: ${
				(error as Error).message
			}`
		);
		// res.status(500).send(`Post Login Error: ${(error as Error).message}`);
		return Promise.reject() as Promise<void>;
	}
});

const body: HTMLElement | null = document.querySelector('.login-body');

const loginSectionButton: ButtonElementWithPopover = document.getElementById(
	'popoverButton'
) as ButtonElementWithPopover;

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
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
		// res
		// .status(500)
		// .send(`Post Login Error: ${(error as Error).message}`);
		return Promise.reject() as Promise<void>;
	}
});
