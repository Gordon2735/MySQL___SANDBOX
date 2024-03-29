// 'use strict';

// import setAttributes, {
// 	appendChildren,
// 	status500
// } from './utilityFunctionGlobs.js';
// import { Request, Response, NextFunction } from '../../app.js';

// const request: Request = {} as Request;
// const response: Response = {} as Response;
// const next: NextFunction = {} as NextFunction;

// async function createLoginConfirmationPopup(): Promise<void> {
// 	try {
// 		console.info(`documents: ${document}`);

// 		let username: string = '';
// 		let email: string = '';
// 		const xhr: XMLHttpRequest = new XMLHttpRequest();
// 		xhr.open('GET', '/login', true, 'username', 'email');
// 		// if (xhr.status === 200) {
// 		console.info(`xhr.status: ${xhr.status}`);
// 		xhr.onload = function () {
// 			username = xhr.responseText;
// 			email = xhr.responseText;
// 			console.info(`username: ${username}, email: ${email}`);
// 		};
// 		// } else {
// 		// 	console.error(`ERROR < xhr.status: ${xhr.status}`);
// 		// }
// 		xhr.send();

// 		const loginPopupSection: HTMLElement | null =
// 			document.getElementById('loginPopupSection');

// 		const loginPopover_styles: HTMLStyleElement =
// 			document.createElement('style');

// 		const loginSectionFigure: HTMLElement =
// 			document.createElement('figure');
// 		const loginSectionFigureImg: HTMLElement =
// 			document.createElement('img');
// 		const loginSectionFigureFigcaption: HTMLElement =
// 			document.createElement('figcaption');
// 		document.createElement('figcaption');
// 		const loginSectionFigureFigcaptionH2: HTMLElement =
// 			document.createElement('h2');
// 		const loginSectionFigureFigcaptionP1: HTMLElement =
// 			document.createElement('p');
// 		const loginSectionFigureFigcaptionP2: HTMLElement =
// 			document.createElement('p');
// 		const loginSectionButton: HTMLButtonElement = document.createElement(
// 			'popoverButton'
// 		) as HTMLButtonElement;

// 		const figcaptionH2Text: Text =
// 			document.createTextNode('Login Confirmation');
// 		const figcaptionP1Text: Text = document.createTextNode(
// 			`
// 				Welcome ${xhr.responseText}!
// 				You have successfully logged in, please press the
// 				"Continue" Button to access the
// 				MySQL Database Table Page!
//         	`
// 		);
// 		const figcaptionP2Text: Text = document.createTextNode(
// 			`
// 				Your Login Email ${xhr.responseText}!
//         	`
// 		);
// 		const loginSectionButtonText: Text =
// 			document.createTextNode('Continue');

// 		await setAttributes(loginPopover_styles, {
// 			id: 'loginPopover_styles',
// 			class: 'login-popover__styles',
// 			type: 'text/css',
// 			alt: 'Login Popover Styles',
// 			crossOriginIsolated: true
// 		});

// 		// await setAttributes(popoverLoginSection, {
// 		// 	id: 'popoverContent',
// 		// 	class: 'login-section',
// 		// 	'data-target': '_blank'
// 		// });
// 		await setAttributes(loginSectionFigure, {
// 			id: 'loginSectionFigure',
// 			class: 'login-section__figure'
// 		});
// 		await setAttributes(loginSectionFigureImg, {
// 			id: 'loginSectionFigureImg',
// 			class: 'login-section__figure__img',
// 			src: './images/005_glass_people.webp',
// 			alt: 'Confirmation Image'
// 		});
// 		await setAttributes(loginSectionFigureFigcaption, {
// 			id: 'loginSectionFigureFigcaption',
// 			class: 'login-section__figure__figcaption'
// 		});
// 		await setAttributes(loginSectionFigureFigcaptionH2, {
// 			id: 'loginSectionFigureFigcaptionH2',
// 			class: 'login-section__figure__figcaption__h2'
// 		});
// 		await setAttributes(loginSectionFigureFigcaptionP1, {
// 			id: 'loginSectionFigureFigcaptionP1',
// 			class: 'login-section__figure__figcaption__p2'
// 		});
// 		await setAttributes(loginSectionFigureFigcaptionP2, {
// 			id: 'loginSectionFigureFigcaptionP2',
// 			class: 'login-section__figure__figcaption__p2'
// 		});
// 		await setAttributes(loginSectionButton, {
// 			id: 'popoverButton',
// 			class: 'login-section__button',
// 			type: 'button',
// 			popovertarget: 'login_popover',
// 			popovertargetaction: 'hide'
// 		});

// 		// await appendChildren(loginPopupSection, [
// 		// 	loginSectionFigure,
// 		// 	loginSectionButton
// 		// ]);

// 		// loginPopupSection?.insertAdjacentHTML(
// 		// 	'afterbegin',
// 		// 	`${loginSectionFigure}`
// 		// );
// 		// loginPopupSection?.insertAdjacentHTML(
// 		// 	'beforeend',
// 		// 	`${loginSectionButton}`
// 		// );

// 		// await appendChildren(loginSectionFigure, [
// 		// 	// loginSectionFigureImg,
// 		// 	// loginSectionFigureFigcaption,
// 		// 	// loginSectionFigureFigcaptionH2,
// 		// 	// loginSectionFigureFigcaptionP1,
// 		// 	// loginSectionFigureFigcaptionP2
// 		// ]);

