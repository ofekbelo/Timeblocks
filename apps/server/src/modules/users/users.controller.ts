import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { UpdateUserDto, updateUserSchema } from './dto/update-user.dto';
import { UpdatePasswordDto, updatePasswordSchema } from './dto/update-password.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getMe(@CurrentUser() user: any) {
    return this.usersService.getMe(user.id);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  updateMe(
    @CurrentUser() user: any,
    @Body(new ZodValidationPipe(updateUserSchema)) dto: UpdateUserDto
  ) {
    return this.usersService.updateMe(user.id, dto);
  }

  @Patch('me/password')
  @ApiOperation({ summary: 'Update password' })
  updatePassword(
    @CurrentUser() user: any,
    @Body(new ZodValidationPipe(updatePasswordSchema)) dto: UpdatePasswordDto
  ) {
    return this.usersService.updatePassword(user.id, dto);
  }
}
