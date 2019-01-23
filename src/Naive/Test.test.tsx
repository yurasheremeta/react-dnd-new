import * as React from 'react';
// import renderer from 'react-test-renderer';
import Test from './Test';
import { mount } from 'enzyme';
import 'jsdom-global/register';

it('renders Hello world from Test component', () => {
    const app = mount(<Test/>);
    expect(app.find('.hello').text()).toEqual('Hello World!');
 }); 
 
