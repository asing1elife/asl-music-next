import { get } from './base'

class SingerService {
  list () {
    return get('/api/singer')
  }

  detail (mid) {
    return get('/api/singer/detail', {
      mid
    })
  }
}

export default new SingerService()
