import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { WalletAddress } from '../wallet-address/wallet-address.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    username: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(type => WalletAddress, walletAddress => walletAddress.user)
    walletAddresses: WalletAddress[];


    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
