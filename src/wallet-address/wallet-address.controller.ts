import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';

@Controller('wallet-address')
export class WalletAddressController {
    constructor(private readonly walletAddressService: WalletAddressService) { }

    @Get()
    findAll() {
        return this.walletAddressService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.walletAddressService.findOne(+id);
    }

    @Post()
    create(@Body() createWalletAddressDto: CreateWalletAddressDto) {
        return this.walletAddressService.create(createWalletAddressDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateWalletAddressDto: CreateWalletAddressDto) {
        return this.walletAddressService.update(+id, updateWalletAddressDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.walletAddressService.remove(+id);
    }
}
