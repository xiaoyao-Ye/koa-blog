import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class leavingMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  content: string;
}
