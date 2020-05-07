import React from 'react'
import PropTypes from 'prop-types'
import Big from 'big.js'


const Box = ({ title, number, active, className }) => (
  <div className={`box ${active ? 'active' : ''} ${className}`}>
    <span>{title}</span>
    <span className="number">{Big(number).times(10 ** -24).toFixed(0)} Ⓝ</span>
  </div>
)

Box.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  active: PropTypes.bool,
  className: PropTypes.string,
}

Box.defaultProps = {
  active: false,
  className: "",
}

export default Box