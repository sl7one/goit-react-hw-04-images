import PropTypes from 'prop-types';
import { useState } from 'react';

const Searchbar = ({ onSubmitUp }) => {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    onSubmitUp(value.toLocaleLowerCase());
  };

  return (
    <form className="box" onSubmit={onSubmit}>
      <div className="container-1">
        <button className="icon" type="submit">
          <i className="fa fa-search"></i>
        </button>
        <input
          name="query"
          value={value}
          type="search"
          id="search"
          placeholder="Search..."
          onChange={onChange}
          required
        />
      </div>
    </form>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
