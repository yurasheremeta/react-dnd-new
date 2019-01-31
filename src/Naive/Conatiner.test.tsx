import * as React from 'react';
import { shallow , mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Container from './Container';
import { getLeftPosition } from './utils';
import 'jsdom-global/register';

describe('Container tests' , () => {
    it('Render container correctly' , () => {
        const props = {
            boxes : {},
            moveBox : () => {},
            handleValueChange: () => () => {},
            toolbarPositionX : 20,
            toolbarPositionY: 20,
        }
        const wrapper = shallow(<Container {...props} />);
        expect(wrapper).toMatchSnapshot();
    })
})

