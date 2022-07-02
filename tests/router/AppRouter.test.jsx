import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Tests in <AppRouter />', () => {
	test('should show the login if not authenticated', () => {
		const contextValue = {
			logged: false,
		};

		render(
			<MemoryRouter initialEntries={['/marvel']}>
				<AuthContext.Provider value={contextValue}>
					<AppRouter />
				</AuthContext.Provider>
			</MemoryRouter>
		);

		expect(screen.getAllByText('Login').length).toBe(2);
	});
    
    test('should show the marvel page if authenticated', () => {
        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Test',
            }
		};
        
		render(
            <MemoryRouter initialEntries={['/login']}>
				<AuthContext.Provider value={contextValue}>
					<AppRouter />
				</AuthContext.Provider>
			</MemoryRouter>
		);
        
        expect( screen.getByText('Marvel Comics') ).toBeTruthy();
    });

});
