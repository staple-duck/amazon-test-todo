import { Provider } from 'react-redux';
import { store } from '@/store/store';

/**
 * Redux Provider component.
 * Wraps the app to provide Redux store to all components.
 */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

