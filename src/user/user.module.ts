import { Module } from '@nestjs/common';
import { UsesrController } from './usesr/usesr.controller';
import { UsesrService } from './usesr/usesr.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeOrm/entites/User';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Module({
  imports:[TypeOrmModule.forFeature([User]),  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '500s' },
  }),],

  controllers: [UsesrController],
  providers: [UsesrService,NotificationsGateway]
})
export class UserModule {}
