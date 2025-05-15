import PropTypes from 'prop-types'

export default function FormText ({text}) {
  return (
    <p className="text-left block w-full text-sm">{text}</p>
  )
}

FormText.propTypes = {
  text: PropTypes.string.isRequired,
}