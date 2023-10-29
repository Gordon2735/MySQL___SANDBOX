'use strict';

import setAttributes, { appendChildren } from './utilityFunctionGlobs.js';
import {
	PopoverElement,
	ButtonElementWithPopover
} from '../../@types/interfaces/interfaces.js';

export default async function createLoginConfirmationPopup(): Promise<void> {
	try {
		const body_loginSection: HTMLBodyElement | null =
			document.querySelector('.login-body');
		const loginPopover_styles: HTMLStyleElement =
			document.createElement('style');

		const popoverLoginSection: PopoverElement = document.createElement(
			'section'
		) as PopoverElement;
		const loginSectionFigure: HTMLElement =
			document.createElement('figure');
		const loginSectionFigureImg: HTMLElement =
			document.createElement('img');
		const loginSectionFigureFigcaption: HTMLElement =
			document.createElement('figcaption');
		const loginSectionFigureFigcaptionH2: HTMLElement =
			document.createElement('h2');
		const loginSectionFigureFigcaptionP: HTMLElement =
			document.createElement('p');
		const loginSectionButton: ButtonElementWithPopover =
			document.createElement('popoverButton') as ButtonElementWithPopover;

		const figcaptionH2Text: Text =
			document.createTextNode('Login Confirmation');
		const figcaptionPText: Text = document.createTextNode(
			`
            You have successfully logged in, please press the 
                "Continue" Button to access the
                     MySQL Database Table Page!
        `
		);
		const loginSectionButtonText: Text =
			document.createTextNode('Continue');

		await setAttributes(loginPopover_styles, {
			id: 'loginPopover_styles',
			class: 'login-popover__styles',
			type: 'text/css',
			alt: 'Login Popover Styles',
			crossOriginIsolated: true
		});

		await setAttributes(popoverLoginSection, {
			id: 'popoverContent',
			class: 'login-section',
			'data-target': '_blank'
		});
		await setAttributes(loginSectionFigure, {
			id: 'loginSectionFigure',
			class: 'login-section__figure'
		});
		await setAttributes(loginSectionFigureImg, {
			id: 'loginSectionFigureImg',
			class: 'login-section__figure__img',
			src: './images/01_glass_people.webp',
			alt: 'Confirmation Image'
		});
		await setAttributes(loginSectionFigureFigcaption, {
			id: 'loginSectionFigureFigcaption',
			class: 'login-section__figure__figcaption'
		});
		await setAttributes(loginSectionFigureFigcaptionH2, {
			id: 'loginSectionFigureFigcaptionH2',
			class: 'login-section__figure__figcaption__h2'
		});
		await setAttributes(loginSectionFigureFigcaptionP, {
			id: 'loginSectionFigureFigcaptionP',
			class: 'login-section__figure__figcaption__p'
		});
		await setAttributes(loginSectionButton, {
			id: 'popoverButton',
			class: 'login-section__button',
			type: 'button',
			popovertarget: 'login_popover',
			popovertargetaction: 'hide'
		});

		await appendChildren(popoverLoginSection, [
			loginSectionFigure,
			loginSectionButton
		]);
		await appendChildren(loginSectionFigure, [
			loginSectionFigureImg,
			loginSectionFigureFigcaption,
			loginSectionFigureFigcaptionH2,
			loginSectionFigureFigcaptionP
		]);

		loginSectionFigureFigcaptionH2.appendChild(figcaptionH2Text);
		loginSectionFigureFigcaptionP.appendChild(figcaptionPText);
		loginSectionButton.appendChild(loginSectionButtonText);

		loginPopover_styles.innerHTML = /* CSS */ `

		@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&family=Titillium+Web:ital,wght@0,200;0,400;0,700;1,200&display=swap');
		${"font-family: 'Source Code Pro', monospace"}
		${"font-family: 'Titillium Web', sans-serif"}
		
			.login-section {
				margin: 35% auto 4em auto;
				position: relative;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 47%;
				height: 40%;
				text-align: center;
				background-color: #ccc;
				border: 3.7em solid hsla(207, 44%, 49%, 0.993);
				border-radius: 10px;
			}

			.login-section .login-section__figure {
				margin: 0;
				padding: 0;
				position: absolute;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				
			}

			.login-section__figure .login-section__figure__img {
				width: 100%;
				height: 100%;
				border-radius: 2.5em;
			}

			.login-section__figure__figcaption {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
			}

			.login-section__figure__figcaption__h2 {
				margin: 0;
				text-align: center;
				font-family: 'Titillium Web', sans-serif;
				font-size: 1.9rem;
				font-weight: 700;
				color: hsla(207, 44%, 49%, 0.993);
				text-shadow: 1em 1em 2em hsla(0, 0%, 0%, 0.793);
			}

			.login-section__figure__figcaption__p {
				margin: 0;
				text-align: center;
				font-family: 'Source Code Pro', monospace;
				font-size: 0.97rem;
				font-weight: 400;
				color: hsla(0, 0%, 0%, 0.998);
			}

			.login-section__button {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 20em;
				height: 12em;
				background-color: hsla(0, 1%, 67%, 0.993);
				border: 0.7em solid hsla(207, 44%, 49%, 0.993);
				border-radius: 7px;
				font-family: 'Source Code Pro', monospace;
				font-size: 0.97rem;
				font-weight: 400;
				color: hsla(207, 44%, 49%, 0.993);
				cursor: pointer;
				filter: drop-shadow(1em 1em 2em hsla(0, 0%, 0%, 0.793));
				box-shadow: inset 0 0 0.5em hsla(0, 0%, 0%, 0.493);
			}

			.login-section__button:hover {
				background-color: hsla(248, 39%, 39%, 0.555);
				color: hsla(0, 0%, 100%, 0.993);
				border: 1px solid hsla(0, 0%, 100%, 0.693);
			}

			.login-section__button:active {
				background-color: hsla(248, 97%, 15%, 0.555);
				color: hsla(0, 0%, 100%, 0.493);
				border: 1px solid hsla(248, 94%, 81%, 0.979);
				filter: drop-shadow(1em 1em 14em hsla(248, 94%, 81%, 0.579));
				box-shadow: inset 0 0 0.5em hsla(248, 94%, 81%, 0.479);
				z-index: 1;
			}

			#popoverButton:focus + .popover {
				display: block;
			}

			
		`;
		body_loginSection?.appendChild(loginPopover_styles);

		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(`createLoginConfirmationPopup had an ERROR: ${error}`);

		return Promise.reject() as Promise<void>;
	}
}
