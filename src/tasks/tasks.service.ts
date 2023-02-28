import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks } from './interface/tasks.interface';

@Injectable()
export class TaskService {
  private tasks: Tasks[] = [
    {
      id: '1',
      usuariouuid:'2',
      tarea: 'Mantenimiento',
    },
    {
      id: '2',
      usuariouuid:'1',
      tarea: 'Reparacion',
    },
    {
      id: '3',
      usuariouuid:'3',
      tarea: 'Call center',
    },
  ];

  getTasks(): Tasks[] {
    return this.tasks;
  }

  getTask(uuid: string): Tasks {
    const tasks = this.tasks.find(task => task.id === uuid);
    if (!tasks) {
      throw new NotFoundException(`Error f ${uuid}`);
    }
    return tasks;
  }

  createTask(task: Tasks): Tasks {
    const newTaskId = Math.random().toString(36).slice(-2);
    const newTask: Tasks = { ...task, id: newTaskId };
    this.tasks.push(newTask);
    return newTask;
  }
  
  deleteTask(uuid: string): boolean {
    const taskIndex = this.tasks.findIndex(task => task.id === uuid);
    if (taskIndex < 0) {
      return false;
    }
    this.tasks.splice(taskIndex, 1);
    return true;
  }
  updateTask(uuid: string, task: Tasks): Tasks {
    const existingTask = this.getTask(uuid);
    const updatedTask = {
      ...existingTask,
      ...task,
      id: existingTask.id
    };
    this.tasks.splice(this.tasks.indexOf(existingTask), 1, updatedTask);
    return updatedTask;
  }

  patchTask(uuid: string, fieldsToUpdate: Partial<Tasks>): Tasks {
    const existingTask = this.tasks.find(task => task.id === uuid);
    if (existingTask) {
      const updatedTask = { ...existingTask, ...fieldsToUpdate };
      this.tasks = this.tasks.map(task => (task.id === uuid ? updatedTask : task));
      return updatedTask;
    }
    throw new NotFoundException(`Tarea no encontrada ${uuid}`);
  }
  

}
