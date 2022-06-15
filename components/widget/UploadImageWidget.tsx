import { CloseIcon, UploadIcon } from '@assets/icons';
import { FileImage, FilesByColorOption } from '@components/admin/editor/Editor';
import Field from '@components/common/Field';
import { ColorOption } from '@types';
import FileService, { FILE_TYPES } from '@utils/image';
import { isEmpty } from 'lodash';
import {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState
} from 'react';

type Props = {
  color: ColorOption;
  onChangeFiles: (images: FileImage[], colorId: string) => void;
  colorFiles?: FilesByColorOption;
};
const UploadImageWidget: FunctionComponent<Props> = ({
  color,
  colorFiles = {
    colorId: color.id,
    images: []
  },
  onChangeFiles
}) => {
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState(colorFiles.images);
  const [loadingImage, setLoadingImage] = useState(false);
  const [sendingReview, setSendingReview] = useState(false);

  const handleDeleteImage = (deletedIndex: number) => {
    setFiles(files.filter((_, index) => index !== deletedIndex));
  };

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = [...(e.target.files || [])];
    // if (files.length + fileList.length > 5) {
    //   setSuggest({
    //     status: 'error',
    //     content: 'Chỉ thêm tối đa 5 ảnh'
    //   });
    //   return;
    // }
    setLoadingImage(true);
    try {
      const previewImages: any[] = await Promise.all(
        fileList.map((file) => FileService.getImagePreview(file))
      );
      setFiles([...files, ...previewImages]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingImage(false);
      e.target.value = '';
    }
  };

  useEffect(() => {
    onChangeFiles(files, color.id);
  }, [color.id, files, onChangeFiles]);

  return (
    <Field label={'Images'} noBorder={true} onClick={undefined}>
      <div className="mt-5">
        {isEmpty(files) ? (
          <div
            className="flex flex-col justify-center items-center py-4 cursor-pointer"
            onClick={() => inputRef.current.click()}
          >
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              JPG, PNG, OR JPEG
            </p>
          </div>
        ) : (
          <div className="mb-3 flex">
            {files &&
              files.map((file, index) => {
                return (
                  <div
                    key={index}
                    className="rounded h-16 w-16 border border-[#e0e0e0] bg-cover mr-4 relative"
                    style={{ backgroundImage: `url(${file.photoBase64})` }}
                  >
                    <span
                      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-gray-200 text-black rounded-full flex items-center w-5 h-5 justify-center cursor-pointer"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <CloseIcon className="w-3 h-3" />
                    </span>
                  </div>
                );
              })}
            <div
              className="h-16 w-16 border border-[#e0e0e0] mr-4 border-dashed rounded cursor-pointer flex justify-center items-center"
              onClick={() => inputRef.current.click()}
            >
              <UploadIcon className="text-[#00000033]" />
            </div>
          </div>
        )}
      </div>
      <input
        id={`image-${color.id}`}
        type="file"
        ref={inputRef}
        hidden
        multiple
        accept={FILE_TYPES.join(', ')}
        onChange={handleFileInputChange}
      />
    </Field>
  );
};

export default UploadImageWidget;
