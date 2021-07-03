import { get } from './base'

class RecommendService {
  list () {
    return get('/api/recommend')
  }
}

export default new RecommendService()
