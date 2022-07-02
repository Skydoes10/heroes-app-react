const { render, screen, fireEvent } = require('@testing-library/react');
const { MemoryRouter } = require('react-router-dom');
const { SearchPage } = require('../../../src/heroes');

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

describe('Tests in <SearchPage />', () => {
	beforeEach(() => jest.clearAllMocks());

	test('should show with default values', () => {
		const { container } = render(
			<MemoryRouter>
				<SearchPage />
			</MemoryRouter>
		);

		expect(container).toMatchSnapshot();
	});

	test('should show with search results and the input with the queryString value', () => {
		render(
			<MemoryRouter initialEntries={['/searh?q=batman']}>
				<SearchPage />
			</MemoryRouter>
		);

		const input = screen.getByRole('textbox');
		expect(input.value).toBe('batman');

		const img = screen.getByRole('img');
		expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

		const alert = screen.getByLabelText('alert-danger');
		expect(alert.style.display).toBe('none');
	});

	test('should show an error if the hero is not found', () => {
		render(
			<MemoryRouter initialEntries={['/searh?q=batman123']}>
				<SearchPage />
			</MemoryRouter>
		);

		const alert = screen.getByLabelText('alert-danger');
		expect(alert.style.display).not.toBe('none');
	});

	test('should call the navigate to the new page', () => {
		const inputValue = 'superman';

		render(
			<MemoryRouter initialEntries={['/searh']}>
				<SearchPage />
			</MemoryRouter>
		);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, {
			target: { name: 'searchText', value: inputValue },
		});

		const form = screen.getByLabelText('form');
		fireEvent.submit(form);

		expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
	});
});
