import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Text from '../Text';

const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <input
        type={props.type || 'text'}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...props}
        {...register(props.name as string)}
      />
      <ErrorMessage
        errors={errors}
        name={props.name as string}
        render={({ message }) => (
          <Text className="text-red-400">{message}</Text>
        )}
      />
    </div>
  );
};

export default Input;
