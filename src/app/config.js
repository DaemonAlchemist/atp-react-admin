const defaults = {
  login: {
    tokenPath: "HEADER:login-token"
  },
  rest: {
    baseUrl: {
      default: "http://192.168.254.54:3000/"
    }
  },
  media: {
    staticHost: "darkwynd-chronicles.s3-website-us-east-1.amazonaws.com"
  },
  public: {
    hostName: "www.darkwyndchronicles.com"
  }
};

export default defaults;
