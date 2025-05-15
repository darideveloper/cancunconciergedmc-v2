import PropTypes from 'prop-types'

export default function Logo ({ image, alt, width }) {
  return (
    <div className="logo">
      <img src={`./imgs/${image}`} alt={alt}  style={{width: width}} className="mx-auto"/>
    </div>
  )
}

Logo.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
}