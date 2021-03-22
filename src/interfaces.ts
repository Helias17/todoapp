export interface ITodoItem {
  title: string;
  id: number;
  completed: boolean;
  priority: number;
}

export interface Priority {
  name: string;
  selected: boolean;
}

export interface TaskPriorityType {
  onPriorityChange(id: number): void;
}
