import * as React from 'react';
import { shallow, mount} from 'enzyme';
import TextArea from './TextArea';
import 'jsdom-global/register';

describe('TextArea tests', () => {

    it('Render correctly TextArea' , () => {
        const wrapper = shallow(<TextArea value={"aaaaa"} onChange={() => {}}/>);
        expect(wrapper).toMatchSnapshot();
    })

    it('Render right value' , () => {
        const defaultProps = {
            value: "Hello",
            onChange: () => {}
        }
        const wrapper = mount(<TextArea {...defaultProps} />);
        expect(wrapper.prop('value')).toEqual("Hello");
    })
})

