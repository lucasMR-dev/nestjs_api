import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly userService: UserService) { }

    /**
     * 
     * @param registerDto 
     * @returns Http Status 201
     */
    @HttpCode(HttpStatus.CREATED)
    @Public()
    @Post('register')
    register(@Body() registerDto: CreateUserDto){
        return this.authService.register(registerDto);
    }

    /**
     * 
     * @param signInDto 
     * @returns Http Status 200
     * JWT Token
     */
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }
}
