
import yargs from 'yargs';
import pkg from '../package.json';
import updateNotifier from 'update-notifier';
import API from './apiProxy';

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
	},
	clientFile: {
		alias: 'c',
		desc: 'Client file path',
		type: 'string',
	},
};

// eslint-disable-next-line
yargs
	.usage(`$0 <command> [args]`)
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
	// .command({
	// 	command: 'remotelog',
	// 	desc: 'Log',
	// 	builder(yargs) {
	// 		yargs // eslint-disable-line
	// 			.options({ target })
	// 			.argv
	// 		;
	// 	},
	// 	handler: API.remoteLog,
	// })
	.command({
		command: 'set',
		desc: `Set config`,
		builder(yargs) {
			yargs // eslint-disable-line
				.usage(`$0 set <key> <value>`)
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
				.usage(`$0 get <key>`)
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
				.usage(`$0 unset <key>`)
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
						.usage(`$0 devices add <device>`)
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
						.usage(`$0 devices remove <device>`)
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
						.usage(`$0 devices list`)
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
						.usage(`$0 devices clear`)
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
