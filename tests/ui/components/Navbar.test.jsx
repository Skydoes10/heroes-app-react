const { render, screen, fireEvent } = require("@testing-library/react");
const { MemoryRouter } = require("react-router-dom");
const { AuthContext } = require("../../../src/auth");
const { Navbar } = require("../../../src/ui");

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate
}));

describe('Tests in <Navbar />', () => {
    const contextValue = { 
        logged: true, 
        user: { id: '123', name: 'Luffy' },
        logout: jest.fn()
    };

    beforeEach(() => jest.clearAllMocks());

    test('should show user name', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Luffy')).toBeTruthy();
    });

    test('should call the logout and navigate when the button is clicked', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutButton = screen.getByLabelText('logout');
        fireEvent.click(logoutButton);
        
        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
    });

});