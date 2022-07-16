import { func, oneOf, string } from "prop-types"
import styled from "styled-components"

/**
 * Handles text-based inputs in a form
 */

export default function TextInput (props) {
  return (
    <InputWrapper>
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <StyledInput
        type={props.type}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        aria-describedby={`${props.name}-error`}
        isInvalid={props.error}
      />
      {props.error && <ErrorMessage id={`${props.name}-error`}>{props.error}</ErrorMessage>}
    </InputWrapper>
  )
}
TextInput.propTypes = {
  /**
   * Choose the type for the input
   */
  type: oneOf(['text', 'email', 'password', 'search', 'tel', 'url']),
  /**
   * Provide a unique name for the input field
   */
  name: string.isRequired,
  /**
   * Provide a label for the input field
   */
  label: string,
  /**
   * Provide a placeholder text for the input field
   */
  placeholder: string,
  /**
   * A function to handle input changing in the field
   */
  onChange: func,
  /**
   * Provide a message for the error state
   */
  error: string
}
TextInput.defaultProps = {
  type: 'text'
}

export const InputWrapper = styled.div`
  margin-bottom: 16px;
  width: 100%;
`

const StyledLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`

const StyledInput = styled.input`
  box-sizing: border-box;
  background-color: #FFFFFF;
  border: ${props => props.isInvalid ? '2px solid #F54545' : '1px solid #898E9A'};
  border-radius: 2px;
  font-family: 'Inter', Arial;
  padding: 12px 16px;
  width: 100%;
`

export const ErrorMessage = styled.span`
  font-family: monospace;
  font-size: 12px;
  line-height: 20px;
  color: #F54545;
`