import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { encrypt } from './utils/handleBcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ){}

    public async register(registerAuthDto:RegisterAuthDto){
        const { password, ...user } = registerAuthDto;

        const userParse = {
            ...user, password: await encrypt(password)
        }
        return this.userModel.create(userParse);
    }
}
