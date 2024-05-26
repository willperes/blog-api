import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PostsRepositoryImpl } from './posts.repository';

@Module({
  providers: [PostsResolver, PostsService, PostsRepositoryImpl],
})
export class PostsModule {}
