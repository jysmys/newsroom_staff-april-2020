import JtockAuth from "j-tockauth";

let jtockURL;
if (process.env.NODE_ENV === "production") {
  jtockURL = process.env.REACT_APP_HEROKUURL;
} else if (process.env.NODE_ENV === "development") {
  jtockURL = process.env.REACT_APP_LOCALURL;
}

const auth = new JtockAuth({
  host: jtockURL,
  debug: false,
});

export default auth;
