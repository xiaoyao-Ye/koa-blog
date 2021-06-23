import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class heat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  articleId: string;
}
