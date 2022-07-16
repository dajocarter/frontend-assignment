import React from 'react';
import TextInput from '../components/forms/input';

export default {
  title: 'Timescale/Forms/TextInput',
  component: TextInput
};

const Template = (args) => <TextInput {...args} />;

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  name: 'text',
  label: 'Text input'
};

export const Email = Template.bind({});
Email.args = {
  type: 'email',
  name: 'email',
  label: 'Email input'
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  name: 'password',
  label: 'Password input'
}
