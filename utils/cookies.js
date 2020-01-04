/* istanbul ignore next */
import Router from "next/router";
import cookie from "cookie";
import cookies from "js-cookie";

const Token = {
  ajaxHandler(type, e) {
    return { type, error: e.message };
  },
  logout() {
    cookies.remove("token");
    Router.replace("/");
  },
  loggedIn() {
    Router.replace("/markup");
  },
  getStoredToken(req) {
    if (req) {
      const parsedCookies = cookie.parse(req.headers.cookie || "");
      return parsedCookies && parsedCookies.token;
    }
    cookies.get("token");
  },
  getStoredLocale(req) {
    if (req) {
      // Attempt to get locale saved cookie
      const parsedCookies = cookie.parse(req.headers.cookie || "");
      if (parsedCookies.locale) {
        return parsedCookies.locale;
      }
      // Attempt to retrieve local from Accept-Language headers
      if (req.headers && req.headers["accept-language"]) {
        const parsedLocale = req.headers["accept-language"].split(",")[0];
        if (parsedLocale) {
          return parsedLocale;
        }
      }
    }

    return Constants.defaultLocale;
  },
  setStoredLocale(v) {
    return cookies.set("locale", v);
  },
  setStoredToken(v) {
    return cookies.set("token", v);
  }
};

// global.Token = Token;
export default Token;
