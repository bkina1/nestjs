import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from '../../types/usersType';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(200)
  findAll(): User[] {
    return this.usersService.findAll();
  }
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number): User {
    return this.usersService.findOne(id);
  }

  @Get()
  @HttpCode(200)
  findAllWithQuery(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): string {
    return `Page: ${page}, Limit: ${limit}`;
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUser: CreateUserDto): User {
    return this.usersService.create(createUser);
  }
  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ): User {
    return this.usersService.update(id, updateUser);
  }
  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id', ParseIntPipe) id: number): string {
    return this.usersService.delete(id);
  }
}
