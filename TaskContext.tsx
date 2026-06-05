import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { ITask, TaskState, TaskFormData } from '../types';

const TaskContext = createContext<TaskState | null>(null);

const STORAGE_KEY = '@app_tasks_v1';

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ITask[]>([]);
  const [filter, setFilter] = useState<TaskState['filter']>('all');

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to parse tasks', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((data: TaskFormData) => {
    const entry: ITask = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
      isDone: false,
      createdAt: Date.now(),
    };
    setItems(prev => [entry, ...prev]);
  }, []);

  const toggleStatus = useCallback((id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isDone: !item.isDone } : item
    ));
  }, []);

  const removeItem = useCallback((id: string) => {
    if (window.confirm('Deseja realmente remover esta tarefa?')) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  }, []);

  const value = useMemo(() => ({
    items,
    filter,
    addItem,
    toggleStatus,
    removeItem,
    applyFilter: (val: any) => setFilter(val)
  }), [items, filter, addItem, toggleStatus, removeItem]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskStore = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('TaskProvider missing');
  return ctx;
};
