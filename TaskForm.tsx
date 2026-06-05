import React, { useState } from 'react';
import { useTaskStore } from '../context/TaskContext';
import { TaskPriority } from '../types';

export const TaskForm: React.FC = () => {
  const { addItem } = useTaskStore();
  const [payload, setPayload] = useState({
    title: '',
    content: '',
    priority: 'medium' as TaskPriority
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payload.title.trim()) return;
    
    addItem(payload);
    setPayload({ title: '', content: '', priority: 'medium' });
  };

  return (
    <form onSubmit={handleSend} className="task-form">
      <div className="field">
        <input
          type="text"
          placeholder="O que precisa ser feito?"
          value={payload.title}
          onChange={e => setPayload({ ...payload, title: e.target.value })}
          autoFocus
        />
      </div>
      <div className="field">
        <textarea
          placeholder="Notas adicionais..."
          value={payload.content}
          onChange={e => setPayload({ ...payload, content: e.target.value })}
        />
      </div>
      <div className="actions-row">
        <select 
          value={payload.priority} 
          onChange={e => setPayload({ ...payload, priority: e.target.value as TaskPriority })}
        >
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
        <button type="submit" className="primary-btn">Criar Task</button>
      </div>
    </form>
  );
};