// 		loginPopupSection?.appendChild(loginSectionFigure);
// 		loginPopupSection?.appendChild(loginSectionButton);

// 		loginSectionFigure.appendChild(loginSectionFigureImg);
// 		loginSectionFigure.appendChild(loginSectionFigureFigcaption);
// 		loginSectionFigureFigcaption.appendChild(
// 			loginSectionFigureFigcaptionH2
// 		);
// 		loginSectionFigureFigcaption.appendChild(
// 			loginSectionFigureFigcaptionP1
// 		);
// 		loginSectionFigureFigcaption.appendChild(
// 			loginSectionFigureFigcaptionP2
// 		);

// 		loginSectionFigureFigcaptionH2.appendChild(figcaptionH2Text);
// 		loginSectionFigureFigcaptionP1.appendChild(figcaptionP1Text);
// 		loginSectionFigureFigcaptionP2.appendChild(figcaptionP2Text);
// 		loginSectionButton.appendChild(loginSectionButtonText);

// 		loginSectionButton?.addEventListener(
// 			'click',
// 			async (event: MouseEvent) => {
// 				event.preventDefault();
// 				console.info(`event: ${event}`);
// 				const redirect_dataView = (window.location.href = '/data_view');
// 				return redirect_dataView;
// 			}
// 		);

// 		loginPopover_styles.innerHTML = /* CSS */ `

// 			body {
// 				background-color: #333;
// 			}

// 			.login-popup-section {
// 				margin: 35% auto 4em auto;
// 				position: relative;
// 				box-sizing: border-box;
// 				display: flex;
// 				flex-direction: column;
// 				justify-content: center;
// 				align-items: center;
// 				width: 67%;
// 				height: 40%;
// 				text-align: center;
// 				background-color: #ccc;
// 				border: 3.7em solid hsla(207, 44%, 49%, 0.993);
// 				border-radius: 10px;
// 			}

// 			.login-popup-section .login-section__figure {
// 				margin: 0;
// 				padding: 0;
// 				position: absolute;
// 				display: flex;
// 				flex-direction: column;
// 				justify-content: center;
// 				align-items: center;
// 				width: 100%;
// 				height: 100%;

// 			}

// 			.login-section__figure .login-section__figure__img {
// 				width: 100%;
// 				height: 100%;
// 				border-radius: 2.5em;
// 			}

// 			.login-section__figure__figcaption {
// 				display: flex;
// 				flex-direction: column;
// 				justify-content: center;
// 				align-items: center;
// 				width: 100%;
// 				height: 100%;
// 			}

// 			.login-section__figure__figcaption__h2 {
// 				margin: 0;
// 				text-align: center;
// 				font-family: 'Titillium Web', sans-serif;
// 				font-size: 1.9rem;
// 				font-weight: 700;
// 				color: hsla(207, 44%, 49%, 0.993);
// 				text-shadow: 1em 1em 2em hsla(0, 0%, 0%, 0.793);
// 			}

// 			.login-section__figure__figcaption__p1,
// 			.login-section__figure__figcaption__p2 {
// 				margin: 0;
// 				text-align: center;
// 				font-family: 'Source Code Pro', monospace;
// 				font-size: 0.97rem;
// 				font-weight: 400;
// 				color: hsla(0, 0%, 0%, 0.998);
// 			}

// 			.login-section__button {
// 				display: flex;
// 				justify-content: center;
// 				align-items: center;
// 				width: 20em;
// 				height: 12em;
// 				background-color: hsla(0, 1%, 67%, 0.993);
// 				border: 0.7em solid hsla(207, 44%, 49%, 0.993);
// 				border-radius: 7px;
// 				font-family: 'Source Code Pro', monospace;
// 				font-size: 0.97rem;
// 				font-weight: 400;
// 				color: hsla(207, 44%, 49%, 0.993);
// 				cursor: pointer;
// 				filter: drop-shadow(1em 1em 2em hsla(0, 0%, 0%, 0.793));
// 				box-shadow: inset 0 0 0.5em hsla(0, 0%, 0%, 0.493);
// 			}

// 			.login-section__button:hover {
// 				background-color: hsla(248, 39%, 39%, 0.555);
// 				color: hsla(0, 0%, 100%, 0.993);
// 				border: 1px solid hsla(0, 0%, 100%, 0.693);
// 			}

// 			.login-section__button:active {
// 				background-color: hsla(248, 97%, 15%, 0.555);
// 				color: hsla(0, 0%, 100%, 0.493);
// 				border: 1px solid hsla(248, 94%, 81%, 0.979);
// 				filter: drop-shadow(1em 1em 14em hsla(248, 94%, 81%, 0.579));
// 				box-shadow: inset 0 0 0.5em hsla(248, 94%, 81%, 0.479);
// 				z-index: 1;
// 			}

// 			#popoverButton:focus + .popover {
// 				display: block;
// 			}
// 		`;
// 		loginPopupSection?.appendChild(loginPopover_styles);

// 		return Promise.resolve() as Promise<void>;
// 	} catch (error: unknown) {
// 		console.error(`createLoginConfirmationPopup had an ERROR: ${error}`);

// 		await status500(request, response, next);

// 		return Promise.reject() as Promise<void>;
// 	}
// }

// // const popupButton: HTMLElement | null =
// // 	document.getElementById('popoverButton');

// export { createLoginConfirmationPopup };
