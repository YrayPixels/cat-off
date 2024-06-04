import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class WalletAddress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ length: 100, unique: true })
    address: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(type => User, user => user.walletAddresses)
    user: User;
}
