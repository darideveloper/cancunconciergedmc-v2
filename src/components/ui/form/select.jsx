import PropTypes from 'prop-types'

export default function Select({ label, activeOption = "", name, handleUpdate, options, error }) {
  return (
    <label className='w-full py-2'>
      <span className='text-lg'>{label}</span>
      <select 
        name={name} 
        value={activeOption} 
        onChange={(e) => handleUpdate(e)} 
        className={`block border-2 w-full px-5 h-12 mt-2 rounded-lg transition duration-300 opacity-60 focus:shadow-lg focus:opacity-100 ${error ? 'border-red-500' : 'border-blue'}`}
      >
        {options.map(({value, label}) => (
          // Select activeOption if it matches the current value
          <option value={value} key={value}>{label}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </label>
  )
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  activeOption: PropTypes.string,
  error: PropTypes.string
}