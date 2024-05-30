import { WORD_TYPE } from '@infrastructure/xhelper';
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Word extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id = 0;
  @Column('varchar', { name: 'name', nullable: true, unique: true })
  name: string | null = '';
  @Column('varchar', { name: 'katakana_name', length: 255 })
  katakanaName: string | null = '';
  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null = '';
  @Column('tinyint', { name: 'active', nullable: true })
  active: number | null = 1;
  @Column({
    type: 'enum',
    enum: WORD_TYPE,
    name: 'type',
    nullable: true,
    default: WORD_TYPE.NG,
  })
  type: WORD_TYPE;
  @Column('varchar', {
    name: 'created_by',
    nullable: true,
    length: 255,
  })
  createdBy: string | null = '';
  @Column('datetime', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
}
