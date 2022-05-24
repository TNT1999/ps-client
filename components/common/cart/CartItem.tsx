import {
  CartItemType,
  setQuantityItemCart,
  updateQuantityCartItem,
  updateSelectedCartItem
} from '@app/slice/cartSlice';
import { useAppDispatch } from '@app/store';
import { TrashIcon } from '@assets/icons';
import { formatMoney } from '@utils/index';
import { FunctionComponent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from 'react-use';
import NumberQuantity from '../NumberQuantity';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import Debounce from 'lodash/debounce';
type Props = {
  item: CartItemType;
};
const CartItem: FunctionComponent<Props> = ({ item }) => {
  const oldPrice = item.option.price;
  const discountPrice = oldPrice * (100 - (item.discount || 0)) * 0.01;
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleUpdateQuantityCartItem = async (qty: number) => {
    try {
      await dispatch(
        updateQuantityCartItem({
          productId: item.productId,
          optionId: item.option.id,
          quantity: qty
        })
      ).unwrap();
      // toast.success('Cập nhật sản phẩm thành công', {
      //   autoClose: 1000
      // });
    } catch (err) {
      toast.error('Cập nhật sản phẩm thất bại', {
        autoClose: 1000
      });
    }
  };
  const handleChangeQty = Debounce(handleUpdateQuantityCartItem, 0);
  const handleUpdateSelectedCartItem = async (selected: boolean) => {
    try {
      await dispatch(
        updateSelectedCartItem({
          productId: item.productId,
          optionId: item.option.id,
          selected
        })
      ).unwrap();
      // toast.success('Cập nhật sản phẩm thành công', {
      //   autoClose: 1000
      // });
    } catch (err) {
      toast.error('Cập nhật sản phẩm thất bại', {
        autoClose: 1000
      });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center -mx-4">
          <div className="w-[398px] px-4">
            <div className="flex items-center">
              <div>
                <input
                  id="all-product"
                  value="white"
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 mr-3 rounded-lg text-indigo-600 focus:ring-indigo-500"
                  onChange={(e) =>
                    handleUpdateSelectedCartItem(e.target.checked)
                  }
                  checked={item.selected}
                />
              </div>
              <a
                target="_blank"
                href={`dien-thoai/${item.slug}`}
                rel="noreferrer"
                className="hover:text-[#0b74e5]"
              >
                <img
                  src={item.option.images[0]}
                  className="h-20 w-20 object-contain"
                  alt=""
                />
              </a>
              <div className="pl-3 w-[calc(100%-30px)]">
                <a
                  className="text-13 text-[#242424] overflow-hidden text-ellipsis-2-lines leading-5 mb-1 hover:text-[#0b74e5]"
                  target="_blank"
                  href={`dien-thoai/${item.slug}`}
                  rel="noreferrer"
                >
                  {`${item.name} - ${item.option.name}`}
                </a>
              </div>
            </div>
          </div>
          <div className="w-[190px] px-4 flex flex-col">
            <span className="mr-1 inline-block font-medium text-13">
              {formatMoney(item.discount ? discountPrice : oldPrice)}
            </span>
            {item.discount && (
              <del className="inline-block text-11 text-[#999999]">
                {formatMoney(oldPrice)}
              </del>
            )}
          </div>
          <div className="w-[130px] px-4">
            <NumberQuantity
              value={item.quantity}
              onChange={(qty) => handleChangeQty(qty)}
            />
          </div>
          <div className="w-[130px] px-4">
            <span className="block font-medium text-13 text-red-600">
              {formatMoney(
                item.discount
                  ? discountPrice * item.quantity
                  : oldPrice * item.quantity
              )}
            </span>
          </div>
          <div className="w-[50px] text-right">
            <span
              className="cursor-pointer inline-block"
              onClick={() => setConfirmDeleteVisible(true)}
            >
              <TrashIcon className="h-[16px] w-[16px] text-gray-400 hover:text-gray-500 cursor-pointer" />
            </span>
            {confirmDeleteVisible && (
              <ConfirmDeleteModal
                onClose={() => setConfirmDeleteVisible(false)}
                productId={item.productId}
                optionId={item.option.id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
