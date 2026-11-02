export const tokens = {
  colors: {
    brand: {
      50: 'var(--ds-color-brand-50)',
      100: 'var(--ds-color-brand-100)',
      500: 'var(--ds-color-brand-500)',
      600: 'var(--ds-color-brand-600)',
      700: 'var(--ds-color-brand-700)'
    },
    primary: 'var(--ds-color-primary)',
    primaryHover: 'var(--ds-color-primary-hover)',
    primaryActive: 'var(--ds-color-primary-active)',
    primaryLight: 'var(--ds-color-primary-light)',
    danger: 'var(--ds-color-danger)',
    warning: 'var(--ds-color-warning)',
    success: 'var(--ds-color-success)',
    bg: {
      primary: 'var(--ds-color-bg-primary)',
      card: 'var(--ds-color-bg-card)',
      subtle: 'var(--ds-color-bg-subtle)',
      muted: 'var(--ds-color-bg-muted)'
    },
    text: {
      primary: 'var(--ds-color-text-primary)',
      secondary: 'var(--ds-color-text-secondary)',
      muted: 'var(--ds-color-text-muted)',
      inverse: 'var(--ds-color-text-inverse)'
    },
    border: {
      default: 'var(--ds-color-border-default)',
      subtle: 'var(--ds-color-border-subtle)',
      focus: 'var(--ds-color-border-focus)'
    },
    magnitude: {
      weak: 'var(--ds-color-mag-weak)',
      light: 'var(--ds-color-mag-light)',
      moderate: 'var(--ds-color-mag-moderate)',
      strong: 'var(--ds-color-mag-strong)'
    }
  },
  typography: {
    fontSans: 'var(--ds-font-family-sans)',
    fontMono: 'var(--ds-font-family-mono)',
    sizes: {
      xs: 'var(--ds-font-size-xs)',
      sm: 'var(--ds-font-size-sm)',
      md: 'var(--ds-font-size-md)',
      lg: 'var(--ds-font-size-lg)',
      xl: 'var(--ds-font-size-xl)',
      '2xl': 'var(--ds-font-size-2xl)',
      '3xl': 'var(--ds-font-size-3xl)'
    },
    weights: {
      regular: 'var(--ds-font-weight-regular)',
      medium: 'var(--ds-font-weight-medium)',
      semibold: 'var(--ds-font-weight-semibold)',
      bold: 'var(--ds-font-weight-bold)'
    }
  },
  spacing: {
    1: 'var(--ds-space-1)',
    2: 'var(--ds-space-2)',
    3: 'var(--ds-space-3)',
    4: 'var(--ds-space-4)',
    5: 'var(--ds-space-5)',
    6: 'var(--ds-space-6)',
    8: 'var(--ds-space-8)',
    10: 'var(--ds-space-10)'
  },
  radii: {
    sm: 'var(--ds-radius-sm)',
    md: 'var(--ds-radius-md)',
    lg: 'var(--ds-radius-lg)',
    xl: 'var(--ds-radius-xl)',
    full: 'var(--ds-radius-full)'
  },
  shadows: {
    sm: 'var(--ds-shadow-sm)',
    md: 'var(--ds-shadow-md)',
    lg: 'var(--ds-shadow-lg)'
  },
  transitions: {
    fast: 'var(--ds-transition-fast)',
    normal: 'var(--ds-transition-normal)'
  }
};

export const MAGNITUDE_BRACKET_COLORS = {
  weak: '#0969da',
  light: '#d97706',
  moderate: '#c2410c',
  strong: '#cf222e'
};

export default tokens;
