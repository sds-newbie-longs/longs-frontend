import React from 'react';
import PropTypes from 'prop-types';

const SvgIcDelete = props => {
  const { color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 40 40"
      {...props}
    >
      <path
        fill={color}
        d="M27.5 3.75v2.5h8.75a1.25 1.25 0 0 1 0 2.5h-1.345L32.772 35.4a5 5 0 0 1-4.984 4.6H12.213a5 5 0 0 1-4.985-4.6L5.095 8.75H3.75a1.25 1.25 0 0 1 0-2.5h8.75v-2.5A3.75 3.75 0 0 1 16.25 0h7.5a3.75 3.75 0 0 1 3.75 3.75Zm-12.5 0v2.5h10v-2.5a1.25 1.25 0 0 0-1.25-1.25h-7.5A1.25 1.25 0 0 0 15 3.75Zm-3.75 8.822 1.25 21.25a1.25 1.25 0 1 0 2.495-.15l-1.25-21.25a1.25 1.25 0 1 0-2.495.15Zm16.325-1.32a1.25 1.25 0 0 0-1.32 1.175l-1.25 21.25a1.25 1.25 0 0 0 2.495.145l1.25-21.25a1.25 1.25 0 0 0-1.175-1.32ZM20 11.25a1.25 1.25 0 0 0-1.25 1.25v21.25a1.25 1.25 0 0 0 2.5 0V12.5A1.25 1.25 0 0 0 20 11.25Z"
      />
    </svg>
  );
};
export default SvgIcDelete;
SvgIcDelete.propTypes = {
  color: PropTypes.string.isRequired,
};
