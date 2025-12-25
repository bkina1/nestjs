import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../types/usersType';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe.exemple.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe.exemple.com',
      role: 'admin',
    },
    {
      id: 3,
      name: 'Jim Doe',
      email: 'jim.doe.exemple.com',
      role: 'admin',
    },
    {
      id: 4,
      name: 'Jill Doe',
      email: 'jill.doe.exemple.com',
      role: 'admin',
    },
    {
      id: 5,
      name: 'Jack Doe',
      email: 'jack.doe.exemple.com',
      role: 'admin',
    },
  ];

  findAll(): User[] {
    return this.users;
  }
  findOne(id: number): User {
    const user = this.users.find((user) => user.id == id);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }
  create(createUser: CreateUserDto): User {
    const newId = this.users.length + 1;
    const newUser: User = {
      ...createUser,
      id: newId,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updateUser: UpdateUserDto): User {
    const index = this.users.findIndex((user) => user.id == id);
    if (index === -1) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    this.users[index] = { ...updateUser, id };
    return this.users[index];
  }
  delete(id: number): string {
    this.users = this.users.filter((user) => user.id == id);
    if (this.users.length === 0) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return 'User deleted successfully';
  }
}
