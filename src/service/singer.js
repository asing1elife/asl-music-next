import { get } from './base'

class SingerService {
  list () {
    return get('/api/singer')
  }
}

export default new SingerService()
