module.exports = {
  prefix: 'twcss-',
  content: [
    './layout/*.liquid',
    './templates/*.liquid',
    './templates/customers/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '750px',
      lg: '990px',
      xlg: '1440px',
      x2lg: '1920px',
      pageMaxWidth: '1440px',
    },
    extend: {
      fontFamily: {
        heading: 'var(--font-heading-family)',
        noto: ['"Noto Sans"', 'sans-serif'],
        inco: ['Inconsolata, monospace'],
      },
    },
    color: {
      black: '#000000',
    },
    fontSize: {
      subline: ['20px', '20px'],
      heading: ['60px', '62px'],
      text: ['16px', '16px'],
      button: ['14px', '14px'],
      title: ['20px', '20px'],
    },
  },
  plugins: [],
};
