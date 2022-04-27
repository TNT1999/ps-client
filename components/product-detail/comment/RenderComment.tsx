import {
  createReactPlugin,
  createParagraphPlugin,
  createPlateUIEditor,
  serializeHtml
} from '@udecode/plate';
import { FunctionComponent } from 'react';

export const editableProps = {
  placeholder: 'Enter some rich text…',
  spellCheck: false,
  padding: '0 30px'
};

export const EditorComment = createPlateUIEditor({
  plugins: [createReactPlugin(), createParagraphPlugin()]
});

type Props = {
  nodes: object[];
};
const RenderComment: FunctionComponent<Props> = ({ nodes }) => {
  return (
    <div
      className="m-0 text-base text-gray-900"
      dangerouslySetInnerHTML={{
        __html: serializeHtml(EditorComment, {
          nodes
        })
      }}
    />
  );
};

export default RenderComment;
