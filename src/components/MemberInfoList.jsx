import React from 'react';
import PropTypes from 'prop-types';
import MemberInfo from 'components/common/MemberInfo';
import generate from 'utils/common/ColorGenerator';

const MemberInfoList = props => {
  const { members } = props;

  return (
    <div className={'member-list-root'}>
      <div className={'member-list-container'}>
        {members.map(member => {
          return <MemberInfo key={member.id} name={member.username} color={generate()} />;
        })}
      </div>
    </div>
  );
};

export default MemberInfoList;
MemberInfoList.propTypes = {
  members: PropTypes.array.isRequired,
};
