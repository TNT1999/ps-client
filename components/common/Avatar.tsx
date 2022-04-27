import { FunctionComponent } from 'react';
import Logo from 'public/Logo.png';
import classNames from 'classnames';

type AvatarType = {
  avatar?: string | null;
  name?: string;
  email?: string | null;
};
const getLettersFromName = (name: string) => {
  const fullName = name.trim().split('');
  return (
    (fullName.shift()?.charAt(0) || '') + (fullName.pop()?.charAt(0) || '')
  );
};
const Avatar: FunctionComponent<AvatarType> = ({ avatar, name, email }) => {
  if (avatar != null) {
    return <img src={Logo} alt="" className="w-full h-full object-cover" />;
  }
  if (name != null) {
    const userName = getLettersFromName(name);
    return <>{userName}</>;
  }
  return <>{email?.slice(0, 2)}</>;
};

const UserAvatar: FunctionComponent<AvatarType> = ({ avatar, name, email }) => {
  return (
    <div
      className={classNames(
        'flex justify-center items-center w-9 h-9 uppercase border-white shadow-sm rounded-full font-bold text-sm overflow-hidden',
        {
          'bg-gray-200': avatar == null
        }
      )}
    >
      <Avatar name={name} avatar={avatar} email={email} />
    </div>
  );
};
export default UserAvatar;
