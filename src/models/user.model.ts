// user.model.ts
import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;
  @property({
    type: 'string', // Define the type as buffer for binary data
    required: true,
  })
  file: string;
  // photo: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // Define relationships if needed
}

export type UserWithRelations = User & UserRelations;
