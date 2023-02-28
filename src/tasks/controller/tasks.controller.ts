import { Controller, Get, Post, NotFoundException, Body, Param, Delete, Put, Patch} from '@nestjs/common';
import { TaskService } from '../tasks.service';
import { Tasks } from '../interface/tasks.interface';

@Controller('task')
export class TasksController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  getTasks(): Tasks[] {
    return this.taskService.getTasks();
  }

  @Get(':uuid')
  getTask(@Param('uuid') uuid: string): Tasks {
    const task = this.taskService.getTask(uuid);
    if (!task) {
      throw new NotFoundException(`Usuario no encontrado ${uuid}`);
    }
    return task;
  }

  @Post()
  createTask(@Body() task: Tasks): Tasks {
    const createdTask = this.taskService.createTask(task);
    return createdTask;
  }


  @Delete(':uuid')
  deleteTask(@Param('uuid') uuid: string): boolean {
    const deletedTask = this.taskService.deleteTask(uuid);
    if (!deletedTask) {
      throw new NotFoundException(`Usuario no encontrado f ${uuid}`);
    }
    return true;
  }
  @Put(':uuid')
  updateTask(@Param('uuid') uuid: string, @Body() task: Tasks): Tasks {
    const updatedTask = this.taskService.updateTask(uuid, task);
    return updatedTask;
  }  

  @Patch(':uuid')
  patchTask(@Param('uuid') uuid: string, @Body() fieldsToUpdate: Partial<Tasks>): Tasks {
    const patchTask = this.taskService.patchTask(uuid, fieldsToUpdate);
    if (!patchTask) {
      throw new NotFoundException(`User no encontrado ${uuid} `);
    }
    return patchTask;
  }

}