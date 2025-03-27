import { Entity } from '../../core/entities';

export interface UserProps {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Entity<UserProps> {
  get id() {
    return this.props.id;
  }
  set id(value: string) {
    this.props.id = value;
  }
  get name() {
    return this.props.name;
  }
  set name(value: string) {
    this.props.name = value;
  }
  get email() {
    return this.props.email;
  }
  set email(value: string) {
    this.props.email = value;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  set createdAt(value: Date) {
    this.props.createdAt = value;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  set updatedAt(value: Date) {
    this.props.updatedAt = value;
  }

  static create(props: UserProps) {
    if (!props?.email) throw new Error('Unable to create user without email');
    if (!props?.name) throw new Error('Unable to create user without name');
    return new User(props);
  }
}
