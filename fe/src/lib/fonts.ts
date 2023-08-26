import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '300',
  variable: '--poppins',
});

const poppinsMedium = Poppins({
  subsets: ['latin'],
  weight: '500',
  variable: '--poppins-medium',
});

const poppinsSemiBold = Poppins({
  subsets: ['latin'],
  weight: '600',
  variable: '--poppins-semibold',
});

const poppinsBold = Poppins({
  subsets: ['latin'],
  weight: '700',
  variable: '--poppins-bold',
});

export { poppins, poppinsMedium, poppinsSemiBold, poppinsBold };
