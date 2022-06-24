import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react';
import TextWidget from '@components/widget/TextWidget';
import BooleanWidget from '@components/widget/BooleanWidget';
import AttributeWidget from '@components/widget/AttributeWidget';
import NumberWidget from '@components/widget/NumberWidget';
import ColorOptionWidget from '@components/widget/ColorOptionWidget';
import { ColorOption, ProductType } from '@types';
import axiosClient from '@utils/api';
import FileService from '@utils/image';
import { nanoid } from '@reduxjs/toolkit';

type Props = {
  brands: Brand[];
  initialProduct?: any;
  method: 'post' | 'put';
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
        value: '',
        type: 'select',
        canDelete: false,
        canEditName: false,
        option: brands,
        productFields: 'brand'
      },
      {
        name: 'Hệ điều hành',
        value: ''
      },
      {
        name: 'Kích thước màn hình',
        value: '',
        canDelete: false,
        canEditName: false,
        productFields: 'display_size_inches'
      },
      {
        name: 'Công nghệ màn hình',
        value: ''
      },
      {
        name: 'Độ phân giải màn hình',
        value: ''
      },
      {
        name: 'Tần số quét',
        value: ''
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
      },
      {
        name: 'Chipset',
        value: ''
      },
      {
        name: 'Loại CPU',
        value: ''
      },
      {
        name: 'GPU',
        value: ''
      },
      {
        name: 'Thẻ SIM',
        value: ''
      },
      {
        name: 'Jack tai nghe 3.5',
        value: ''
      },
      {
        name: 'Hỗ trợ mạng',
        value: ''
      },
      {
        name: 'Wi-Fi',
        value: ''
      },
      {
        name: 'Bluetooth',
        value: ''
      },
      {
        name: 'GPS',
        value: ''
      },
      {
        name: 'Camera sau',
        value: ''
      },
      {
        name: 'Quay video sau',
        value: ''
      },
      {
        name: 'Camera trước',
        value: ''
      },
      {
        name: 'Quay video trước',
        value: ''
      },
      {
        name: 'Công nghệ sạc',
        value: ''
      },
      {
        name: 'Cổng sạc',
        value: ''
      },
      {
        name: 'Cảm biến vân tay',
        value: ''
      },
      {
        name: 'Các loại cảm biến',
        value: ''
      }
    ],
    colorOptions: [] as ColorOption[]
  };
};

