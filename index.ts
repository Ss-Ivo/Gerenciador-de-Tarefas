export type TaskPriority = 'low' | 'medium' | 'high';

export interface ITask {
  id: string;
  title: string;
  content?: string;
  isDone: boolean;
  priority: TaskPriority;
  createdAt: number;
}

export interface TaskState {
  items: ITask[];
  filter: 'all' | 'pending' | 'completed';
  addItem: (data: TaskFormData) => void;
  toggleStatus: (id: string) => void;
  removeItem: (id: string) => void;
  applyFilter: (val: string) => void;
}

export type TaskFormData = Pick<ITask, 'title' | 'content' | 'priority'>;
