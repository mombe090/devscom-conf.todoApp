import { Module } from '@nestjs/common';
import {MongoDatabaseModule} from "../mongo-database/mongo-database.module";
import { TodoController } from './todo.controller';
import {todosProviders} from "./todo.providers";
import { TodoService } from './todo.service';

@Module({
  imports: [MongoDatabaseModule],
  controllers: [TodoController],
  providers: [TodoService, ...todosProviders],
  exports: []
})
export class TodoModule {}
