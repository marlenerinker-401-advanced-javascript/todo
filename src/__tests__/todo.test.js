import React from 'react';

import { shallow, mount } from 'enzyme';

import ToDo from '../components/todo/todo.js';


describe('ToDo tests', () => {
  it('should render at application start', () => {
    let app = shallow(<ToDo />);
    expect(app.find('.count-message').exists()).toBe(true);
    expect(app.find('.todo').exists()).toBe(true);
  });
});