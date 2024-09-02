import { HttpCode, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { isNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async register(registerDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(registerDto);
    }

    async signIn(username: string, pass: string): Promise<{ access_token: string, sub: string, }> {
        const user = await this.userService.findOne(username);
        let isMatch = false;

        if (isNotEmpty(user)) {
            isMatch = await bcrypt.compare(pass, user?.password);
        }
        else {
            throw new NotFoundException({
                'message': 'Credentials not match!'
            });
        }

        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
            sub: payload.sub.toString(),
        }
    }
}
