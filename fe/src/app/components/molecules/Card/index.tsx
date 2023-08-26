const Card = ({
  children,
  className,
  onClick,
}: React.DetailedHTMLProps<
  React.HtmlHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => {
  return (
    <div
      className={`${className} p-5 bg-white border border-gray-100 rounded-lg shadow-lg`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
