module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        main: 'calc(100vh - 64px)'
      },
      boxShadow: {
        header: '0 2px 7px 0 rgb(0 0 0 / 5%);'
      },
      backgroundColor: {
        primary: 'rgb(26, 148, 255)'
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        19: '19 19 0%',
        '1/2': '1 0 50%',
        full: '1 0 100%',
        '1/5': '0 0 20%',
        '1/4': '0 0 25%'
      },
      maxWidth: {
        'name-user': '10rem',
        fit: 'fit-content'
      },
      minWidth: {
        'search-button': '2rem',
        badge: '1.25rem'
      },
      minHeight: {
        72: '18rem'
      }
    }
    // customForms: theme => ({
    //   default: {
    //     input: {
    //       '&:focus': {
    //         boxShadow: undefined,
    //         borderColor: undefined,
    //       },
    //     },
    //   }
    // })
  },
  variants: {
    extend: {
      display: ['responsive', 'group-hover', 'group-focus'],
      borderRadius: ['first', 'last']
    }
  },
  plugins: [require('@tailwindcss/custom-forms')]
};
