import { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { createEditor, BaseEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { HistoryEditor, withHistory } from 'slate-history';

import {
  Plate,
  EditablePlugins,
  createReactPlugin,
  createParagraphPlugin,
  serializeHtml,
  usePlateEditorRef,
  BalloonToolbar,
  MarkToolbarButton,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  pipe,
  useEditorRef,
  usePlateEditorState,
  createPlateUIEditor
} from '@udecode/plate';
type Props = {
  value: Descendant[];
  onChange: (e: any) => void;
};

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
const plugins = [createReactPlugin(), createParagraphPlugin()];

const CommentEditor: FunctionComponent<Props> = ({ value, onChange }) => {
  const editableProps = {
    placeholder:
      'Xin mời để lại câu hỏi, CellphoneS sẽ trả lời ngay trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau.',
    style: {
      // minHeight: '120px',
      padding: '10px',
      flex: 1
      // boxShadow:
      //   'rgb(60 64 67 / 10%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px'
    }
  };

  // const editor = createPlateUIEditor({
  //   plugins: [createReactPlugin(), createParagraphPlugin()]
  // });

  // editor.plugins.some((plugin) => {
  //   console.log(plugin.serializeHtml === null);
  // });

  const editor = usePlateEditorRef();
  return (
    <Plate
      value={value}
      onChange={onChange}
      editableProps={editableProps}
      // editor={editor}
      // disableCorePlugins={true}
      plugins={plugins}
    />
  );

  // const editor = useMemo(() => withReact(createEditor()), []);
};

export default CommentEditor;
