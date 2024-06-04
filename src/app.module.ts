import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WalletAddressModule } from './wallet-address/wallet-address.module';
import ormconfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    WalletAddressModule,
  ],
})
export class AppModule { }
