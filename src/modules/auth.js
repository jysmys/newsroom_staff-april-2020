import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  host: "https://newsroom-api.herokuapp.com",
  prefixUrl: "/api",
  debug: false,
});

export default auth;
