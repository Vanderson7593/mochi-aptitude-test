import Search from '../Search'
import { screen, userEvent, React, GithubState, render } from '../../../tests'

describe('Search', () => {

    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            }))
        });
    });

    //renders correctly
    it('Shoul render correctly', () => {
        render(<GithubState />, <Search />)
    })

    //Shoul not accept empty values
    it('Shoul not accept empty values', async () => {
        render(<GithubState> <Search /> </GithubState>)

        userEvent.click(await screen.findByTestId("search-button"))

        expect(screen.getByTestId("search-error")).toBeInTheDocument()
    })
})

