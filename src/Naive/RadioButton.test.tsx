import * as React from 'react';
import { shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import RadioButtonGroup from './RadioButtonGroup';
import 'jsdom-global/register';

describe('RadioButton tests' , () => {
    it('Render correct RadioButton group' , () => {
        const wrapper = renderer.create(<RadioButtonGroup  onChange={() => {}}/>).toJSON();
        expect(wrapper).toMatchSnapshot();
    })
})