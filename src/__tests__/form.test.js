import React from 'react';

import { shallow, mount } from 'enzyme';


import ToDoForm from '../components/todo/form.js';
const testFunction = jest.fn();

describe('Form tests', () => {
  it('should render at application start', () => {
    let app = shallow(<ToDoForm handleSubmit={testFunction}/>);
    expect(app.find('h3').exists()).toBe(true);
    expect(app.find('form').exists()).toBe(true);
    expect(app.find('input').exists()).toBe(true);
  });
});