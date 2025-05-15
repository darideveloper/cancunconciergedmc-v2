import PropTypes from 'prop-types'

export default function Input({ label, placeholder = "", type, name, value, handleUpdate, isRequired = true, error }) {
  return (
    <label className='w-full py-2'>
      <span className='text-lg'>{label}</span>
      <input 
        className={`block border-2 w-full px-5 h-12 mt-2 rounded-lg transition duration-300 opacity-60 focus:shadow-lg focus:opacity-100 ${error ? 'border-red-500' : 'border-blue'}`}
        type={type} 
        placeholder={placeholder} 
        name={name} 
        value={value} 
        onChange={(e) => handleUpdate(e)} 
        required={isRequired}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </label>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  error: PropTypes.string
}