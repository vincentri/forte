/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        medium: 'var(--poppins-medium)',
        semibold: 'var(--poppins-semibold)',
        bold: 'var(--poppins-bold)',
      },
      colors: {
        gray: {
          50: '#F0F1F3',
          100: '#E0E2E7',
          200: '#C2C6CE',
          300: '#A3A9B6',
          400: '#858D9D',
          500: '#667085',
          600: '#4D5464',
          700: '#333843',
          800: '#1A1C21',
          900: '#0A0B0D',
        },
        lavender: {
          50: '#F6F2FE',
          100: '#ECE4FB',
          200: '#D8C9F8',
          300: '#C5ADF4',
          400: '#B192F1',
          500: '#9E77ED',
          600: '#7759B2',
          700: '#4F3C77',
          800: '#281E3B',
          900: '#100C18',
        },
        red: {
          50: '#FEEDEC',
          100: '#FCDAD7',
          200: '#F9B4AF',
          300: '#F68F88',
          400: '#F36960',
          500: '#F04438',
          600: '#B4332A',
          700: '#78221C',
          800: '#3C110E',
          900: '#180706',
        },
        yellow: {
          50: '#FFF4E7',
          100: '#FDE9CE',
          200: '#FCD39D',
          300: '#FABC6B',
          400: '#F9A63A',
          500: '#F79009',
          600: '#B96C07',
          700: '#7C4805',
          800: '#3E2402',
          900: '#190E01',
        },
        green: {
          50: '#E8F8F1',
          100: '#D0F1E1',
          200: '#A0E2C3',
          300: '#71D4A6',
          400: '#41C588',
          500: '#12B76A',
          600: '#0E8950',
          700: '#095C35',
          800: '#052E1B',
          900: '#02120B',
        },
        'blue-tosca': {
          50: '#E7F7FE',
          100: '#CEEDFB',
          200: '#9CDBF7',
          300: '#6BCAF3',
          400: '#39B8EF',
          500: '#08A6EB',
          600: '#067DB0',
          700: '#045376',
          800: '#022A3B',
          900: '#011118',
        },
        'blue-tosca': {
          50: '#E7F7FE',
          100: '#CEEDFB',
          200: '#9CDBF7',
          300: '#6BCAF3',
          400: '#39B8EF',
          500: '#08A6EB',
          600: '#067DB0',
          700: '#045376',
          800: '#022A3B',
          900: '#011118',
        },
        blue: {
          50: '#EBF4FF',
          100: '#D5E9FE',
          200: '#ABD2FE',
          300: '#82BCFD',
          400: '#58A5FD',
          500: '#2E8FFC',
          600: '#236BBD',
          700: '#17487E',
          800: '#0C243F',
          900: '#050E19',
        },
        'blue-purple': {
          50: '#EEEFF7',
          100: '#DCDEED',
          200: '#B8BDDB',
          300: '#959DCA',
          400: '#717CB8',
          500: '#4E5BA6',
          600: '#3B447D',
          700: '#272E53',
          800: '#14172A',
          900: '#080911',
        },
        indigo: {
          50: '#F0F1FE',
          100: '#DFE3FD',
          200: '#C0C7FB',
          300: '#A0AAF8',
          400: '#818EF6',
          500: '#6172F4',
          600: '#4956B7',
          700: '#31397A',
          800: '#181D3D',
          900: '#0A0B18',
        },
        purple: {
          50: '#F2EFFF',
          100: '#E4DEFD',
          200: '#CABDFC',
          300: '#AF9CFA',
          400: '#957BF9',
          500: '#7A5AF7',
          600: '#5C44B9',
          700: '#5F498D',
          800: '#3D2D7C',
          900: '#1F173E',
        },
        pink: {
          50: '#FEEDF9',
          100: '#FCDAF2',
          200: '#F8B5E5',
          300: '#F590D7',
          400: '#F16BCA',
          500: '#EE46BD',
          600: '#B3358E',
          700: '#77235F',
          800: '#3C122F',
          900: '#180713',
        },
        'pink-nude': {
          50: '#FFECF0',
          100: '#FDD8E1',
          200: '#FBB1C2',
          300: '#FA8BA4',
          400: '#F86485',
          500: '#F63D67',
          600: '#B92E4D',
          700: '#7B1F34',
          800: '#3E0F1A',
          900: '#19060A',
        },
        'red-nude': {
          50: '#F8E9EA',
          100: '#EFD2D3',
          200: '#DFA5A7',
          300: '#D0797C',
          400: '#C04C50',
          500: '#B01F24',
          600: '#84171B',
          700: '#581012',
          800: '#2C0809',
          900: '#120304',
        },
        orange: {
          50: '#FFF0E8',
          100: '#FEE0D0',
          200: '#FEC1A1',
          300: '#FDA372',
          400: '#FD8443',
          500: '#FC6514',
          600: '#BD4C0F',
          700: '#7E330A',
          800: '#3F1905',
          900: '#190A02',
        },
      },
    },
  },
  plugins: [],
};