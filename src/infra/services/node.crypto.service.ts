import { type CryptoService } from '@/application/services'
import { randomUUID } from 'crypto'

export class NodeCryptoService implements CryptoService {
  uuid() {
    return randomUUID()
  }
}
