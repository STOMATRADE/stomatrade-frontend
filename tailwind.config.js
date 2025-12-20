module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html,mdx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        /* Primary Colors */
        primary: {
          background: 'var(--primary-background)',
          surface: 'var(--primary-surface)',
          card: 'var(--primary-card)',
          elevated: 'var(--primary-elevated)',
          container: 'var(--primary-container)',
          accent: 'var(--primary-accent)',
        },

        /* Accent Colors */
        accent: {
          green: 'var(--accent-green)',
          'green-light': 'var(--accent-green-light)',
          border: 'var(--accent-border)',
        },

        /* Text Colors */
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          disabled: 'var(--text-disabled)',
          placeholder: 'var(--text-placeholder)',
          dark: 'var(--text-dark)',
          accent: 'var(--text-accent)',
        },

        /* Border Colors */
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          muted: 'var(--border-muted)',
        },

        /* Component Specific Colors */
        button: {
          'primary-bg': 'var(--button-primary-bg)',
          'secondary-bg': 'var(--button-secondary-bg)',
        },
        input: {
          background: 'var(--input-background)',
        },
        link: {
          background: 'var(--link-background)',
        },
        header: {
          background: 'var(--header-background)',
        },
      },

      /* Typography */
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
        '7xl': 'var(--font-size-7xl)',
        '8xl': 'var(--font-size-8xl)',
        '9xl': 'var(--font-size-9xl)',
        '10xl': 'var(--font-size-10xl)',
        '11xl': 'var(--font-size-11xl)',
        micro: 'var(--font-size-micro)',
      },

      fontWeight: {
        light: 'var(--font-weight-light)',
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },

      lineHeight: {
        xs: 'var(--line-height-xs)',
        sm: 'var(--line-height-sm)',
        base: 'var(--line-height-base)',
        md: 'var(--line-height-md)',
        lg: 'var(--line-height-lg)',
        xl: 'var(--line-height-xl)',
        '2xl': 'var(--line-height-2xl)',
        '3xl': 'var(--line-height-3xl)',
        '4xl': 'var(--line-height-4xl)',
        '5xl': 'var(--line-height-5xl)',
        '6xl': 'var(--line-height-6xl)',
        '7xl': 'var(--line-height-7xl)',
        '8xl': 'var(--line-height-8xl)',
        '9xl': 'var(--line-height-9xl)',
        '10xl': 'var(--line-height-10xl)',
        '11xl': 'var(--line-height-11xl)',
        '12xl': 'var(--line-height-12xl)',
        '13xl': 'var(--line-height-13xl)',
      },

      /* Spacing */
      spacing: {
        '1': 'var(--spacing-1)',
        '1.5': 'var(--spacing-1-5)',
        '2': 'var(--spacing-2)',
        '2.5': 'var(--spacing-2-5)',
        '3': 'var(--spacing-3)',
        '3.5': 'var(--spacing-3-5)',
        '4': 'var(--spacing-4)',
        '4.5': 'var(--spacing-4-5)',
        '5.5': 'var(--spacing-5-5)',
        '6': 'var(--spacing-6)',
        '6.5': 'var(--spacing-6-5)',
        '7': 'var(--spacing-7)',
        '7.5': 'var(--spacing-7-5)',
        '8': 'var(--spacing-8)',
        '8.5': 'var(--spacing-8-5)',
        '9': 'var(--spacing-9)',
        '9.5': 'var(--spacing-9-5)',
        '10': 'var(--spacing-10)',
        '11': 'var(--spacing-11)',
        '12': 'var(--spacing-12)',
        '13.5': 'var(--spacing-13-5)',
        '16': 'var(--spacing-16)',
        '18': 'var(--spacing-18)',
        '19.5': 'var(--spacing-19-5)',
        '20': 'var(--spacing-20)',
        '24': 'var(--spacing-24)',
        '25': 'var(--spacing-25)',
        '25.5': 'var(--spacing-25-5)',
        '26.5': 'var(--spacing-26-5)',
        '27.5': 'var(--spacing-27-5)',
        '30': 'var(--spacing-30)',
        '31': 'var(--spacing-31)',
        '33.5': 'var(--spacing-33-5)',
        '42': 'var(--spacing-42)',
        '44': 'var(--spacing-44)',
        '48.5': 'var(--spacing-48-5)',
        '53': 'var(--spacing-53)',
        '60.5': 'var(--spacing-60-5)',
      },

      /* Border Radius */
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        '4xl': 'var(--radius-4xl)',
        '5xl': 'var(--radius-5xl)',
      },

      /* Layout */
      width: {
        xs: 'var(--width-xs)',
        sm: 'var(--width-sm)',
        md: 'var(--width-md)',
        lg: 'var(--width-lg)',
        xl: 'var(--width-xl)',
        container: 'var(--width-container)',
        card: 'var(--width-card)',
        modal: 'var(--width-modal)',
        form: 'var(--width-form)',
      },
    },
  },
  plugins: [],
};
