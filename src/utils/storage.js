const STORAGE_KEYS = {
  TASKS: 'taskboard_tasks',
  ACTIVITY_LOG: 'taskboard_activity',
  USER: 'taskboard_user',
  AUTH: 'taskboard_auth'
};

export const storage = {
  getTasks: () => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : [];
    } catch {
      return [];
    }
  },

  saveTasks: (tasks) => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  getActivityLog: () => {
    try {
      const log = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOG);
      return log ? JSON.parse(log) : [];
    } catch {
      return [];
    }
  },

  saveActivityLog: (log) => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOG, JSON.stringify(log));
  },

  getUser: () => {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  saveUser: (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  isAuthenticated: () => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  },

  setAuthenticated: (auth) => {
    localStorage.setItem(STORAGE_KEYS.AUTH, auth.toString());
  },

  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};