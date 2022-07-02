import { types } from '../../../src/auth';

describe('Tests in "types.js"', () => {

	test('should return these types', () => {
		expect(types).toEqual({
			login: '[Auth] Login',
			LOGOUT: '[Auth] Logout',
		});
	});

});