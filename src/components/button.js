import { oneOf, string } from "prop-types"
import styled, { ThemeProvider } from "styled-components"

// Gold
const primaryTheme = {
  backgroundColor: '#FDB515',
  backgroundHover: '#FEDA8A',
  color: '#141E35'
}

// Blue
const secondaryTheme = {
  backgroundColor: '#1472EC',
  backgroundHover: '#8CBBF9',
  color: '#FFFFFF'
}

const themes = {
  primary: primaryTheme,
  secondary: secondaryTheme
}

/**
 * Themed button element
 */

export default function Button (props) {
  return (
    <ThemeProvider theme={themes[props.theme]}>
      <StyledButton type={props.type ? props.type : 'button'}>{props.value}</StyledButton>
    </ThemeProvider>
  )
}
Button.propTypes = {
  /**
   * Choose a theme for the button.
   * Primary is gold, secondary is blue.
   */
  theme: oneOf(['primary', 'secondary']).isRequired,
  /**
   * Choose the type attribute for the button
   */
  type: oneOf(['button', 'submit']),
  /**
   * Provide the text for the button
   */
  value: string.isRequired
}
Button.defaultProps = {
  theme: 'primary',
  type: 'button'
}

const StyledButton = styled.button`
  font-family: 'Inter', Arial;
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  background-color: ${props => props.theme.backgroundColor};
  border: 0;
  color: ${props => props.theme.color};
  margin-top: 14px;
  padding: 7px;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.backgroundHover};
    cursor: pointer;
  }
`