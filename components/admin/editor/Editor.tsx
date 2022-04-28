import { FunctionComponent, useState } from 'react';
import TextWidget from '@components/widget/TextWidget';
import BooleanWidget from '@components/widget/BooleanWidget';
import AttributeWidget from '@components/widget/AttributeWidget';
import NumberWidget from '@components/widget/NumberWidget';
import ColorOptionWidget from '@components/widget/ColorOptionWidget';
type Props = any;
const Editor: FunctionComponent<Props> = () => {
  const [value, setValue] = useState('initial value');
  const [booleanHot, setHot] = useState(false);
  const [variant, setVariant] = useState(false);
  const [price, setPrice] = useState<number | null>(null);
  return (
    <>
      <TextWidget
        title
        name="title"
        label="Product Name"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      <BooleanWidget
        name={'Hot Product'}
        label={'Hot'}
        onChange={(s) => setHot(s)}
        value={booleanHot}
      />
      <BooleanWidget
        name={'Has variants'}
        label={'Variants'}
        onChange={(s) => setVariant(s)}
        value={variant}
      />
      <AttributeWidget
        value={value}
        onNameChanged={function (name: string): void {
          console.log(name);
        }}
        onValueChanged={function (value: string): void {
          console.log(value);
        }}
        name={'attribute'}
      />
      <NumberWidget
        name={'price'}
        value={price}
        title={false}
        onChange={(value) => setPrice(value || null)}
        label={'Price'}
      />
      <ColorOptionWidget
        name={''}
        value={''}
        onNameChanged={function (name: string): void {
          throw new Error('Function not implemented.');
        }}
        onValueChanged={function (value: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default Editor;
