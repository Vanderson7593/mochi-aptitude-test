import OrgsList from '../OrgsList'

import { React, GithubState, render } from '../../../tests'

describe('OrgsList', () => {

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
        render(<GithubState />, <OrgsList />)
    })
})
