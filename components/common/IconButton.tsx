import { FunctionComponent } from 'react';
type Props = {
  icon: FunctionComponent;
  [key: string]: unknown;
};
const IconButton: FunctionComponent<Props> = (props) => {
  const Icon = props.icon;
  return (
    <button
      {...props}
      className="text-[#616C7A] bg-transparent p-1 border-none h-8 w-8 rounded-md outline-none cursor-pointer duration-[250] hover:text-[#0E1E25] hover:bg-[#0e1e250d] active:text-[#0E1E25] active:bg-[#0e1e251a]"
    >
      <Icon />
    </button>
  );
};
export default IconButton;
