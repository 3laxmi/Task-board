import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth.jsx';

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should login with valid credentials', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      const success = result.current.login('intern@demo.com', 'intern123', false);
      expect(success).toBe(true);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user?.email).toBe('intern@demo.com');
    });
  });

  test('should reject invalid credentials', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      const success = result.current.login('wrong@email.com', 'wrongpass', false);
      expect(success).toBe(false);
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  test('should logout user', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.login('intern@demo.com', 'intern123', false);
    });

    act(() => {
      result.current.logout();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBe(null);
    });
  });
});