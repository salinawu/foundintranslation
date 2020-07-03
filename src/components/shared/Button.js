import PropTypes from 'prop-types'
import React from 'react'

const Button = ({ className, label, onClick }) => (
  <button className={className} onClick={onClick} type="button">
    <span className="p-4">{label}</span>
  </button>
)

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  onClick: () => {}
}

export default Button
