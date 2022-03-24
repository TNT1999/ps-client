import { FunctionComponent, SVGAttributes } from 'react';

import Mail from './icons/Mail.svg';
import Key from './icons/Key.svg';
import Eye from './icons/Eye.svg';
import EyeOff from './icons/EyeOff.svg';
import Search from './icons/Search.svg';
import Cart from './icons/Cart.svg';
import Spinner from './icons/Spinner.svg';
import Facebook from './icons/Facebook.svg';
import Google from './icons/Google.svg';
import ChevronDown from './icons/ChevronDown.svg';
import ChevronRight from './icons/ChevronRight.svg';
import Clock from './icons/Clock.svg';
import Star from './icons/Star.svg';
import UserCircle from './icons/UserCircle.svg';
import Send from './icons/Send.svg';
import MessageSquare from './icons/MessageSquare.svg';
export type Props = SVGAttributes<any>;

export const MailIcon: FunctionComponent<Props> = (props) => (
  <Mail {...props} />
);
export const KeyIcon: FunctionComponent<Props> = (props) => <Key {...props} />;
export const EyeIcon: FunctionComponent<Props> = (props) => <Eye {...props} />;
export const EyeOffIcon: FunctionComponent<Props> = (props) => (
  <EyeOff {...props} />
);
export const SearchIcon: FunctionComponent<Props> = (props) => (
  <Search {...props} />
);
export const CartIcon: FunctionComponent<Props> = (props) => (
  <Cart {...props} />
);
export const SpinnerIcon: FunctionComponent<Props> = (props) => (
  <Spinner {...props} />
);

export const FacebookIcon: FunctionComponent<Props> = (props) => (
  <Facebook {...props} />
);

export const GoogleIcon: FunctionComponent<Props> = (props) => (
  <Google {...props} />
);

export const ChevronDownIcon: FunctionComponent<Props> = (props) => (
  <ChevronDown {...props} />
);

export const ChevronRightIcon: FunctionComponent<Props> = (props) => (
  <ChevronRight {...props} />
);

export const StarIcon: FunctionComponent<Props> = (props) => (
  <Star {...props} />
);

export const UserCircleIcon: FunctionComponent<Props> = (props) => (
  <UserCircle {...props} />
);
export const ClockIcon: FunctionComponent<Props> = (props) => (
  <Clock {...props} />
);
export const SendIcon: FunctionComponent<Props> = (props) => (
  <Send {...props} />
);
export const MessageSquareIcon: FunctionComponent<Props> = (props) => (
  <MessageSquare {...props} />
);
