const Button = ({
  children,
  disabled = false,
  className,
  type = 'button',
  onClick,
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-purple-400 text-white rounded-lg w-full px-5 py-2.5 text-center font-medium disabled:bg-purple-100 ease-linear transition-all duration-150 shadow hover:shadow-lg outline-none focus:outline-none  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
