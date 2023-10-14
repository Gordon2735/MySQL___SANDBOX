'use strict';

import router from './routes/api.js';
import index_route from './routes/routes.js';

const routes = [index_route];

getRoute(router);

async function getRoute(currentRoute) {
	for (const route of routes) {
		currentRoute = route;
	}
	return currentRoute;
}

export default router;
