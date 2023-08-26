import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import Text from '../../atoms/Text';

const Switch = ({
  name,
  placeholder,
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          {...register(name as string)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-400"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {placeholder && (
            <span className="bg-white font-normal text-md">
              {placeholder}
            </span>
          )}
        </span>
      </label>
      <ErrorMessage
        errors={errors}
        name={name as string}
        render={({ message }) => (
          <Text className="text-red-400">{message}</Text>
        )}
      />
    </div>
  );
};
export default Switch;
