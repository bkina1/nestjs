import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const Userapp = (...args: string[]) => SetMetadata('userapp', args);
