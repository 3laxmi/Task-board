import { useState, useEffect } from 'react';
import { storage } from '../utils/storage.js';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    setTasks(storage.getTasks());
    setActivityLog(storage.getActivityLog());
  }, []);

  const addActivity = (action, taskTitle, details) => {
    const newActivity = {
      id: Date.now().toString(),
      action,
      taskTitle,
      timestamp: new Date().toISOString(),
      details
    };
    
    const updatedLog = [newActivity, ...activityLog].slice(0, 50);
    setActivityLog(updatedLog);
    storage.saveActivityLog(updatedLog);
  };

  const createTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
    addActivity('created', newTask.title);
  };

  const updateTask = (id, updates) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    );
    
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      addActivity('edited', task.title);
    }
  };

  const deleteTask = (id) => {
    const task = tasks.find(t => t.id === id);
    const updatedTasks = tasks.filter(task => task.id !== id);
    
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
    
    if (task) {
      addActivity('deleted', task.title);
    }
  };

  const moveTask = (id, newStatus) => {
    const task = tasks.find(t => t.id === id);
    if (task && task.status !== newStatus) {
      updateTask(id, { status: newStatus });
      addActivity('moved', task.title, `from ${task.status} to ${newStatus}`);
    }
  };

  const resetBoard = () => {
    setTasks([]);
    setActivityLog([]);
    storage.saveTasks([]);
    storage.saveActivityLog([]);
  };

  return {
    tasks,
    activityLog,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    resetBoard
  };
};