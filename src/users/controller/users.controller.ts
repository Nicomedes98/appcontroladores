import { Controller, Get, Post, NotFoundException, Body, Param, Delete, Put, Patch } from '@nestjs/common';

import { UsersService } from '../users.service';
import { User } from '../interface/users.interface';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  getUsers(): User[] {
    return this.usersService.getUsers();
  }


  @Get(':uuid')
  getUser(@Param('uuid') uuid: string): User {
    const user = this.usersService.getUser(uuid);
    if (!user) {
      throw new NotFoundException(`Usuario no encontrado ${uuid}`);
    }
    return user;
  }


  @Post()
  createUser(@Body() user: User): User {
    const createdUser = this.usersService.createUser(user);
    return createdUser;
  }
 
  @Put(':uuid')
  updateUser(@Param('uuid') uuid: string, @Body() user: User): User {
    const updatedUser = this.usersService.updateUser(uuid, user);
    return updatedUser;
  }  


  @Patch(':uuid')
  patchUser(@Param('uuid') uuid: string, @Body() fieldsToUpdate: Partial<User>): User {
    const updatedUser = this.usersService.patchUser(uuid, fieldsToUpdate);
    if (!updatedUser) {
      throw new NotFoundException(`Usuario no encontrado papu ${uuid}`);
    }
    return updatedUser;
  }
 
  @Delete(':uuid')
deleteUser(@Param('uuid') uuid: string): boolean {
  const deletedUser = this.usersService.deleteUser(uuid);
  if (!deletedUser) {
    throw new NotFoundException(`Usuario no encontrado f  ${uuid}`);
  }
  return true;
}
}

