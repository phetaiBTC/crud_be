import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    method: string;
    @Column()
    url: string;
    @Column()
    body: string;
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date
}
