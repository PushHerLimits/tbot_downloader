import { Module } from '@nestjs/common';
import { internalsImportsAppModule } from './app/imports/internals.import';
import { externalsImportsAppModule } from './app/imports/externals.import';

@Module({
  imports: [
    ...externalsImportsAppModule,
    ...internalsImportsAppModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
