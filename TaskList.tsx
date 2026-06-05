import React from 'react';
import { useTaskStore } from '../context/TaskContext';

export const TaskList: React.FC = () => {
  const { items, toggleStatus, removeItem, filter } = useTaskStore();

  const filtered = items.filter(it => {
    if (filter === 'completed') return it.isDone;
    if (filter === 'pending') return !it.isDone;
    return true;
  });

  if (!filtered.length) {
    return <div className="empty-state">Nenhum registro encontrado.</div>;
  }

  return (
    <div className="list-container">
      {filtered.map(it => (
        <div key={it.id} className={`card ${it.priority} ${it.isDone ? 'done' : ''}`}>
          <div className="card-body">
            <h4>{it.title}</h4>
            {it.content && <p>{it.content}</p>}
            <small>{new Date(it.createdAt).toLocaleDateString()}</small>
          </div>
          <div className="card-ctrl">
            <button onClick={() => toggleStatus(it.id)}>
              {it.isDone ? 'Refazer' : 'OK'}
            </button>
            <button onClick={() => removeItem(it.id)} className="danger">Remover</button>
          </div>
        </div>
      ))}
    </div>
  );
};
