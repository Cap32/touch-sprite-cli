
import fetch from 'node-fetch';
import conf from './config';

const AUTH_API = 'https://storeauth.touchsprite.com/api/openapi';

const fetchAuth = async function fetchAuth() {
	const { key, devices, valid } = conf.all;
	const body = JSON.stringify({
		action: 'getAuth',
		time: ~~(Date.now() / 1000),
		key,
		devices,
		valid,
	});

	const res = await fetch(AUTH_API, {
		method: 'POST',
		body,
	});

	if (!res.ok) {
		throw new Error(res.statusText);
	}

	const authData = await res.json();

	if (authData.status !== 200) {
		throw new Error(authData.message);
	}

	return authData;
};

export function clearAuth() {
	conf.set('auth', {});
}

export async function getToken() {
	const { token, expiresAt } = conf.get('auth');

	if (token && expiresAt > Date.now()) {
		return token;
	}

	clearAuth();

	const { auth, valid } = await fetchAuth();

	conf.set('auth', {
		token: auth,
		expiresAt: Date.now() + valid - 2000,
	});

	return auth;
}
