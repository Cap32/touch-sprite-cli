
import Configstore from 'configstore';
import { name } from '../package.json';

export const defaultConfig = {
	devices: [],
	key: '',
	valid: 3600,
	target: '',
	auth: {},
};

export default new Configstore(name, defaultConfig);
