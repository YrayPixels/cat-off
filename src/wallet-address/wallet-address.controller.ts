import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';

@Controller('wallet-address')
export class WalletAddressController {
    constructor(private readonly walletAddressService: WalletAddressService) { }

    @Get()
    async findAll() {
        try {
            let data = await this.walletAddressService.findAll();
            return {
                message: 'Request successful',
                status: "success",
                data: data
            }
        } catch (e) {
            throw new NotFoundException()
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            let wallet = await this.walletAddressService.findOne(+id);
            return {
                message: 'Wallet details fetched successfully',
                status: "success",
                data: wallet
            }
        } catch (e) {
            throw new NotFoundException()
        }
    }

    @Post()
    async create(@Body() createWalletAddressDto: CreateWalletAddressDto) {
        try {
            let created_wallet = await this.walletAddressService.create(createWalletAddressDto);
            return {
                message: 'Wallet created successfully',
                status: "success",
                data: created_wallet
            }

        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateWalletAddressDto: CreateWalletAddressDto) {

        try {
            let wallet = await this.walletAddressService.update(+id, updateWalletAddressDto);

            return {
                message: 'Wallet Updated successfully',
                status: "success",
                data: wallet
            }

        } catch (e) {
            throw new InternalServerErrorException("Error updating wallet", e.message)
        }

    }

    @Delete(':id')
    async remove(@Param('id') id: string) {

        try {
            await this.walletAddressService.remove(+id);

            return {
                message: 'Wallet deletedsuccessfully',
                status: "success",
            }
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }
}
