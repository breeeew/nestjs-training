import { Module } from '@nestjs/common';
import { importsProviders } from './imports.providers';

@Module({
  providers: [...importsProviders],
  exports: [...importsProviders],
})
export class ImportsModule {}
