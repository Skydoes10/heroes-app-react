import { authReducer, types } from '../../../src/auth';

describe('Tests in authReducer', () => {
	test('should return default state', () => {
		const state = authReducer({ logged: false }, {});
		expect(state).toEqual({ logged: false });
	});

	test('should call login and set user', () => {
		const action = {
			type: types.login,
			payload: {
				id: '123',
				name: 'test',
			},
		};

		const state = authReducer({ logged: false }, action);

		expect(state).toEqual({
			...state,
			logged: true,
			user: action.payload,
		});
	});

	test('should remove user name and change logged to false', () => {
		const state = {
			logged: true,
			user: { id: '123', name: 'test' },
		};

		const action = {
			type: types.logout,
		};

		const newState = authReducer(state, action);
        
		expect(newState).toEqual({ logged: false });
	});
});
