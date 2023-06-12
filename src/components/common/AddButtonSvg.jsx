import React from 'react';
import PropTypes from 'prop-types';

const SvgIcRoundAdd = props => {
  const { width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 36 36"
    >
      <path
        fill="#fff"
        d="M26.857 19.476h-7.38v7.381A1.48 1.48 0 0 1 18 28.333a1.48 1.48 0 0 1-1.476-1.476v-7.38H9.143A1.48 1.48 0 0 1 7.667 18a1.48 1.48 0 0 1 1.476-1.476h7.38V9.143A1.48 1.48 0 0 1 18 7.667a1.48 1.48 0 0 1 1.476 1.476v7.38h7.381A1.48 1.48 0 0 1 28.333 18a1.48 1.48 0 0 1-1.476 1.476Z"
      />
    </svg>
  );
};
export default SvgIcRoundAdd;

SvgIcRoundAdd.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
