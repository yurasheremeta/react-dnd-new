import * as React from 'react';
import { shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Input from './Input';
import 'jsdom-global/register';

describe('Input tests', () => {

    it('Render correctly input' , () => {
        const wrapper = renderer.create(<Input value={"aaaaa"} onChange={() => {}}/>).toJSON();
        expect(wrapper).toMatchSnapshot();
    })

    it('Render right value' , () => {
        const defaultProps = {
            value: "Hello",
            onChange: () => {}
        }
        const wrapper = mount(<Input {...defaultProps} />);

        expect(wrapper.prop('value')).toEqual("Hello");
    })
})

