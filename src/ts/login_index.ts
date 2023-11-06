'use strict';

import { Response } from '../app.js';

console.info(`You have routed to the Login page.`);

async function showSuccess(res: Response, doc: Document): Promise<void> {
	const success_section = doc.getElementById('successSection') as HTMLElement;

	const success_sectionStyle = success_section.style;

	success_sectionStyle.display = 'block';
	success_sectionStyle.visibility = 'visible';

	const successCloseButton = doc.getElementById(
		'successCloseButton'
	) as HTMLButtonElement;

	successCloseButton.addEventListener(
		'click',
		async (event: MouseEvent): Promise<void> => {
			event.preventDefault();
			success_section.style.display = 'none';
			success_sectionStyle.visibility = 'hidden';

			return res.redirect('/login_popup');
		}
	);
}
export { showSuccess };
