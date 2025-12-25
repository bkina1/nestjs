import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
  Query,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UserAppService } from './user-app.service';
import { Prisma } from '@prisma/client';

@Controller('user-app')
export class UserAppController {
  constructor(private readonly userAppService: UserAppService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUser: Prisma.UserCreateInput) {
    const user = this.userAppService.create(createUser);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!user) {
      throw new BadRequestException('User not created');
    }
    return user;
  }

  @Get()
  @HttpCode(200)
  findAll(@Query('role') role?: string) {
    const users = this.userAppService.findAll(role);
    if (!users) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const user = this.userAppService.findOne(id);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: Prisma.UserUpdateInput,
  ) {
    const user = this.userAppService.update(id, updateUser);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!user) {
      throw new BadRequestException('User not updated');
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id', ParseIntPipe) id: number) {
    const user = this.userAppService.remove(id);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
