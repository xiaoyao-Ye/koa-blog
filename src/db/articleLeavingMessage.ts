import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class articleLeavingMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  articleId: string;

  @Column()
  content: string;

  @Column()
  leavingMsgDate: string;
}
