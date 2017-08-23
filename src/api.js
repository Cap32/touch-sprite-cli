
import conf, { defaultConfig } from './config';
import { getToken } from './Auth';
import fetch from 'node-fetch';
import { ensureTarget } from './utils';
import { readFile } from 'fs-extra';
import { parse } from 'path';

export async function upload({ target, clientFile, file, type }) {
	try {
		target = ensureTarget(target);
		if (!clientFile) {
			clientFile = `/${parse(file).base}`;
		}
		const { dir, base } = parse(clientFile);
		const auth = await getToken();
		const body = await readFile(file, 'utf-8');
		const res = await fetch(`${target}/upload`, {
			method: 'POST',
			headers: {
				auth,
				root: type,
				path: dir,
				filename: base,
				'Content-Type': 'touchsprite/uploadfile',
			},
			body,
		});
		const result = await res.text();
		console.log(result);
		return result === 'ok';
	}
	catch (err) {
		console.error(err);
	}
}

export async function run({ target }) {
	try {
		target = ensureTarget(target);
		const auth = await getToken();
		const res = await fetch(`${target}/runLua`, {
			headers: { auth },
		});
		const result = await res.text();
		console.log(result);
		return result === 'ok';
	}
	catch (err) {
		console.error(err);
	}
}

export async function push(argv) {
	await upload(argv) && await run(argv);
}

export async function getDeviceName({ target }) {
	try {
		target = ensureTarget(target);
		const res = await fetch(`${target}/devicename`);
		const deviceName = await res.text();
		console.log(deviceName);
	}
	catch (err) {
		console.error(err);
	}
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
