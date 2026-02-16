import { storage } from '../utils/storage.js';

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should save and retrieve tasks', () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        priority: 'medium',
        dueDate: '2024-01-01',
        tags: ['test'],
        createdAt: '2024-01-01T00:00:00.000Z',
        status: 'todo'
      }
    ];

    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockTasks));

    const tasks = storage.getTasks();
    expect(tasks).toEqual(mockTasks);

    storage.saveTasks(mockTasks);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'taskboard_tasks',
      JSON.stringify(mockTasks)
    );
  });

  test('should handle empty storage gracefully', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    const tasks = storage.getTasks();
    expect(tasks).toEqual([]);
  });

  test('should handle corrupted storage data', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid json');

    const tasks = storage.getTasks();
    expect(tasks).toEqual([]);
  });
});