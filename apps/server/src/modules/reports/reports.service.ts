import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getSummary(userId: string, startDate?: Date, endDate?: Date) {
    const timeEntries = await this.prisma.timeEntry.findMany({
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
    });

    const totalSeconds = timeEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
    const totalHours = totalSeconds / 3600;

    return {
      totalHours,
      totalEntries: timeEntries.length,
      dateRange: { startDate, endDate },
    };
  }

  async getByProject(userId: string, startDate?: Date, endDate?: Date) {
    const projects = await this.prisma.project.findMany({
      where: { userId },
      include: {
        timeEntries: {
          where: {
            startTime: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
        client: true,
      },
    });

    return projects.map((project) => {
      const totalSeconds = project.timeEntries.reduce((sum, e) => sum + (e.duration || 0), 0);
      const totalHours = totalSeconds / 3600;
      const revenue = project.hourlyRate ? totalHours * Number(project.hourlyRate) : 0;

      return {
        projectId: project.id,
        projectName: project.name,
        clientName: project.client?.name,
        totalHours,
        revenue,
        entriesCount: project.timeEntries.length,
      };
    });
  }

  async getDaily(userId: string, startDate?: Date, endDate?: Date) {
    const timeEntries = await this.prisma.timeEntry.findMany({
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
      orderBy: { startTime: 'asc' },
    });

    // Group by date
    const dailyData = new Map<string, { totalHours: number; entries: number }>();

    timeEntries.forEach((entry) => {
      const date = entry.startTime.toISOString().split('T')[0];
      const hours = (entry.duration || 0) / 3600;

      if (!dailyData.has(date)) {
        dailyData.set(date, { totalHours: 0, entries: 0 });
      }

      const data = dailyData.get(date)!;
      data.totalHours += hours;
      data.entries += 1;
    });

    return Array.from(dailyData.entries()).map(([date, data]) => ({
      date,
      totalHours: data.totalHours,
      entries: data.entries,
    }));
  }
}
