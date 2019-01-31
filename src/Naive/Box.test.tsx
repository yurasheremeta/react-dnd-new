import * as React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Box from './Box';
import 'jsdom-global/register';

describe('Box tests' , () => {
    const props = {
        id: "a",
        left: 0,
        top: 40,
        value: "Hello world"
    }

    it('render correctly Box component' , () => {
        const wrapper = shallow(<Box {...props}/>);
        expect(wrapper).toMatchSnapshot();
    })

    it('Render box props' , () => {
        const wrapper = mount(<Box {...props}/>);
        expect(wrapper.prop("id")).toEqual("a");
        expect(wrapper.prop("left")).toEqual(0);
        expect(wrapper.prop("top")).toEqual(40);
        expect(wrapper.prop("value")).toEqual("Hello world");
    })
  
    it('alow us to set props', () => {
        const wrapper = mount(<Box {...props}/>);
        expect(wrapper.prop("id")).toEqual("a");
        expect(wrapper.prop("left")).toEqual(0);
        expect(wrapper.prop("top")).toEqual(40);
        expect(wrapper.prop("value")).toEqual("Hello world");
        wrapper.setProps({ 
            id: "b",
            left: 20,
            top: 60,
            value: "Hell Yeah!"
        });
        expect(wrapper.prop("id")).toEqual("b");
        expect(wrapper.prop("left")).toEqual(20);
        expect(wrapper.prop("top")).toEqual(60);
        expect(wrapper.prop("value")).toEqual("Hell Yeah!");
    })

    it('Check if box is draging', () => {
        const boxProps = {
            isDraging : true
        }
        const wrapper = mount(<Box {...props} {...boxProps}/>)
        expect(wrapper.prop("isDraging")).toBeTruthy();
    })

    it('Check reletive position' , () => {
        const style: React.CSSProperties = {
            position: 'relative'
        }
        const defaultProps = {
            left : 0,
            top: 0,
        }
        const cStyle = { ...style}
        const wrapper = mount(<Box id="a" value = {"Hello"} {...defaultProps}/>)
        expect(wrapper.prop("left")).toEqual(0);
        expect(wrapper.prop("top")).toEqual(0);
        expect(cStyle.position).toEqual("relative");
    })
})