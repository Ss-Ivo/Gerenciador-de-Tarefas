import React from 'react';
import { TaskProvider, useTaskStore } from './context/TaskContext';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import './styles/App.css';

const Layout: React.FC = () => {
  const { filter, applyFilter } = useTaskStore();

  return (
    <div className="app-wrapper">
      <header>
        <h1>MyTasks</h1>
      </header>

      <TaskForm />
      
      <div className="filters-bar">
        {['all', 'pending', 'completed'].map(f => (
          <button 
            key={f}
            className={`filter-chip ${filter === f ? 'active' : ''}`}
            onClick={() => applyFilter(f)}
          >
            {f === 'all' ? 'Tudo' : f === 'pending' ? 'Pendentes' : 'Feitas'}
          </button>
        ))}
      </div>

      <TaskList />
    </div>
  );
};

export default function App() {
  return (
    <TaskProvider>
      <Layout />
    </TaskProvider>
  );
}
