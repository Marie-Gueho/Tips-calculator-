// == Import
import PropTypes from 'prop-types';
import './styles.scss';

// == Composant
const Button = ({
  className, content, onBtnClick, id,
}) => (
  <>
    <button
      id={id}
      className={`button ${className}`}
      type="button"
      value={content.split('%')[0]}
      onClick={(e) => {
        onBtnClick(e);
      }}
    >
      {content}
    </button>
  </>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onBtnClick: PropTypes.func.isRequired,
};

// == Export
export default Button;
