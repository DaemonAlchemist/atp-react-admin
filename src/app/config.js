const defaults = {
  login: {
    tokenPath: "HEADER:login-token"
  },
  rest: {
    baseUrl: {
      default: "http://api.darkwyndchronicles.com:3000/"
    }
  },
  media: {
    staticHost: "media.darkwyndchronicles.com"
  },
  public: {
    hostName: "www.darkwyndchronicles.com"
  }
};

export default defaults;
