import { BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class GenericEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id = 0;
    @Column('tinyint', { name: 'active', nullable: true, default: 1 })
    active: number | null = 1;
    @Column('varchar', { name: 'created_by', nullable: true, length: 255 })
    createdBy: string | null = '';
    @Column('datetime', {
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;
}