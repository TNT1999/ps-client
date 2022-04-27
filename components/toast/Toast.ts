import { ACTION, POSITION, TYPE } from '@utils/constants';
import eventManager from '@utils/eventManager';

let container: any = null;
let queue: any = [];
const noop = (any?: any) => false;

function generateToastId() {
  return (Math.random().toString(36) + Date.now().toString(36)).substr(2, 10);
}

function getToastId(options: any) {
  if (
    options &&
    (typeof options.toastId === 'string' ||
      (typeof options.toastId === 'number' && !isNaN(options.toastId)))
  ) {
    return options.toastId;
  }

  return generateToastId();
}

/**
 * Dispatch toast. If the container is not mounted, the toast is enqueued
 */
const emitEvent = (options: any) => {
  if (container !== null) {
    eventManager.emit(ACTION.SHOW, options);
  } else {
    queue.push({ action: ACTION.SHOW, options });
  }

  return options.toastId;
};

function mergeOptions(options: any, type: any) {
  return { ...options, type, toastId: getToastId(options) };
}

const toast = Object.assign(
  (options: any) =>
    emitEvent(mergeOptions(options, (options && options.type) || TYPE.DEFAULT)),
  {
    success: (options: any) => emitEvent(mergeOptions(options, TYPE.SUCCESS)),
    info: (options: any) => emitEvent(mergeOptions(options, TYPE.INFO)),
    warn: (options: any) => emitEvent(mergeOptions(options, TYPE.WARNING)),
    warning: (options: any) => emitEvent(mergeOptions(options, TYPE.WARNING)),
    error: (options: any) => emitEvent(mergeOptions(options, TYPE.ERROR)),
    dismiss: (id = null) => container && eventManager.emit(ACTION.CLEAR, id),
    isActive: noop,
    update(toastId: any, options: any) {
      setTimeout(() => {
        if (container && typeof container.collection[toastId] !== 'undefined') {
          const { options: oldOptions } = container.collection[toastId];

          const nextOptions = {
            ...oldOptions,
            ...options,
            toastId: options.toastId || toastId
          };

          if (!options.toastId || options.toastId === toastId) {
            nextOptions.updateId = generateToastId();
          } else {
            nextOptions.staleToastId = toastId;
          }

          emitEvent(nextOptions);
        }
      }, 0);
    },
    done(id: any, progress = 1) {
      toast.update(id, {
        progress,
        isProgressDone: true
      });
    },
    onChange(callback: any) {
      if (typeof callback === 'function') {
        eventManager.on(ACTION.ON_CHANGE, callback);
      }
    },
    POSITION,
    TYPE
  }
);

/**
 * Wait until the ToastContainer is mounted to dispatch the toast
 * and attach isActive method
 */
eventManager
  .on(ACTION.DID_MOUNT, (containerInstance: any) => {
    container = containerInstance;
    toast.isActive = (id: string) => !!container.isToastActive(id);

    queue.forEach((item: any) => {
      eventManager.emit(item.action, item.options);
    });

    queue = [];
  })
  .on(ACTION.WILL_UNMOUNT, () => {
    container = null;
    toast.isActive = noop;
  });
