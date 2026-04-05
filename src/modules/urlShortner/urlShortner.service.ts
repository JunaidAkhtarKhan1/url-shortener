class UrlShortnerService {
  async createShortUrl(url: string): Promise<string> {
    //Take the Url from input
    return "true";
  }
  async readShortUrl() {
    console.log("get URL");
    return true;
  }
}

export default new UrlShortnerService();
