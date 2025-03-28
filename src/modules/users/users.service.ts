import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: '1', name: 'User 1', email: 'user1@example.com' },
    { id: '2', name: 'User 2', email: 'user2@example.com' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(user => user.id === id);
  }

  create(createUserDto: any) {
    const newUser = {
      id: Date.now().toString(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
}