import axios from 'axios';

class IdeasApi {
  constructor() {
    this.url = 'https://idea-api.onrender.com/api/ideas';
  }

  getIdeas() {
    return axios.get(this.url);
  }

  createIdea(data) {
    return axios.post(this.url, data);
  }
  deleteIdea(id) {
    return axios.delete(`${this.url}/${id}`);
  }
}

export default new IdeasApi();
