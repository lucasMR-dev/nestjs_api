import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { isNotEmpty } from 'class-validator';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async signIn(username: string, pass: string): Promise<{access_token: string}>{
        const user = await this.userService.findOne(username);
        let isMatch = false;

        if ( isNotEmpty(user)) {
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

        return  { access_token: await this.jwtService.signAsync(payload)}
    }
}
