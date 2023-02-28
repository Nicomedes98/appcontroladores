import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { User } from './interface/users.interface';


@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      Nombre: 'John',
      Apellido: 'Rambo',
      email: 'jrambo@gmail.com',
    },
    {
      id: '2',
      Nombre: 'Ana',
      Apellido: 'Rodriguez',
      email: 'anarod@hotmail.com',
    },
    {
      id: '3',
      Nombre: 'Bart',
      Apellido: 'Gonzales',
      email: 'gonazabart@gmail.com',
    },
  ];


  getUsers(): User[] {
    return this.users;
  }


  getUser(uuid: string): User {
    const user = this.users.find(user => user.id === uuid);
    if (!user) {
      throw new NotFoundException(`User with uuid ${uuid} not found`);
    }
    return user;
  }


  createUser(user: User): User {
    const newUserId = Math.random().toString(36).slice(-2);
    const newUser: User = { ...user, id: newUserId };
    this.users.push(newUser);
    return newUser;
  }
  
 
  deleteUser(uuid: string): boolean {
    const userIndex = this.users.findIndex(user => user.id === uuid);
    if (userIndex < 0) {
      return false;
    }
    this.users.splice(userIndex, 1);
    return true;
  }
  
  updateUser(uuid: string, user: User): User {
    const existingUser = this.getUser(uuid);
    const updatedUser = {
      ...existingUser,
      ...user,
      id: existingUser.id
    };
    this.users.splice(this.users.indexOf(existingUser), 1, updatedUser);
    return updatedUser;
  }
  
  patchUser(uuid: string, fieldsToUpdate: Partial<User>): User {
    const existingUser = this.users.find(user => user.id === uuid);
    if (existingUser) {
      const updatedUser = { ...existingUser, ...fieldsToUpdate };
      this.users = this.users.map(user => (user.id === uuid ? updatedUser : user));
      return updatedUser;
    }
    throw new NotFoundException(`Usuario no encontrado ${uuid}`);
  }
  
}



