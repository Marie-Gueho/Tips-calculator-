// == Import
import PropTypes from 'prop-types';
import './styles.scss';

// == Composant
const Input = ({
  htmlFor,
  refAnchor,
  type,
  name,
  placeholder,
  required,
  onChange,
}) => (
  <>
    {name && (
      <label htmlFor={htmlFor}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
    )}

    <input
      ref={refAnchor}
      type={type}
      name={name && name}
      placeholder={placeholder}
      required={required}
      onChange={onChange && onChange}
    />
  </>
);

Input.propTypes = {
  htmlFor: PropTypes.string,
  refAnchor: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  htmlFor: '',
  name: '',
  required: false,
  onChange: () => {},
};

// == Export
export default Input;
