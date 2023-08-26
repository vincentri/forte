'use client';

import * as yup from 'yup';

import { FormProvider, useForm } from 'react-hook-form';

import Button from './components/atoms/Button';
import Card from './components/molecules/Card';
import Input from './components/atoms/Input';
import { LoginResponseDto } from '@/api/auths/dto/loginResponse.dto';
import { login } from '@/api/auths/auth';
import { toast } from 'react-toastify';
import { useAuthState } from '@/providers/auth/state';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { yupResolver } from '@hookform/resolvers/yup';

interface LoginFormProps {
  email: string;
  password: string;
}

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-4/5 md:w-1/2  lg:w-1/3 xl:w-1/4">
        <h5 className={`font-semibold text-2xl text-center mb-3`}>Login</h5>
        <LoginForm />
      </Card>
    </div>
  );
}

const LoginForm = () => {
  const route = useRouter();
  const setLoginToken = useAuthState((state) => state.setLoginToken);
  const methods = useForm<LoginFormProps>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
      })
    ),
  });
  const { handleSubmit } = methods;
  const { trigger, isMutating } = useSWRMutation('login', login);

  const onSubmit = async ({ email, password }: LoginFormProps) => {
    try {
      const { data } = await trigger({
        email,
        password,
      });
      const { accessToken }: LoginResponseDto = data;
      setLoginToken(accessToken);
      localStorage.setItem('showWelcome', 'true');
      route.push('/dashboard');
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Input name="email" placeholder="Email" />
        </div>
        <div className="mb-3">
          <Input name="password" type="password" placeholder="Password" />
        </div>
        <Button
          type="submit"
          disabled={isMutating}
          className="font-medium bg-gradient-to-r from-pink-300 to-purple-300"
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
