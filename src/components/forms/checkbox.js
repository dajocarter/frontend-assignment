import { func, string } from "prop-types"
import { useState } from "react"
import styled from "styled-components"
import { InputWrapper, ErrorMessage } from "./input"

export default function CheckboxInput (props) {
  const [checked, setChecked] = useState(false)

  function handleChange (e) {
    setChecked(checked => !checked)
    props.onChange(e)
  }

  return (
    <InputWrapper>
      <StyledCheckbox
        type='checkbox'
        id={props.name}
        name={props.name}
        checked={checked}
        onChange={handleChange}
        aria-describedby={`${props.name}-error`}
        isInvalid={props.error}
      />
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      {props.error && <ErrorMessage id={`${props.name}-error`}>{props.error}</ErrorMessage>}
    </InputWrapper>
  )
}
CheckboxInput.propTypes = {
  name: string,
  label: string,
  onChange: func,
  error: string
}

const StyledLabel = styled.label`
  color: #333333;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
`

const StyledCheckbox = styled.input`
  display: none;

  + *::before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    margin-right: 16px;
    border-radius: 2px;
    border: ${props => props.isInvalid ? '2px solid #F54545' : '1px solid #898E9A'};
  }

  &:checked + *::before {
    content: "✓";
    color: white;
    text-align: center;
    background: #1472EC;
    border-color: #1472EC;
  }
`
