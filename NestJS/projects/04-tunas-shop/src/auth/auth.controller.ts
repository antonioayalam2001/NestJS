import { Body, Controller, Delete, Get, Param, Patch, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetRawHeaders } from './decorators/get-raw-headers';
import { GetUser } from './decorators/get-user-decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';
import { UserRoleGuard } from './decorators/user-role-guard';
import { RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Get()
  findAll(
    @Req() req: Express.Request
  ) {
    console.log(req.user);
    return this.authService.findAll();
  }

  @Post('/login')
  findOne(@Body() body: LoginUserDto) {
    return this.authService.findUser(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return {
      message: `This action updates a #${id} user`,
      data: { ...UpdateUserDto },
    }
    // return this.authService.update(+id, UpdateUserDto);
  }

  @Delete('/all')
  removeAll() {
    return this.authService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Get("private")
  @UseGuards(AuthGuard('jwt'))
  privateRoute(
    @GetUser() user: Users,
    @GetUser("email") userEmail: string,
    @GetUser("isActive") isActive: boolean,
    @GetRawHeaders() headers: string[]
  ) {
    console.log(user);

    return {
      message: 'This is a private route',
      data: 'You are able',
      user,
      userEmail,
      isActive,
      headers
    }
  }

  /*   @SetMetadata('roles', ['admin']) */
  @Get("secondPrivate")
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @RoleProtected(ValidRoles.USER)
  secondPrivate(
    @GetUser() user: Users,
  ) {
    return {
      message: 'This is a second private route',
      data: 'You are able',
      user
    }
  }

  @Auth(ValidRoles.ADMIN, ValidRoles.USER)
  @Get("thirdPrivate")
  thirdPrivate() {
    return {
      message: 'This is a third private route',
      data: 'You are able'
    }
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthstatus(
    @GetUser() user: Users
  ) {
    return this.authService.checkAuthStatus(user);
  }
}
