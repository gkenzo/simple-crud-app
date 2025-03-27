import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/db/database.module';
import { HttpModule } from './infra/http/http.module';
import { StoreModule } from './infra/store/store.module';

@Module({
  imports: [HttpModule, DatabaseModule, StoreModule],
})
export class AppModule {}
