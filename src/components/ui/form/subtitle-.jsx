import PropTypes from 'prop-types'

export default function Subtitle ({text}) {
  return (
    <h2 className='text-4xl w-10/12 text-center mx-auto uppercase mt-20 mb-20'>
      {text}
    </h2>
  )
}

Subtitle.propTypes = {
  text: PropTypes.string.isRequired,
}