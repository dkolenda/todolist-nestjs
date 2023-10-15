import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250, nullable: false })
  content: string;

  @Column({ nullable: false })
  done: boolean;
}
