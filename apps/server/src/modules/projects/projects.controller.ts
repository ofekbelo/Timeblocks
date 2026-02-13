import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { CreateProjectDto, createProjectSchema } from './dto/create-project.dto';
import { UpdateProjectDto, updateProjectSchema } from './dto/update-project.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';

@ApiTags('projects')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  findAll(@CurrentUser() user: any) {
    return this.projectsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.projectsService.findOne(id, user.id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get project statistics' })
  getStats(@Param('id') id: string, @CurrentUser() user: any) {
    return this.projectsService.getStats(id, user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create project' })
  create(
    @CurrentUser() user: any,
    @Body(new ZodValidationPipe(createProjectSchema)) dto: CreateProjectDto
  ) {
    return this.projectsService.create(user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body(new ZodValidationPipe(updateProjectSchema)) dto: UpdateProjectDto
  ) {
    return this.projectsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project (soft delete)' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.projectsService.remove(id, user.id);
  }
}
