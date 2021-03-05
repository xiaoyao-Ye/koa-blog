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

  @Column({ default: '' })
  avatar: string;
}

// user// id, 账号,密码,邮箱,  头像,说明,
// article// id,标题,时间,内容,描述,评论(评论时间,评论名称,评论内容,评论目标,回复目标),点赞,浏览量,


// 用户: 注册(add),登录,list, details,edit PWD(修改pic,**签名等),
// article新增,修改,删除,列表,详情,
//
