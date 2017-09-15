
import conf, { defaultConfig } from './config';
import * as TSRemoteAPI from 'touch-sprite-remote';
import { getToken } from './Auth';

export async function upload({ target, ...options }, log = console.log) {
	const result = await TSRemoteAPI.upload(target || conf.get('target'), {
		...options,
		auth: await getToken(),
	});
	log && log(result);
	return result === 'ok';
}

export async function run({ target }, log = console.log) {
	const result = await TSRemoteAPI.run(target || conf.get('target'), {
		auth: await getToken(),
	});
	log && log(result);
}

export async function stop({ target }) {
	const result = await TSRemoteAPI.stop(target || conf.get('target'), {
		auth: await getToken(),
	});
	console.log(result);
}

export async function status({ target }) {
	const result = await TSRemoteAPI.status(target || conf.get('target'), {
		auth: await getToken(),
	});
	let message = 'Unknown';
	if (result === 'f00') { message = 'Free'; }
	else if (result === 'f01') { message = 'Running'; }
	else if (result === 'f02') { message = 'Recording'; }
	console.log(message);
}

export async function push(argv) {
	await upload(argv, false) && await run(argv);
}

export async function getDeviceName({ target }) {
	const result = await TSRemoteAPI.getDeviceName(target || conf.get('target'));
	console.log(result);
}

export function set(argv) {
	const [, key, value] = argv._;
	if (key === 'devices') {
		throw new Error(`Please use \`${name} device\` command`);
	}
	conf.set(key, value);
	console.log(`${key}: ${value}`);
}

export function unset(argv) {
	const [, key] = argv._;
	if (!conf.has(key)) {
		console.log(`Key "${key}" not found`);
		return;
	}

	if (Object.keys(defaultConfig).indexOf(key) > -1) {
		conf.set(key, defaultConfig[key]);
	}
	else {
		conf.delete(key);
	}
	console.log(`Deleted key "${key}"`);
}

export function get(argv) {
	const [, key] = argv._;
	const value = conf.get(key);
	console.log(`${key}: ${value}`);
}

export function addDevice(argv) {
	const [, , device] = argv._;
	const devices = conf.get('devices');
	const index = devices.indexOf(device);
	if (index < 0) {
		devices.push(device);
		conf.set('devices', devices);
		console.log(`Added device "${device}"`);
	}
	else {
		console.log(`Device "${device}" exists`);
	}
}

export function removeDevice(argv) {
	const [, , device] = argv._;
	const devices = conf.get('devices');
	const index = devices.indexOf(device);
	if (index > -1) {
		devices.splice(index, 1);
		conf.set('devices', devices);
		console.log(`Removed device "${device}"`);
	}
	else {
		console.log(`Device "${device}" NOT found`);
	}
}

export function listDevice() {
	const devices = conf.get('devices');
	if (!devices.length) { console.log('No devices'); }
	else { console.log(devices.join(', ')); }
}

export function clearDevices() {
	conf.set('devices', []);
	console.log('Cleared');
}
