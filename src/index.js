
import yargs from 'yargs';
import pkg from '../package.json';
import updateNotifier from 'update-notifier';
import API from './apiProxy';

const { name } = pkg;

updateNotifier({ pkg }).notify();

const target = {
	alias: 't',
	desc: 'Target',
	type: 'string',
};

const upload = {
	file: {
		alias: 'f',
		desc: 'Local file path',
		demandOption: true,
		type: 'string',
	},
	target,
	type: {
		alias: 'T',
		desc: 'Root type',
		choices: ['lua', 'res', 'log', 'plugin'],
		default: 'lua',
	},
	clientFile: {
		alias: 'c',
		desc: 'Client file path',
		type: 'string',
	},
};

// eslint-disable-next-line
yargs
	.usage(`${name} <command> [args]`)
	.demand(1, 'Please specify one of the commands')
	.command({
		command: 'push',
		desc: 'Upload and run script',
		builder(yargs) {
			yargs // eslint-disable-line
				.options(upload)
				.argv
			;
		},
		handler: API.push,
	})
	.command({
		command: 'run',
		desc: 'Run script',
		builder(yargs) {
			yargs // eslint-disable-line
				.options({
					target,
				})
				.argv
			;
		},
		handler: API.run,
	})
	.command({
		command: 'upload',
		desc: 'Upload file',
		builder(yargs) {
			yargs // eslint-disable-line
				.options(upload)
				.argv
			;
		},
		handler: API.upload,
	})
	.command({
		command: 'devicename',
		desc: 'Get device name',
		builder(yargs) {
			yargs // eslint-disable-line
				.options({ target })
				.argv
			;
		},
		handler: API.getDeviceName,
	})
	.command({
		command: 'set',
		desc: `Set config`,
		builder(yargs) {
			yargs // eslint-disable-line
				.usage(`${name} set <key> <value>`)
				.demand(2, 'Please specify key and value')
				.argv
			;
		},
		handler: API.set,
	})
	.command({
		command: 'get',
		desc: `Get config`,
		builder(yargs) {
			yargs // eslint-disable-line
				.usage(`${name} get <key>`)
				.demand(1, 'Please specify key')
				.argv
			;
		},
		handler: API.get,
	})
	.command({
		command: 'unset',
		desc: `Unset config`,
		builder(yargs) {
			yargs // eslint-disable-line
				.usage(`${name} unset <key>`)
				.demand(1, 'Please specify key')
				.argv
			;
		},
		handler: API.unset,
	})
	.command('devices', 'Manage devices', (yargs) => {
		yargs // eslint-disable-line
			.command({
				command: 'add',
				desc: 'Add device',
				builder(yargs) {
					yargs // eslint-disable-line
						.usage(`${name} devices add <device>`)
						.demand(1, 'Please specify device')
						.argv
					;
				},
				handler: API.addDevice,
			})
			.command({
				command: 'remove',
				desc: 'Remove device',
				builder(yargs) {
					yargs // eslint-disable-line
						.usage(`${name} devices remove <device>`)
						.demand(1, 'Please specify device')
						.argv
					;
				},
				handler: API.addDevice,
			})
			.command({
				command: 'list',
				desc: 'List devices',
				builder(yargs) {
					yargs // eslint-disable-line
						.usage(`${name} devices list`)
						.argv
					;
				},
				handler: API.listDevice,
			})
			.command({
				command: 'clear',
				desc: 'Clear all devices',
				builder(yargs) {
					yargs // eslint-disable-line
						.usage(`${name} devices clear`)
						.argv
					;
				},
				handler: API.clearDevices,
			})
			.argv
		;
	})
	.alias('h', 'help')
	.help()
	.version(pkg.version)
	// .epilogue(`Checkout ${pkg.homepage} for detail`)
	.argv
;
