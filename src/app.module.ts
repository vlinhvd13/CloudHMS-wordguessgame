import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './player.repository';
import { PlayerSchema } from './player.model';

@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://linhvdse3101:123456abc@cluster0.egj615k.mongodb.net/sample_airbnb?retryWrites=true&w=majority'),
  MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]), // Add this line
],
  controllers: [AppController, PlayerController],
  providers: [AppService, PlayerRepository],
})
export class AppModule {}
