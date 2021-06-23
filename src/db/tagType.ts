import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tagType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagName: string;
}
