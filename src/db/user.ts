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

  @Column({ default: '1999-9-9 00:00:00' })
  birthday: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  createDateTime: string;
}
