import axios from "axios";

const API_ENDPOINT = "/api/articles";

class ArticleRepository {
  constructor() {
    this.authToken = null;
  }

  setAuthToken(token) {
    this.authToken = `Bearer ${token}`;
  }

  async fetchAll() {
    const response = await axios.get(API_ENDPOINT);
    return response.data;
  }

  async createArticle(articleData) {
    const config = {
      headers: { Authorization: this.authToken },
    };
    const response = await axios.post(API_ENDPOINT, articleData, config);
    return response.data;
  }

  async modifyArticle(updatedData) {
    const response = await axios.put(
      `${API_ENDPOINT}/${updatedData.id}`,
      updatedData,
    );
    return response.data;
  }

  async deleteArticle(id) {
    const config = {
      headers: { Authorization: this.authToken },
    };
    const response = await axios.delete(`${API_ENDPOINT}/${id}`, config);
    return response.data;
  }
}

export default new ArticleRepository();
