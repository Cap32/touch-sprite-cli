
import * as API from './api';

export default new Proxy(API, {
	get(target, key) {
		return async (argv) => {
			try {
				await target[key](argv);
			}
			catch (err) {
				console.error(err.message);
				console.debug(err);
			}
		};
	},
});
