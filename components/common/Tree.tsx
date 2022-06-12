import { ChevronRightIcon } from '@assets/icons';
import { FunctionComponent, memo } from 'react';
import Button from './Button';
import cx from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';
import { usePrevious } from 'react-use';
type Props = {
  type: string | null;
  expanded: boolean;
  onExpandToggle: () => void;
  onHeaderMouseEnter: () => void;
  onHeaderMouseLeave: () => void;
  actions: () => any; // render action.
  label: string;
  description: string; //description when collapse
};
// eslint-disable-next-line react/display-name
const Tree: FunctionComponent<Props> = memo(
  ({
    children,
    expanded,
    description,
    label,
    type,
    actions,
    onExpandToggle,
    onHeaderMouseLeave,
    onHeaderMouseEnter
  }) => {
    const previous = usePrevious(expanded);
    console.log(expanded, previous);
    return (
      <div>
        <div className="flex items-center cursor-move">
          <Button
            transparent
            onClick={onExpandToggle}
            onMouseEnter={onHeaderMouseEnter}
            onMouseLeave={onHeaderMouseLeave}
            className="-ml-3 py-0 !px-2"
          >
            <ChevronRightIcon
              className={cx('duration-200 align-middle', {
                'rotate-90': expanded,
                'rotate-0': !expanded
              })}
            />
          </Button>
          <div
            className="flex flex-col justify-center flex-1 h-14 py-3 px-0 ml-[-2px]"
            onClick={onExpandToggle}
            onMouseEnter={onHeaderMouseEnter}
            onMouseLeave={onHeaderMouseLeave}
          >
            {label && !expanded && <label>{label}</label>}
            {description && (
              <div
                className={cx('duration-200 mt-[0.375rem]', {
                  'opacity-0  -mb-6': expanded,
                  'opacity-100 -mb-2': !expanded
                })}
              >
                {description}
              </div>
            )}
          </div>
          {actions && actions()}
        </div>

        <div
          className={cx(
            'ml-1 overflow-hidden flex flex-col justify-end duration-200 w-full',
            {
              'shadow-[inset_0_-1px_0_0_#D3D6DF,inset_2px_0_0_0_#00AD9E]':
                type === 'success',
              'shadow-[inset_0_-1px_0_0_#D3D6DF,inset_2px_0_0_0_#D56262]':
                type === 'danger',
              'shadow-[inset_0_-1px_0_0_#D3D6DF,inset_1px_0_0_0_#D3D6DF]':
                type == null,
              'pointer-events-none': !expanded
            }
          )}
        >
          <motion.div
            className="relative"
            variants={{
              expanded: {
                opacity: 1,
                height: 'auto',
                marginTop: '-0.5rem'
              },
              collapsed: {
                opacity: 0,
                height: 1,
                marginTop: 0
              }
            }}
            initial={false}
            animate={expanded ? 'expanded' : 'collapsed'}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    );
  }
);
export default Tree;
