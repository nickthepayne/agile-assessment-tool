import React from 'react';
import { mount } from 'enzyme';
import Feedback from './Feedback';

test('sets submit button to disabled when no feedback is entered', () => {
  const wrapper = mount(<Feedback />);

  const textarea = wrapper.find('textarea');
  const submitBeforeChange = wrapper.find('button[type="submit"]');

  expect(textarea).toHaveText('');
  expect(submitBeforeChange).toBeDisabled();

  textarea.simulate('change', { target: { value: 'Feedback' } });

  const submitAfterChange = wrapper.find('button[type="submit"]');
  expect(submitAfterChange).not.toBeDisabled();
});
