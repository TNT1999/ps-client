import {
  ChangeEvent,
  FunctionComponent,
  SVGAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { Modal } from '@components/common/modal/Modal';
import { CloseIcon, ImageIcon, SpinnerIcon } from '@assets/icons';
import classNames from 'classnames';
import FileService, { FILE_TYPES } from '@utils/image';
import { isEmpty } from 'lodash';
import axiosClient from '@utils/api';
import { toast } from 'react-toastify';
import { RootState } from '@app/store';
import { useSelector } from 'react-redux';
import { UserInfo } from '@app/slice';

const Star: FunctionComponent<SVGAttributes<any>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        stroke="#FFB500"
        strokeWidth="1.5"
        d="M16 1.695l-4.204 8.518-9.401 1.366 6.802 6.631-1.605 9.363L16 23.153l8.408 4.42-1.605-9.363 6.802-6.63-9.4-1.367L16 1.695z"
      ></path>
    </svg>
  );
};
type Props = {
  onClose: () => void;
  product: any;
};
const ReviewModal: FunctionComponent<Props> = ({ onClose, product }) => {
  const user: UserInfo = useSelector((state: RootState) => state.auth.user);
  const [contentReview, setContentReview] = useState('');
  const [star, setStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<{ file: File; photoBase64: string }[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [sendingReview, setSendingReview] = useState(false);
  const [suggest, setSuggest] = useState<{
    status: 'success' | 'error';
    content: string;
  }>({
    status: 'success',
    content: 'Bạn đang giúp mọi người mua sắm tốt hơn!'
  });
  const renderTitleStar = useCallback((hoveredStar: number) => {
    switch (hoveredStar) {
      case 0:
        return 'Vui lòng đánh giá';
      case 1:
        return 'Rất không hài lòng';
      case 2:
        return 'Không hài lòng';
      case 3:
        return 'Bình thường';
      case 4:
        return 'Hài lòng';
      case 5:
        return 'Cực kì hài lòng';
    }
  }, []);

  useEffect(() => {
    if (files.length <= 5) {
      setSuggest({
        status: 'success',
        content: 'Bạn đang giúp mọi người mua sắm tốt hơn!'
      });
    }
  }, [files.length]);
  const handleDeleteImage = (deletedIndex: number) => {
    setFiles(files.filter((_, index) => index !== deletedIndex));
  };
  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = [...(e.target.files || [])];
    if (files.length + fileList.length > 5) {
      setSuggest({
        status: 'error',
        content: 'Chỉ thêm tối đa 5 ảnh'
      });
      return;
    }
    try {
      setLoadingImage(true);
      const previewImages: any[] = await Promise.all(
        fileList.map((file) => FileService.getImagePreview(file))
      );
      setFiles([...files, ...previewImages]);
      setLoadingImage(false);
    } catch (e) {
      console.log(e);
    } finally {
      e.target.value = '';
    }
  };

  const uploadImage = async (file: File) => {
    const { imageURL, presignedUrl } = await FileService.getPresignedImageURL();
    await fetch(presignedUrl, {
      method: 'PUT',
      body: file
    });
    return imageURL;
  };

  const handleReview = async () => {
    setSendingReview(true);
    try {
      const images = await Promise.all(
        files.map((file) => uploadImage(file.file))
      );
      await axiosClient.post('/review', {
        productId: product.productId,
        slug: product.slug,
        reviewValue: star,
        reviewer: {
          name: user?.name
        },
        content: {
          content: contentReview,
          images
        }
      });
      onClose();
    } catch (e) {
      toast.error('Nhận xét thất bại');
    }
    setSendingReview(false);
  };
  return (
    <Modal
      modalBackgroundColor="bg-white"
      containerClassName="p-5 animate-fadeInDown overflow-auto relative"
      width={602}
      shadow="shadow"
      rounded="rounded"
      onClose={onClose}
      className="bg-[#27272ab3]"
      clickOutsideToClose={false}
    >
      <div className="absolute right-5 top-5 cursor-pointer text-[#838288] opacity-90 hover:opacity-100">
        <CloseIcon onClick={onClose} />
      </div>
      <div>
        <div className="flex items-center mb-8 pr-10">
          <img
            src={product.option.images[0]}
            alt={`${product.name} - ${product.option.name}`}
            className="mr-3 w-11"
          />
          <div className="capitalize text-ellipsis-2-lines">{`${product.name} - ${product.option.name}`}</div>
        </div>
        <div className="text-xl mb-3 text-center font-medium">
          {renderTitleStar(star)}
        </div>
        <div className="flex justify-center">
          {[1, 2, 3, 4, 5].map((value) => {
            return (
              <Star
                key={value}
                className={classNames('mx-2 cursor-pointer text-white', {
                  'text-[#FDD835]': value <= star
                })}
                onMouseEnter={() => !selectedStar && setStar(value)}
                onMouseLeave={() => !selectedStar && setStar(0)}
                onClick={() => {
                  setStar(value);
                  setSelectedStar(true);
                }}
              />
            );
          })}
        </div>
        <textarea
          rows={8}
          placeholder={'Đánh giá của bạn?'}
          className="p-3 resize-none outline-0 mt-6 mb-3 rounded w-full border border-[#eeeeee] overflow-auto"
          onChange={(e) => setContentReview(e.target.value)}
          value={contentReview}
        />
        {!isEmpty(files) && (
          <div className="mb-3 flex">
            {files.map((file, index) => {
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
          </div>
        )}
        <div
          className={classNames('text-13 mb-3', {
            'text-[#ff424e]': suggest.status === 'error',
            'text-[#0d5cb6]': suggest.status === 'success'
          })}
        >
          {suggest.content}
        </div>
        <div className="flex justify-between items-center my-3 gap-x-3 text-13">
          <input
            type="file"
            ref={inputRef}
            hidden
            multiple
            accept={FILE_TYPES.join(', ')}
            onChange={handleFileInputChange}
          />
          <button
            className="flex flex-1 items-center justify-center h-9 cursor-pointer leading-9 rounded text-[#0b74e5] border border-[#0b74e5] overflow-hidden opacity-95 hover:opacity-100"
            onClick={() => inputRef.current?.click()}
          >
            {loadingImage ? (
              <SpinnerIcon className="animate-spin fill-current" />
            ) : (
              <>
                <ImageIcon className="mr-1 h-4 w-4" />
                <span className="bg-white">Thêm ảnh</span>
              </>
            )}
          </button>
          <button
            onClick={handleReview}
            className="flex flex-1 items-center justify-center bg-[#0b74e5] h-9 cursor-pointer leading-9 rounded overflow-hidden opacity-95 hover:opacity-100 text-white"
          >
            {sendingReview ? (
              <SpinnerIcon className="animate-spin fill-current" />
            ) : (
              <span>Gửi đánh giá</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
