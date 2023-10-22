'use strict';

import { Request, Response } from 'express';
import getConfig from '../../../../config/config.js';

const config = await getConfig();

async function indexHandler(_req: Request, res: Response): Promise<void> {
	const index_script = `<script type="module" src="/js/index.js" content="text/javascript"></script>`;
	try {
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('index', {
			title: `MySQL Sandbox`,
			layout: 'main',
			helpers: 'helpers',
			script: [index_script],
			appName: config.applicationName
		});
	} catch (error: unknown) {
		console.error(`indexHandler had an ERROR: ${error}`);
		res.status(500).send('Server Error');
	}
}

async function aboutHandler(_req: Request, res: Response): Promise<void> {
	try {
		res.set('Content-Type', 'text/html');
		res.set('target', '_blank');
		res.render('about', {
			...(await getConfig()),
			title: 'About',
			layout: 'main',
			partials: 'partials',
			helpers: 'helpers'
		});
	} catch (error: unknown) {
		console.error(`aboutHandler had an ERROR: ${error}`);
		res.status(500).send('Server Error');
	}
}

export { indexHandler as default, aboutHandler };
