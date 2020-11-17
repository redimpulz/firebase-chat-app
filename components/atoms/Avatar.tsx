import React from 'react';
import { AvatarGenerator } from 'random-avatar-generator';
import { Avatar as AntAvatar } from 'antd';

type Props = {
  seed: string;
};

const Avatar: React.FC<Props> = ({ seed }) => {
  const generator = new AvatarGenerator();
  const avatar = generator.generateRandomAvatar(seed);
  return <AntAvatar src={avatar} />;
};

export default Avatar;
