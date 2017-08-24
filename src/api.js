
import conf, { defaultConfig } from './config';
import { getToken } from './Auth';
import fetch from 'node-fetch';
import { ensureTarget } from './utils';
import { lstat, createReadStream } from 'fs-extra';
import { parse, extname } from 'path';
import request from 'request';

export async function upload(argv, log = console.log) {
	try {
		const { target, clientFile, file, type } = argv;
		const root = (function () {
			if (type) { return type; }
			const luaExts = ['.lua', '.luac', '.txt'];
			const ext = extname(file);
			return luaExts.indexOf(ext) > -1 ? 'lua' : 'res';
		}());
		const clientFilePath = clientFile || `/${parse(file).base}`;
		const { dir, base } = parse(clientFilePath);
		const auth = await getToken();
		const stat = await lstat(file);
		const result = await new Promise((resolve, reject) => {
			createReadStream(file).pipe(
				request({
					url: `${ensureTarget(target)}/upload`,
					method: 'POST',
					headers: {
						auth,
						root,
						path: dir,
						filename: base,
						'Content-Type': 'touchsprite/uploadfile',
						'Content-Length': stat.size,
					}
				}, (err, res, body) => {
					if (err) { reject(err); }
					else if (res.statusCode !== 200) { reject(res.statusText); }
					else { resolve(body); }
				})
			);
		});
		log && log(result);
		return result === 'ok';
	}
	catch (err) {
		console.error(err);
	}
}

export async function run(argv, log = console.log) {
	try {
		const { target } = argv;
		const auth = await getToken();
		const res = await fetch(`${ensureTarget(target)}/runLua`, {
			headers: { auth },
		});
		const result = await res.text();
		log && log(result);
		return result === 'ok';
	}
	catch (err) {
		console.error(err);
	}
}

export async function push(argv) {
	await upload(argv, false) && await run(argv);
}

export async function getDeviceName({ target }) {
	target = ensureTarget(target);
	const res = await fetch(`${target}/devicename`);
	const result = await res.text();
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
