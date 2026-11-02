import useAppStore from '../store/useAppStore';

export default function useTheme() {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return {
    theme,
    setTheme,
    toggleTheme
  };
}
