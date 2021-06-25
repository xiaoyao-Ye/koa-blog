import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class leavingMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  userName: string;

  @Column()
  content: string;

  @Column()
  createdTime: string;
}
