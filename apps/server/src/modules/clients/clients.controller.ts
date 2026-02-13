import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { CreateClientDto, createClientSchema } from './dto/create-client.dto';
import { UpdateClientDto, updateClientSchema } from './dto/update-client.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';

@ApiTags('clients')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  findAll(@CurrentUser() user: any) {
    return this.clientsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get client by ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.clientsService.findOne(id, user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create client' })
  create(
    @CurrentUser() user: any,
    @Body(new ZodValidationPipe(createClientSchema)) dto: CreateClientDto
  ) {
    return this.clientsService.create(user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update client' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body(new ZodValidationPipe(updateClientSchema)) dto: UpdateClientDto
  ) {
    return this.clientsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete client (soft delete)' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.clientsService.remove(id, user.id);
  }
}
