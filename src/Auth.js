
import { fetchAuth } from 'touch-sprite-remote';
import conf from './config';

export function clearAuth() {
	conf.set('auth', {});
}

export async function getToken() {
	const { key, devices, valid } = conf.all;
	const { token, expiresAt } = conf.get('auth');

	if (token && expiresAt > Date.now()) {
		return token;
	}

	clearAuth();

	const { auth, expiresIn } = await fetchAuth({
		key, devices, valid,
	});

	conf.set('auth', {
		token: auth,
		expiresAt: Date.now() + (expiresIn * 1000) - 2000,
	});

	return auth;
}
