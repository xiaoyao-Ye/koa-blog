import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isShow: boolean;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: '' })
  desc: string;

  @Column({ default: new Date().toDateString(), select: false })
  createDate: string;

  @Column({ default: new Date().toDateString() })
  date: string;

  @Column({ default: 0 })
  readCount: number;

  @Column({ default: 0 })
  heat: number;

  // @Column({ default: '' })
  // comment: any;
}

// article// id,标题,时间,内容,描述,评论(评论时间,评论名称,评论内容,评论目标,回复目标),点赞,浏览量,

// article新增,修改,删除,列表,详情,
// article comment: comment name&content&date&comment
