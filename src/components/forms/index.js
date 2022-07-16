import { useState } from 'react'
import styled from 'styled-components'
import Button from '../button'
import CheckboxInput from './checkbox'
import TextInput from './input'
import eonCarImg from '../../images/eon-car.svg'
import checkmarkImg from '../../images/checkmark.svg'

export default function SignupForm () {
  const [formData, setFormData] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [isSubmissionSuccessful, setSubmissionSuccess] = useState(false)

  function handleInputChange (e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  function handleSubmit (e) {
    e.preventDefault()
    const isEmailValid = validateEmail(formData['email'])
    const isPasswordValid = validatePassword(formData['password'])
    const isCheckboxValid = validateCheckbox(formData['termsOfService'])
    if (isEmailValid && isPasswordValid && isCheckboxValid) {
      setFormErrors({})
      setSubmissionSuccess(true)
    } else {
      setSubmissionSuccess(false)
    }
  }

  function setError (error) {
    setFormErrors(formErrors => ({ ...formErrors, ...error }))
  }

  function resetErrors (errorKey) {
    if (!errorKey) setFormErrors({})
    setFormErrors(formErrors => {
      const { [errorKey]: removedError, ...otherErrors } = formErrors
      return otherErrors
    })
  }

  function validateEmail (value) {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const isValid = emailPattern.test(value)
    isValid ? resetErrors('email') : setError({ email: 'Invalid email' })
    return isValid
  }
  
  // The password input should check for 1 number, 1 special character, and a string that is at least 6 characters long
  function validatePassword (value) {
    const lengthPattern = /(?=.{6,}).*/
    const numberPattern = /([0-9])+/
    const specialCharPattern = /(?=.*[!@#$%^&*()_=+{}.-])+/

    const hasLength = lengthPattern.test(value)
    const hasDigit = numberPattern.test(value)
    const hasSpecialChar = specialCharPattern.test(value)

    if (!hasLength) {
      setError({ password: 'Password too short' })
      return false
    }
    if (!hasDigit && !hasSpecialChar) {
      setError({ password: 'Password must include a number and a special character' })
      return false
    }
    if (!hasDigit) {
      setError({ password: 'Password must include a number' })
      return false
    }
    if (!hasSpecialChar) {
      setError({ password: 'Password must include a special character' })
      return false
    }
    resetErrors('password')
    return true
  }

  function validateCheckbox (value) {
    value ? resetErrors('termsOfService') : setError({ termsOfService: 'Required' })
    return value
  }

  if (isSubmissionSuccessful) return <ConfirmationMessage />

  return (
    <Content>
      <PageTitle>Let's sign you up for Timescale Cloud</PageTitle>
      <StyledForm name='signup' onSubmit={handleSubmit}>
        <TextInput
          type='text'
          name='email'
          label='Email address'
          placeholder='smith@smithandco.com'
          onChange={handleInputChange}
          error={formErrors['email']}
        />
        <TextInput
          type='password'
          name='password'
          label='Create password'
          placeholder='6 characters or more...'
          onChange={handleInputChange}
          error={formErrors['password']}
        />
        <CheckboxInput
          name='termsOfService'
          label='I agree to the Timecale Cloud Terms of Service'
          onChange={handleInputChange}
          error={formErrors['termsOfService']}
        />
        <Button
          theme='primary'
          type='submit'
          value='Sign up'
        />
      </StyledForm>
    </Content>
  )
}

function ConfirmationMessage () {
  return (
    <Content>
      <img src={checkmarkImg} alt='green checkmark' />
      <SuccessTitle>Thank you!</SuccessTitle>
      <SuccessMessage>Please check your email.</SuccessMessage>
      <img src={eonCarImg} alt='Tiger driving car' />
    </Content>
  )
}

const Content = styled.div`
  box-sizing: border-box;
  background-color: #F7F8F8;
  font-family: 'Inter', Arial;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 24px;
  max-width: 622px;
  margin: 0 auto;

  @media (min-width: 522px) {
    padding: 80px 111px;
  }
`

const SuccessTitle = styled.h1`
  margin: 24px 0 0;
`

const SuccessMessage = styled.p`
  margin: 0 0 24px;
`

const PageTitle = styled.h1`
  font-family: 'Inter', Arial;
  text-align: center;
  margin: 0 0 32px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`