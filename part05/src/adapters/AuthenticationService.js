import axios from "axios";

const AUTH_ENDPOINT = "/api/login";

class AuthenticationService {
  async authenticate(credentials) {
    const response = await axios.post(AUTH_ENDPOINT, credentials);
    return response.data;
  }
}

export default new AuthenticationService();
