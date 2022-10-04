import React from "react";
import {fireEvent, render} from "@testing-library/react";

import Home from '../pages/index';

describe('<Home />', () => {
    test('updates input on change', () => {

        const { getByPlaceholderText } = render(<Home />);
        const searchInput = getByPlaceholderText('Search todo...');
        fireEvent.change(searchInput, { target: { value: 'test' }})
        expect(searchInput.value).toEqual('test')

    });
})
