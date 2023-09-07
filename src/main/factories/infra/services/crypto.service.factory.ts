import { NodeCryptoService } from '@/infra/services'

export const makeCryptoService = () => {
  return new NodeCryptoService()
}
