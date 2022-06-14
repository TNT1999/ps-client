import { ChangeEvent, FunctionComponent, useCallback, useState } from 'react';
import TextWidget from '@components/widget/TextWidget';
import BooleanWidget from '@components/widget/BooleanWidget';
import AttributeWidget from '@components/widget/AttributeWidget';
import NumberWidget from '@components/widget/NumberWidget';
import ColorOptionWidget from '@components/widget/ColorOptionWidget';
import { ColorOption } from '@types';
import axiosClient from '@utils/api';
import FileService from '@utils/image';
type Props = {
  brands: Brand[];
};

export type Brand = {
  id: string;
  name: string;
};
export type Attribute = {
  type?: 'text' | 'select';
  option?: any[];
  canDelete?: boolean;
  canEditName?: boolean;
  name: string;
  value: string;
  onChange?: () => void;
  productFields?:
    | 'ram_gb'
    | 'storage_gb'
    | 'storage_tb'
    | 'display_size_inches'
    | 'price'
    | 'brand';
};

const initProduct = (brands: any[]) => {
  return {
    name: '',
    isHot: false,
    price: 0,
    hasVariants: false,
    discount: 0,
    productFields: {
      ram_gb: '',
      storage_gb: '',
      storage_tb: '',
      display_size_inches: '',
      brand: '',
      price: ''
    },
    attrs: [
      {
        name: 'Hãng sản xuất',
        type: 'select',
        value: '',
        canDelete: false,
        canEditName: false,
        option: brands,
        productFields: 'brand'
      },
      {
        name: 'Hệ điều hành',
        value: '',
        canDelete: false,
        canEditName: false
      },
      {
        name: 'Kích thước màn hình',
        value: '',
        canDelete: false,
        canEditName: false,
        productFields: 'display_size_inches'
      },
      {
        name: 'Dung lượng RAM',
        value: '',
        canDelete: false,
        canEditName: false,
        productFields: 'ram_gb'
      },
      {
        name: 'Bộ nhớ trong',
        value: '',
        canDelete: false,
        canEditName: false,
        productFields: 'storage_gb'
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
    ] as Attribute[],
    colorOptions: [] as ColorOption[]
  };
};

export type FileImage = {
  file: File;
  photoBase64: string;
};
export type FilesByColorOption = {
  colorId: string;
  images: FileImage[];
};
const Editor: FunctionComponent<Props> = ({ brands }) => {
  const [product, setProduct] = useState(initProduct(brands));

  const [files, setFiles] = useState<FilesByColorOption[]>([]);

  // const [variant, setVariant] = useState(false);

  const handleDeleteFilesColor = useCallback((colorId: string) => {
    setFiles((files) => [...files.filter((file) => file.colorId !== colorId)]);
  }, []);

  const handleChangeFilesColor = useCallback(
    (images: FileImage[], colorId: string) => {
      setFiles((files) => [
        ...files.filter((file) => file.colorId !== colorId),
        {
          colorId,
          images
        }
      ]);
    },
    []
  );

  const handleChangeTextWidget = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setProduct((product) => ({
        ...product,
        [e.target.name]: e.target.value
      }));
    },
    []
  );
  const handleChangeAttrsWidget = useCallback((attrs: Attribute[]) => {
    const productFields = {
      ram_gb: '',
      storage_gb: '',
      storage_tb: '',
      display_size_inches: '',
      brand: '',
      price: ''
    };
    attrs.forEach((attr) => {
      if (!attr.productFields) return;
      const field: keyof typeof productFields = attr.productFields;
      if (field === 'brand') {
        productFields[field] =
          brands.find((brand) => brand.name === attr.value)?.id || '';
      }
      if (field === 'display_size_inches') {
        productFields[field] = attr.value.split(' ')[0];
      }
      if (field === 'ram_gb') {
        productFields[field] = attr.value.split(' ')[0];
      }
      if (field === 'storage_gb') {
        const split = attr.value.split(' ');
        if (split.includes('GB')) {
          productFields['storage_gb'] = split[0];
        }
        if (split.includes('TB')) {
          productFields['storage_tb'] = split[0];
        }
      }
    });
    setProduct((product) => ({
      ...product,
      productFields,
      attrs
    }));
  }, []);

  const handleChangeBooleanWidget = useCallback(
    (name: string, boolean: boolean) => {
      setProduct((product) => ({
        ...product,
        [name]: boolean
      }));
    },
    []
  );

  const handleChangeColorOptionWidget = useCallback(
    (colorOptions: ColorOption[]) => {
      setProduct((product) => ({
        ...product,
        colorOptions
      }));
    },
    []
  );

  const uploadImage = async (file: File) => {
    const { imageURL, presignedUrl } = await FileService.getPresignedImageURL();
    await fetch(presignedUrl, {
      method: 'PUT',
      body: file
    });
    return imageURL;
  };

  const uploadFileColorOption = async (colorOption: FilesByColorOption) => {
    const uploadImagePromise = colorOption.images.map((image) =>
      uploadImage(image.file)
    );

    const imagesURL = await Promise.all(uploadImagePromise);
    return {
      id: colorOption.colorId,
      images: imagesURL
    };
  };

  const handleCreate = async () => {
    try {
      const colorOptionPromise = files.map((filesColor) =>
        uploadFileColorOption(filesColor)
      );
      const colorOption = await Promise.all(colorOptionPromise);

      const finalColorOptions = (
        colorOptions: { id: string; images: string[] }[]
      ) => {
        return product.colorOptions.map((colorOptionState) => {
          return {
            ...colorOptionState,
            ...colorOptions.find((color) => color.id === colorOptionState.id)
          };
        });
      };
      const postProduct = {
        ...product,
        colorOptions: finalColorOptions(colorOption),
        attrs: product.attrs.map((attr) => {
          return {
            name: attr.name,
            value: attr.value
          };
        })
      };
      console.log(postProduct);
      const savedProduct = await axiosClient.post('product', {
        ...product,
        colorOptions: [...product.colorOptions]
      });
    } catch (e) {
      console.log(e);
    }
  };
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
        files={files}
        onChange={handleChangeColorOptionWidget}
        onChangeFilesColor={handleChangeFilesColor}
        onDeleteFilesColorOption={handleDeleteFilesColor}
      />
      <button onClick={handleCreate}>Create Product</button>
    </>
  );
};

export default Editor;
