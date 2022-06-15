import { ChangeEvent, FunctionComponent, useCallback, useState } from 'react';
import TextWidget from '@components/widget/TextWidget';
import BooleanWidget from '@components/widget/BooleanWidget';
import AttributeWidget from '@components/widget/AttributeWidget';
import NumberWidget from '@components/widget/NumberWidget';
import ColorOptionWidget from '@components/widget/ColorOptionWidget';
import { ColorOption } from '@types';
import axiosClient from '@utils/api';
import FileService from '@utils/image';
import { nanoid } from '@reduxjs/toolkit';
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
    attrs:
      // [
      //   {
      //     name: 'Hãng sản xuất',
      //     type: 'select',
      //     value: '',
      //     canDelete: false,
      //     canEditName: false,
      //     option: brands,
      //     productFields: 'brand'
      //   },
      //   {
      //     name: 'Hệ điều hành',
      //     value: '',
      //     canDelete: false,
      //     canEditName: false
      //   },
      //   {
      //     name: 'Kích thước màn hình',
      //     value: '',
      //     canDelete: false,
      //     canEditName: false,
      //     productFields: 'display_size_inches'
      //   },
      //   {
      //     name: 'Dung lượng RAM',
      //     value: '',
      //     canDelete: false,
      //     canEditName: false,
      //     productFields: 'ram_gb'
      //   },
      //   {
      //     name: 'Bộ nhớ trong',
      //     value: '',
      //     canDelete: false,
      //     canEditName: false,
      //     productFields: 'storage_gb'
      //   },
      //   {
      //     name: 'Pin',
      //     value: ''
      //   },
      //   {
      //     name: 'Kích thước',
      //     value: ''
      //   },
      //   {
      //     name: 'Trọng lượng',
      //     value: ''
      //   }
      // ] as Attribute[],

      [
        {
          name: 'Hãng sản xuất',
          value: 'Vivo',
          type: 'select',
          canDelete: false,
          canEditName: false,
          option: [
            {
              id: '6265162eed0321a0b9ccbf21',
              name: 'Apple'
            },
            {
              id: '62651679ed0321a0b9ccbf25',
              name: 'Samsung'
            },
            {
              id: '6265168ced0321a0b9ccbf26',
              name: 'Xiaomi'
            },
            {
              id: '6265169eed0321a0b9ccbf28',
              name: 'OPPO'
            },
            {
              id: '626516b0ed0321a0b9ccbf29',
              name: 'Nokia'
            },
            {
              id: '626516dbed0321a0b9ccbf2b',
              name: 'Realme'
            },
            {
              id: '626516fbed0321a0b9ccbf2d',
              name: 'Vsmart'
            },
            {
              id: '62651728ed0321a0b9ccbf2f',
              name: 'Vivo'
            }
          ],
          productFields: 'brand'
        },
        {
          name: 'Hệ điều hành',
          value: 'Android 12, FunTouchOS 12',
          canDelete: false,
          canEditName: false
        },
        {
          name: 'Kích thước màn hình',
          value: '6.58 inches',
          canDelete: false,
          canEditName: false,
          productFields: 'display_size_inches'
        },
        {
          name: 'Công nghệ màn hình',
          value: 'IPS LCD'
        },
        {
          name: 'Độ phân giải màn hình',
          value: '1080 x 2408 pixels'
        },
        {
          name: 'Tần số quét',
          value: '90 Hz'
        },
        {
          name: 'Dung lượng RAM',
          value: '4 GB',
          canDelete: false,
          canEditName: false,
          productFields: 'ram_gb'
        },
        {
          name: 'Bộ nhớ trong',
          value: '64 GB',
          canDelete: false,
          canEditName: false,
          productFields: 'storage_gb'
        },
        {
          name: 'Pin',
          value: '5000 mAh'
        },
        {
          name: 'Kích thước',
          value: '164.26×76.08×8.00mm'
        },
        {
          name: 'Trọng lượng',
          value: '182g'
        },
        {
          name: 'Chipset',
          value: 'Snapdragon 680'
        },
        {
          name: 'Loại CPU',
          value: '2x2.4 GHz Cortex-A78 & 6x2.0 GHz Cortex-A55'
        },
        {
          name: 'GPU',
          value: 'Mali-G68 MC4'
        },
        {
          name: 'Thẻ SIM',
          value: '2 SIM (Nano-SIM)'
        },
        {
          name: 'Jack tai nghe 3.5',
          value: 'Có'
        },
        {
          name: 'Hỗ trợ mạng',
          value: '5G'
        },
        {
          name: 'Wi-Fi',
          value: '2.4GHz / 5GHz'
        },
        {
          name: 'Bluetooth',
          value: '5.0'
        },
        {
          name: 'GPS',
          value: 'GPS, BEIDOU, GLONASS, GALILEO, QZSS'
        },
        {
          name: 'Camera sau',
          value:
            'Camera chính: 50MP, f/1.8 Camera macro: 2 MP, f/2.4 Cảm biến độ sâu 2MP, f/2.4'
        },
        {
          name: 'Quay video sau',
          value: '4K@30fps, 1080p@30/60fps, gyro-EIS'
        },
        {
          name: 'Camera trước',
          value: '8 MP, f/2.0'
        },
        {
          name: 'Quay video trước',
          value: '1080p@30fps'
        },
        {
          name: 'Công nghệ sạc',
          value: 'Sạc nhanh 18W'
        },
        {
          name: 'Cổng sạc',
          value: 'USB Type-C'
        },
        {
          name: 'Cảm biến vân tay',
          value: 'Cảm biến vân tay cạnh bên'
        },
        {
          name: 'Các loại cảm biến',
          value:
            'Cảm biến ánh sáng, Cảm biến gia tốc, Cảm biến tiệm cận, Con quay hồi chuyển, La bàn'
        }
      ],

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
          productFields['storage_tb'] = '-1';
        }
        if (split.includes('TB')) {
          productFields['storage_tb'] = split[0];
          productFields['storage_gb'] = '-1';
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

  const uploadFileColorOption = async (colorOption: FilesByColorOption) => {
    const uploadImagePromise = colorOption.images.map((image) =>
      FileService.uploadImage(image.file)
    );

    const imagesURL = await Promise.all(uploadImagePromise);
    return {
      id: colorOption.colorId,
      images: imagesURL
    };
  };

  const getFinalColorOptions = (
    colorOptionsFromFilesS3: { id: string; images: string[] }[]
  ) => {
    return product.colorOptions.map((colorOptionState) => {
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

      const colorOptions = getFinalColorOptions(colorOption);
      const productFields = getProductFields(
        product.productFields,
        colorOptions[0].price.toString()
      );
      const postProduct = {
        ...product,
        lname: product.name.toLowerCase(),
        price: product.price !== 0 ? product.price : colorOptions[0].price,
        isMainProduct: true,
        thumbnail: colorOptions[0].images[0],
        slug: product.name
          .split(' ')
          .join('-')
          .concat(`-${nanoid(8)}`)
          .toLowerCase(),
        productFields,
        colorOptions
      };
      console.log(postProduct);
      await axiosClient.post('product', postProduct);
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
