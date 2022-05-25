const color = {
  white: '#ffffff',
  back: '#000000',
  transparent: 'transparent',
  current: 'currentColor',
  textPrimary: '#242424'
};

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    color,
    extend: {
      color: {
        textPrimary: '#242424'
      },
      height: {
        main: 'calc(100vh - 64px)',
        3.25: '0.8125rem'
      },
      width: {
        3.25: '0.8125rem',
        filter: '248px'
      },
      boxShadow: {
        header: '0 2px 7px 0 rgb(0 0 0 / 5%);',
        navigation: '2px 0 4px 0 rgba(121, 130, 145, 0.2)',
        tooltip:
          '0 0 4px 1px rgba(14, 30, 37, 0.06), 0 8px 16px 0 rgba(14, 30, 37, 0.2)',
        'toast-hover':
          '0 4px 16px 0 rgba(0, 0, 0, 0.2), 0 16px 64px 0 rgba(0, 0, 0, 0.15)',
        toast:
          '0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 4px 16px 0 rgba(0, 0, 0, 0.05);',
        field: 'inset 0 -1px 0 0 #D3D6DF'
      },
      backgroundColor: {
        primary: 'rgb(26, 148, 255)',
        main: '#f5f5fa',
        bluePrimary: '#1a94ff'
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        19: '19 19 0%',
        '1/2': '1 0 50%',
        full: '1 0 100%',
        '1/5': '0 0 calc((100% - 4 * 0.5rem) / 5)',
        '1/4': '0 0 calc((100% - 3 * 0.5rem) / 4)'
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
      },
      borderColor: {
        primary: 'rgb(26, 148, 255)'
      },
      margin: {
        4.5: '0.875rem'
      },
      lineHeight: {
        3.5: '0.875rem'
      },
      borderWidth: {
        px: '1px'
      },
      padding: {
        0.5: '0.125rem',
        '': '0.75rem'
      },
      fontSize: {
        16: '16px',
        13: '13px',
        11: '11px'
      },
      keyframes: {
        countdown: {
          '0%': {
            transform: 'scaleX(1)'
          },
          '100%': {
            transform: 'scaleX(0)'
          }
        },
        expandOutLeft: {
          '0%': {
            transform: 'translateX(300px)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        fadeInDown: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-100px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        expandOutLeft: 'expandOutLeft .3s',
        fadeInDown: 'fadeInDown .45s'
      }
    }
  },
  variants: {
    extend: {
      display: ['responsive', 'group-hover', 'group-focus'],
      color: ['group-hover'],
      backgroundColor: ['group-hover'],
      borderRadius: ['first', 'last']
    }
  }
};
