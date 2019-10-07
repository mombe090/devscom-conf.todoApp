import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDatabaseModule } from './mongo-database/mongo-database.module';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [MongoDatabaseModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
