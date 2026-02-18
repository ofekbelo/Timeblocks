import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
import { StartTimerDto } from './dto/start-timer.dto';

@Injectable()
export class TimeEntriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, startDate?: Date, endDate?: Date, limit?: number) {
    return this.prisma.timeEntry.findMany({
      where: {
        userId,
        startTime: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        project: {
          include: {
            client: true,
          },
        },
      },
      orderBy: { startTime: 'desc' },
      take: limit,
    });
  }

  async findOne(id: string, userId: string) {
    const timeEntry = await this.prisma.timeEntry.findUnique({
      where: { id },
      include: {
        project: {
          include: {
            client: true,
          },
        },
      },
    });

    if (!timeEntry) {
      throw new NotFoundException('Time entry not found');
    }

    if (timeEntry.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return timeEntry;
  }

  async create(userId: string, dto: CreateTimeEntryDto) {
    // Verify project ownership
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project || project.userId !== userId) {
      throw new ForbiddenException('Project not found or access denied');
    }

    // Calculate duration if both startTime and endTime are provided
    let duration = dto.duration;
    if (dto.startTime && dto.endTime && !duration) {
      const start = new Date(dto.startTime);
      const end = new Date(dto.endTime);
      duration = Math.floor((end.getTime() - start.getTime()) / 1000);
    }

    return this.prisma.timeEntry.create({
      data: {
        projectId: dto.projectId,
        description: dto.description,
        isManual: dto.isManual,
        tags: dto.tags,
        userId,
        startTime: new Date(dto.startTime),
        endTime: dto.endTime ? new Date(dto.endTime) : undefined,
        duration,
      },
      include: {
        project: {
          include: {
            client: true,
          },
        },
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateTimeEntryDto) {
    await this.findOne(id, userId);

    // Recalculate duration if startTime or endTime is updated
    let duration = dto.duration;
    if (dto.startTime && dto.endTime && !duration) {
      const start = new Date(dto.startTime);
      const end = new Date(dto.endTime);
      duration = Math.floor((end.getTime() - start.getTime()) / 1000);
    }

    return this.prisma.timeEntry.update({
      where: { id },
      data: {
        ...dto,
        startTime: dto.startTime ? new Date(dto.startTime) : undefined,
        endTime: dto.endTime ? new Date(dto.endTime) : undefined,
        duration,
      },
      include: {
        project: {
          include: {
            client: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.timeEntry.delete({
      where: { id },
    });
  }

  async startTimer(userId: string, dto: StartTimerDto) {
    // Check if there's already an active timer
    const activeTimer = await this.prisma.timeEntry.findFirst({
      where: {
        userId,
        endTime: null,
      },
    });

    if (activeTimer) {
      throw new BadRequestException(
        'There is already an active timer. Stop it before starting a new one.'
      );
    }

    // Verify project ownership
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project || project.userId !== userId) {
      throw new ForbiddenException('Project not found or access denied');
    }

    return this.prisma.timeEntry.create({
      data: {
        userId,
        projectId: dto.projectId,
        description: dto.description,
        startTime: new Date(),
      },
      include: {
        project: {
          include: {
            client: true,
          },
        },
      },
    });
  }

  async stopTimer(userId: string) {
    const activeTimer = await this.prisma.timeEntry.findFirst({
      where: {
        userId,
        endTime: null,
      },
    });

    if (!activeTimer) {
      throw new NotFoundException('No active timer found');
    }

    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - activeTimer.startTime.getTime()) / 1000);

    return this.prisma.timeEntry.update({
      where: { id: activeTimer.id },
      data: {
        endTime,
        duration,
      },
      include: {
        project: {
          include: {
            client: true,
          },
        },
      },
    });
  }

  async getActiveTimer(userId: string) {
    const activeTimer = await this.prisma.timeEntry.findFirst({
      where: {
        userId,
        endTime: null,
      },
      include: {
        project: {
          include: {
            client: true,
          },
        },
      },
    });

    if (!activeTimer) {
      return null;
    }

    return activeTimer;
  }
}
