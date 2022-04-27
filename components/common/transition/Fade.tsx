import { noop } from '@utils/index';
import {
  cloneElement,
  FunctionComponent,
  isValidElement,
  ReactElement
} from 'react';
import { Transition } from 'react-transition-group';

type Props = {
  children: ReactElement;
  onEnter: (node: HTMLElement) => unknown;
  onExit: (node: HTMLElement) => unknown;
  style: object;
  in: boolean;
  timeout:
    | {
        enter: number;
        exit: number;
      }
    | number;
  [key: string]: unknown;
};
type StateTransition =
  | 'default'
  | 'entering'
  | 'entered'
  | 'exiting'
  | 'exited';
const styles = {
  default: {
    opacity: 0,
    willChange: 'opacity',
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
};

const Fade: FunctionComponent<Props> = ({
  children,
  onEnter,
  onExit,
  style: styleProp,
  timeout = {
    enter: 225,
    exit: 195
  },
  ...other
}) => {
  const handleEnter = (node: HTMLElement) => {
    onEnter && onEnter(node);
  };
  const handleExit = (node: HTMLElement) => {
    onExit && onExit(node);
  };

  const style = {
    ...styles.default,
    ...styleProp,
    ...(isValidElement(children) ? children.props.style : {})
  };

  return (
    <Transition
      appear
      onEnter={handleEnter}
      onExit={handleExit}
      addEndListener={noop}
      {...other}
    >
      {(state: StateTransition, childProps: any) => {
        cloneElement(children, {
          style: { ...style, ...styles[state] },
          ...childProps
        });
      }}
    </Transition>
  );
};

export default Fade;
