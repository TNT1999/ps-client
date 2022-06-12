import { ChangeEvent, FunctionComponent, useCallback, useState } from 'react';
import TextWidget from '@components/widget/TextWidget';
import BooleanWidget from '@components/widget/BooleanWidget';
import AttributeWidget from '@components/widget/AttributeWidget';
import NumberWidget from '@components/widget/NumberWidget';
import ColorOptionWidget from '@components/widget/ColorOptionWidget';
import { ColorOption } from '@types';
type Props = any;

export type Attribute = {
  name: string;
  value: string;
};

const initProduct = {
  name: 'Tên sản phẩm',
  isHot: false,
  price: 0,
  hasVariants: false,
  discount: 0,
  attrs: [
    {
      name: 'Hãng sản xuất',
      value: ''
    },
    {
      name: 'Hệ điều hành',
      value: ''
    },
    {
      name: 'Kích thước màn hình',
      value: ''
    },
    {
      name: 'Dung lượng RAM',
      value: ''
    },
    {
      name: 'Bộ nhớ trong',
      value: ''
    },
    {
      name: 'Pin',
      value: ''
    },
    {
      name: 'Kích thước',
      value: ''
    },
    {
      name: 'Trọng lượng',
      value: ''
    }
  ],
  colorOptions: [] as ColorOption[]
};
const Editor: FunctionComponent<Props> = () => {
  const [product, setProduct] = useState(initProduct);
  const [variant, setVariant] = useState(false);

  const handleChangeTextWidget = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({
        ...product,
        [e.target.name]: e.target.value
      });
    },
    []
  );
  const handleChangeAttrsWidget = useCallback((attrs: Attribute[]) => {
    setProduct({
      ...product,
      attrs
    });
  }, []);

  const handleChangeBooleanWidget = useCallback(
    (name: string, boolean: boolean) => {
      setProduct({
        ...product,
        [name]: boolean
      });
    },
    []
  );

  const handleChangeColorOptionWidget = useCallback(
    (colorOptions: ColorOption[]) => {
      setProduct({
        ...product,
        colorOptions
      });
    },
    []
  );
  return (
    <>
      <TextWidget
        title
        label="Product Name"
        name="name"
        value={product.name}
        onChange={handleChangeTextWidget}
      />
      <BooleanWidget
        label={'Hot'}
        name={'isHot'}
        onChange={handleChangeBooleanWidget}
        value={product.isHot}
      />
      <BooleanWidget
        label={'Variants'}
        name={'hasVariants'}
        onChange={handleChangeBooleanWidget}
        value={product.hasVariants}
      />
      <AttributeWidget
        value={product.attrs}
        onChange={handleChangeAttrsWidget}
        name={'attribute'}
      />
      <NumberWidget
        name={'price'}
        value={product.price}
        title={false}
        onChange={(newPrice) =>
          setProduct({
            ...product,
            price: newPrice
          })
        }
        label={'Price'}
      />
      <ColorOptionWidget
        name={''}
        value={product.colorOptions}
        onChange={handleChangeColorOptionWidget}
      />
    </>
  );
};

export default Editor;
