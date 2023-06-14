import React from 'react';
import PropTypes from 'prop-types';

const SvgIcMemberProfile = props => {
  const { fill } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill={fill} clipPath="url(#ic_member-profile_svg__a)">
        <path d="M16.5 9a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
        <path
          fillRule="evenodd"
          d="M0 12a12 12 0 1 1 24 0 12 12 0 0 1-24 0ZM12 1.5a10.5 10.5 0 0 0-8.202 17.055C4.863 16.839 7.208 15 12 15c4.793 0 7.136 1.837 8.202 3.555A10.5 10.5 0 0 0 12 1.5Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="ic_member-profile_svg__a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SvgIcMemberProfile;
SvgIcMemberProfile.propTypes = {
  fill: PropTypes.string.isRequired,
};
