const defaults = {
  login: {
    tokenPath: "HEADER:login-token"
  },
  rest: {
    baseUrl: {
      default: "https://api.darkwyndchronicles.com/"
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
