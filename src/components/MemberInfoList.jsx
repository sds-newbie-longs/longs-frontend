import React from 'react';
import PropTypes from 'prop-types';
import MemberInfo from 'components/common/MemberInfo';
import { Colors } from 'utils/common/Colors';

const MemberInfoList = props => {
  const { members } = props;

  return (
    <div className={'member-list-root'}>
      <div className={'member-list-container'}>
        {members.length === 0
          ? null
          : members.map((member, index) => {
              return <MemberInfo key={member.id} name={member.username} color={Colors[index]} />;
            })}
      </div>
    </div>
  );
};

export default MemberInfoList;
MemberInfoList.propTypes = {
  members: PropTypes.array.isRequired,
};
