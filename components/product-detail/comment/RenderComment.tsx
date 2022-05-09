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
  value: string;
};
const RenderComment: FunctionComponent<Props> = ({ value }) => {
  return (
    <div
      className="m-0 text-base text-gray-900  whitespace-pre-wrap"
      // dangerouslySetInnerHTML={{
      //   __html: serializeHtml(EditorComment, {
      //     nodes
      //   })
      // }}
    >
      {value}
    </div>
  );
};

export default RenderComment;
