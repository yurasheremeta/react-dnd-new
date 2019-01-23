import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Box from './Box';
import 'jsdom-global/register';

describe('Box tests' , () => {
    const props = {
        id: "a",
        left: 0,
        top: 40,
        value: "Hello world"
    }

    it('Find Boxes' , () => {
        const wrapper = shallow(<Box {...props}/>)
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('div')).toBeDefined();
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
    
    // it('should display items, by default, in a text template (span element)', function() {
    //     var container = mount(<Box {...props}/>);
    //     expect(container.getDOMNode().textContent).toBe(randomWords.join(''));
    //   });
})