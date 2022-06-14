import { SlashIcon } from '@assets/icons';
import { formatMoney } from '@utils/index';
import { FunctionComponent } from 'react';
type Props = {
  items: any;
};

const OrderHistoryItem: FunctionComponent<Props> = ({ items }) => {
  return (
    <div>
      {items.map((item: any) => {
        return (
          <div key={item.id} className="flex justify-between items-center py-4">
            <div className="flex-1 pr-3">
              <div className="flex items-center">
                <a
                  target="_blank"
                  href={`/dien-thoai/${item.slug}`}
                  rel="noreferrer"
                  className="hover:text-[#0b74e5]"
                >
                  <img
                    src={item.option.images[0]}
                    className="h-20 w-20 object-contain border border-[#eeeeee] rounded"
                    alt=""
                  />
                </a>
                <div className="flex flex-1 flex-col mx-4 self-start text-13 text-[#242424]">
                  <a
                    className="text-[#242424] overflow-hidden text-ellipsis-2-lines leading-5 mb-1 hover:text-[#0b74e5] capitalize"
                    target="_blank"
                    href={`/dien-thoai/${item.slug}`}
                    rel="noreferrer"
                  >
                    {`${item.name} - ${item.option.name}`}
                  </a>
                  <span>{`x${item.quantity}`}</span>
                </div>
              </div>
            </div>
            <div className="self-start text-[#38383d]">
              {formatMoney(item.option.price * item.quantity)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistoryItem;
