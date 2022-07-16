import React from 'react';
import Button from '../components/button';

export default {
  title: 'Timescale/Button',
  component: Button
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  theme: 'primary',
  value: 'Primary button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  theme: 'secondary',
  value: 'Secondary button'
};

export const Submit = Template.bind({});
Submit.args = {
  theme: 'primary',
  type: 'submit',
  value: 'Submit button'
}
