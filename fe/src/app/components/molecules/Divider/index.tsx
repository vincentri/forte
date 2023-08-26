interface Props {
  text?: string;
}

const Divider = ({ text }: Props) => {
  return (
    <div className={`h-3 border-b border-gray-100 text-sm text-center`}>
      {text && <span className="bg-white px-3 font-normal">{text}</span>}
    </div>
  );
};

export default Divider;
