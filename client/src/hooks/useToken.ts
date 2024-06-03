import { jwtDecode } from "jwt-decode";

export function useToken() {

  const getUser = (token: {token: string | null} | undefined) => {
    if (!token?.token) {
      return null;
    }
    const jwtDecoded: { [key: string]: string } = jwtDecode(token.token);
    const id = jwtDecoded.userID;
    const avatar = jwtDecoded.avatar;
    const username = jwtDecoded.unique_name;
    const user = {
      id,
      avatar,
      username,
    };
    return user;
  };

  function cleanToken(token: string | null) {
    if(!token){
      return null
    }
    const cleanedToken = token.replace(/^['"]|['"]$/g, "");
    return cleanedToken;
  }

  const saveToken = (token: string | null) => {
    if (!token) {
      return null;
    }

    const newToken = cleanToken(token);

    const decodedToken = jwtDecode(newToken!);
    const expiration = decodedToken.exp! * 1000;
    const result = { decodedToken, expiration };
    return result;
  };

  const checkToken = (token: string | null) => {
    if (!token) {
      return null;
    }
    const decodedToken = saveToken(token);
    const currentTime = Date.now();
    if (currentTime > decodedToken!.expiration) {
      if (decodedToken?.decodedToken.rememberMe === "True") {
        localStorage.removeItem("Token");
      } else {
        sessionStorage.removeItem("Token");
      }
    }
  };

  const getToken = () => {
    const localStorageToken = localStorage.getItem("Token");
    const sessionStorageToken = sessionStorage.getItem("Token");
    if (localStorageToken) {
      return cleanToken(localStorageToken);
    } else if (sessionStorageToken) {
      return cleanToken(sessionStorageToken);
    } else {
      return null;
    }
  };

  const logout = (token: string | null) => {
    if (!token) {
      return null;
    }
    const decodedToken = saveToken(token);
    const rememberMe = decodedToken?.decodedToken.rememberMe;
    if (rememberMe === "True") {
      localStorage.removeItem("Token");
    } else {
      sessionStorage.removeItem("Token");
    }
  };
  return { getUser, getToken, checkToken, logout };
}
