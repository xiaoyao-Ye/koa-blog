import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  img: string;

  @Column()
  music: string;

  @Column()
  content: string;

  @Column()
  tagType: string;

  @Column({ default: '' })
  abstract: string;

  @Column({ default: new Date().toDateString(), select: false })
  createDate: string;

  @Column({ default: new Date().toDateString() })
  issuedDate: string;

  @Column({ default: 0 })
  readCount: number;

  @Column({ default: 0 })
  heat: number;

  @Column({ default: false })
  isShow: boolean;
}
