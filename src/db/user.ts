import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: new Date(2000, 0, 1).toString() })
  birthday: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: new Date().toString() })
  createDateTime: string;
}

