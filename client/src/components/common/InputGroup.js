import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  value,
  error,
  onChange,
  icon
  

}) => {

  return (
    <div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text">
            <i className={icon} />
            </span>    
        </div>
      <input
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}
      />

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired

};

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup;