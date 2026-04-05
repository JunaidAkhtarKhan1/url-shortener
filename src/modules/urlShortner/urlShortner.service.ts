class UrlShortnerService {
  async createShortUrl() {
    console.log("create URL");
    return true;
  }
  async readShortUrl() {
    console.log("get URL");
    return true;
  }
}

export default new UrlShortnerService();
