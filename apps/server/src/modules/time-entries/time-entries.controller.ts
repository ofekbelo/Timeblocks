import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TimeEntriesService } from './time-entries.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { CreateTimeEntryDto, createTimeEntrySchema } from './dto/create-time-entry.dto';
import { UpdateTimeEntryDto, updateTimeEntrySchema } from './dto/update-time-entry.dto';
import { StartTimerDto, startTimerSchema } from './dto/start-timer.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';

@ApiTags('time-entries')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('time-entries')
export class TimeEntriesController {
  constructor(private timeEntriesService: TimeEntriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all time entries' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  findAll(
    @CurrentUser() user: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.timeEntriesService.findAll(
      user.id,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );
  }

  @Get('active-timer')
  @ApiOperation({ summary: 'Get active timer' })
  getActiveTimer(@CurrentUser() user: any) {
    return this.timeEntriesService.getActiveTimer(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get time entry by ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.timeEntriesService.findOne(id, user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create time entry' })
  create(
    @CurrentUser() user: any,
    @Body(new ZodValidationPipe(createTimeEntrySchema)) dto: CreateTimeEntryDto
  ) {
    return this.timeEntriesService.create(user.id, dto);
  }

  @Post('start-timer')
  @ApiOperation({ summary: 'Start timer' })
  startTimer(
    @CurrentUser() user: any,
    @Body(new ZodValidationPipe(startTimerSchema)) dto: StartTimerDto
  ) {
    return this.timeEntriesService.startTimer(user.id, dto);
  }

  @Post('stop-timer')
  @ApiOperation({ summary: 'Stop timer' })
  stopTimer(@CurrentUser() user: any) {
    return this.timeEntriesService.stopTimer(user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update time entry' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body(new ZodValidationPipe(updateTimeEntrySchema)) dto: UpdateTimeEntryDto
  ) {
    return this.timeEntriesService.update(id, user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete time entry' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.timeEntriesService.remove(id, user.id);
  }
}
