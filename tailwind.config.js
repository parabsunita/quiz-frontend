/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  darkMode: 'media',  // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'grey-light': '#F5F6F5',
        'custom-theme-green': '#97D700', // Adding the reusable color
        'custom-theme-grey': '#ECECEB', // Adding the reusable color
        'secondary-grey': '#7D8175',
        'brand-green':  '#97D700',
        'brand-green-dark': '#A1E600',
        'error-red': '#C40900',
        'login-grey': '#464C3B',
        'menu-lime':'#F6FFE2',
        'table-text':'#616557',
        'Gray_G20': '#F5F6F5',
        'Gray_G30': '#ECECEB',
        'Gray_70': '#29301C',
        'gray-g70':'#A9ABA3',
        'gray-g100': '#7D8175',
        'grayg500': '#464C3B',
        'grayg900':'#0F1600',
        'grayg300':'#616557',
        'grayg400':'#555A4A',
        'lightred':'#FBE7E6',
        'lightgreen':'#EEFAF3',
        'green-100':'#49BB7D',
        'success-green':"EEFAF3",

      },
      fontFamily: {
      body:['Roboto']
      },
    },
  },  
  plugins: [],
}

