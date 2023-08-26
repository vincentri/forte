import { Tooltip as TooltipLib } from 'react-tooltip';

interface IProps {
  children: React.ReactNode;
  label?: string;
}

export default function Tooltip({ children, label }: IProps) {
  if (!label) return children;
  return (
    <span>
      <a
        data-tooltip-id="my-tooltip"
        data-tooltip-html={label}
        className="cursor-pointer"
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </a>
      <TooltipLib id="my-tooltip" place="bottom-start" />
    </span>
  );
}
