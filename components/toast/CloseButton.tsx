import React, { FunctionComponent, SyntheticEvent } from 'react';
import { CloseIcon } from '@assets/icons';
import IconButton from '@components/common/IconButton';
import { noop } from '@utils/index';

type Props = {
  closeToast?: () => void;
  ariaLabel?: string;
};
const CloseButton: FunctionComponent<Props> = ({
  closeToast = noop,
  ariaLabel = 'close'
}) => {
  return (
    <IconButton
      className="self-start"
      icon={CloseIcon}
      onClick={(e: SyntheticEvent) => {
        e.stopPropagation();
        closeToast();
      }}
      aria-label={ariaLabel}
    ></IconButton>
  );
};

export default CloseButton;
