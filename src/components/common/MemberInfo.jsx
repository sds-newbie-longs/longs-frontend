import React from 'react';
import PropTypes from 'prop-types';
import MemberInfoSvg from 'components/common/MemberInfoSvg';
import 'styles/MemberInfo.scss';

const MemberInfo = props => {
  const { name, color } = props;

  return (
    <div className={'member-info-root'}>
      <div className={'member-info-container'}>
        <MemberInfoSvg className={'member-info-profile'} fill={color} />
        <span className={'member-info-name'}>{name}</span>
      </div>
    </div>
  );
};

export default MemberInfo;
MemberInfo.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
