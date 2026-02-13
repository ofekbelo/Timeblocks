import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { userId, isArchived: false },
      include: {
        client: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
        timeEntries: {
          take: 10,
          orderBy: { startTime: 'desc' },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return project;
  }

  async create(userId: string, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        clientId: dto.clientId,
        hourlyRate: dto.hourlyRate,
        estimatedBudget: dto.estimatedBudget,
        color: dto.color,
        status: dto.status,
        userId,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
      include: {
        client: true,
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateProjectDto) {
    await this.findOne(id, userId);

    return this.prisma.project.update({
      where: { id },
      data: {
        ...dto,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
      include: {
        client: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.project.update({
      where: { id },
      data: { isArchived: true },
    });
  }

  async getStats(id: string, userId: string) {
    const project = await this.findOne(id, userId);

    // Calculate total hours and revenue
    const timeEntries = await this.prisma.timeEntry.findMany({
      where: { projectId: id },
    });

    const totalSeconds = timeEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
    const totalHours = totalSeconds / 3600;
    const totalRevenue = project.hourlyRate ? totalHours * Number(project.hourlyRate) : 0;

    return {
      project,
      stats: {
        totalHours,
        totalRevenue,
        totalEntries: timeEntries.length,
      },
    };
  }
}