const prepareColorOptionFiles = (initialProduct: any): any => {
  return (
    initialProduct?.colorOptions.map((color: any) => ({
      colorId: color.id,
      images: color.images
    })) || []
  );
};
export type FileImage = {
  file: File;
  photoBase64: string;
};
export type FilesByColorOption = {
  colorId: string;
  images: FileImage[] | string[];
};
const injectOptionForBrand = (initialProduct: any, brands: any[]) => {
  initialProduct.attrs.find(
    (attr: any) => attr.productFields === 'brand'
  ).option = brands;
  return initialProduct;
};
const Editor: FunctionComponent<Props> = ({
  brands,
  initialProduct,
  method
}) => {
  const prepareProduct = (initialProduct: any): any => {
    return initialProduct
      ? injectOptionForBrand(initialProduct, brands)
      : initProduct(brands);
  };
  // const [product, setProduct] = useState(initProduct(brands));
  const [product, setProduct] = useState(prepareProduct(initialProduct));
  const [files, setFiles] = useState<FilesByColorOption[]>(
    // []
    prepareColorOptionFiles(initialProduct)
  );

  // useAsyncEffect(async () => {
  //   const product = await axiosClient.get('product/iphone-13-pro-max-512gb');
  //   setProduct(product as any);
  // }, []);
  // const [variant, setVariant] = useState(false);

  const handleDeleteFilesColor = useCallback((colorId: string) => {
    setFiles((files) => [...files.filter((file) => file.colorId !== colorId)]);
  }, []);

  const handleChangeFilesColor = useCallback(
    (images: FileImage[] | string[], colorId: string) => {
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
      setProduct((product: any) => ({
        ...product,
        [e.target.name]: e.target.value
      }));
    },
    []
  );
  const handleChangeAttrsWidget = useCallback(
    (attrs: Attribute[]) => {
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
            productFields['storage_tb'] = '-1';
          }
          if (split.includes('TB')) {
            productFields['storage_tb'] = split[0];
            productFields['storage_gb'] = '-1';
          }
        }
      });
      setProduct((product: any) => ({
        ...product,
        productFields,
        attrs
      }));
    },
    [brands]
  );

  const handleChangeBooleanWidget = useCallback(
    (name: string, boolean: boolean) => {
      setProduct((product: any) => ({
        ...product,
        [name]: boolean
      }));
    },
    []
  );

  const handleChangeColorOptionWidget = useCallback(
    (colorOptions: ColorOption[]) => {
      setProduct((product: any) => ({
        ...product,
        colorOptions
      }));
    },
    []
  );

  const uploadFileColorOption = async (colorOption: FilesByColorOption) => {
    console.log(colorOption);
    const uploadImagePromise = colorOption.images.map((image) => {
      if (typeof image !== 'string') {
        return FileService.uploadImage(image.file);
      }
      return image;
    });

    const imagesURL = await Promise.all(uploadImagePromise);

    return {
      id: colorOption.colorId,
      images: imagesURL
    };
  };

  const getFinalColorOptions = (
    colorOptionsFromFilesS3: { id: string; images: string[] }[]
  ) => {
    return product.colorOptions.map((colorOptionState: any) => {
      return {
        ...colorOptionState,
        ...colorOptionsFromFilesS3.find(
          (color) => color.id === colorOptionState.id
        )
      };
    });
  };

  const getProductFields = (
    productFields: {
      ram_gb: string | number;
      storage_gb: string | number;
      storage_tb: string | number;
      display_size_inches: string | number;
      brand: string;
      price: string | number;
    },
    priceFromColorOption: string
  ) => {
    for (const [key, value] of Object.entries(productFields)) {
      if (key === 'ram_gb') productFields[key] = parseFloat(value.toString());
      if (key === 'storage_gb')
        productFields[key] = parseFloat(value.toString());
      if (key === 'storage_tb')
        productFields[key] = parseFloat(value.toString());
      if (key === 'display_size_inches')
        productFields[key] = parseFloat(value.toString());
      if (key === 'price')
        productFields[key] = parseFloat(
          product.price !== 0 ? product.price.toString() : priceFromColorOption
        );
      if (key === 'brand') productFields[key] = value.toString();
    }

    return {
      ...productFields
    };
  };

  const handleCreate = async () => {
    try {
      const colorOptionPromise = files.map((filesColor) =>
        uploadFileColorOption(filesColor)
      );
      const colorOption = await Promise.all(colorOptionPromise);

      console.log(colorOption);

      const colorOptions = getFinalColorOptions(colorOption);
      const productFields = getProductFields(
        product.productFields,
        colorOptions[0].price.toString()
      );
      const body = {
        ...product,
        lname: product.name.toLowerCase(),
        price: product.price !== 0 ? product.price : colorOptions[0].price,
        isMainProduct: true,
        thumbnail: colorOptions[0].images[0],
        slug:
          product.slug ||
          product.name
            .split(' ')
            .join('-')
            .concat(`-${nanoid(8)}`)
            .toLowerCase(),
        productFields,
        colorOptions
      };
      console.log(body);
      method === 'put'
        ? await axiosClient.put('product', body)
        : await axiosClient.post('product', body);
    } catch (e) {
      console.log(e);
    }
  };

  if (!product) return null;

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
        name={'discount'}
        value={product.discount}
        title={false}
        onChange={(newDiscount) =>
          setProduct({
            ...product,
            discount: newDiscount
          })
        }
        label={'Discount ( % )'}
      />
      <ColorOptionWidget
        name=""
        value={product.colorOptions}
        files={files}
        onChange={handleChangeColorOptionWidget}
        onChangeFilesColor={handleChangeFilesColor}
        onDeleteFilesColorOption={handleDeleteFilesColor}
      />
      <button onClick={handleCreate}>
        {method === 'post' ? 'Create Product' : 'Update Product'}
      </button>
    </>
  );
};

export default Editor;
