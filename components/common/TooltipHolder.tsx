import React, { FunctionComponent } from 'react';
import ReactHintFactory from 'react-hint';
import 'react-hint/css/index.css';
import Tooltip from './Tooltip';

const ReactHint = ReactHintFactory(React);
const TooltipHolder: FunctionComponent = () => {
  const renderTooltipHandler = (target: HTMLElement) => {
    const { tooltip, tooltipMaxWidth = '0', placement } = target.dataset;
    const maxWidthNumber = parseInt(tooltipMaxWidth);
    if (tooltip) {
      return <Tooltip text={tooltip} maxWidth={maxWidthNumber} />;
    }
  };
  return (
    <ReactHint
      attribute="data-tooltip"
      autoPosition
      delay={{ show: 200, hide: 100 }}
      events={{ hover: true, focus: false, click: false }}
      onRenderContent={renderTooltipHandler}
    />
  );
};

export default TooltipHolder;
