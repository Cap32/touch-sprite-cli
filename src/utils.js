
import conf from './config';

export function ensureTarget(target = conf.get('target')) {
	if (!target) { throw new Error('Missing target'); }

	if (!/^http/i.test(target)) {
		target = 'http://' + target;
	}

	if (!/\d:/.test(target)) {
		target += ':50005';
	}

	return target;
}
