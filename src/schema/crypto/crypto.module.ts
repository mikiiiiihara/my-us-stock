import { Module } from '@nestjs/common';
import { CryptoModule as CryptoRepositoryModule } from '../../repositories/crypto/crypto.module';
import { CryptoResolver } from './crypto.resolver';
import { CryptoService } from './crypto.service';

@Module({
  imports: [CryptoRepositoryModule],
  providers: [CryptoResolver, CryptoService],
})
export class CryptoModule {}
