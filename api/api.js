import axios from "axios";

const API_URL = "http://172.19.0.14:8000";

const Token = () => {
  let token = "";
  if (typeof document !== "undefined") {
    // Access cookies from the document object
    let token = document.cookie
      .split(";")
      .map((a) => a.split("="))
      .filter((a) => a[0].trim() === "token")[0];

    if (token?.length > 1) {
      return token[1];
    } else {
      return token;
    }
  } else {
    return token;
  }
};

export const API = {
  root: () => GetMethod({ url: `${API_URL}` }),
  // this function is to find the authorized user using token
  user: () =>
    GetMethod({
      url: `${API_URL}/auth/user`,
      headers: { Authorization: `Bearer ${Token()}` },
    }),
  userVerify: (token) =>
    GetMethod({
      url: `${API_URL}/auth/userverify`,
      headers: { Authorization: `Bearer ${token}` },
    }),
  signin: (body) => PostMethod({ url: `${API_URL}/auth/signin`, body }),
  signup: (body) => PostMethod({ url: `${API_URL}/auth/signup`, body }),
  forgotpassword: (body) =>
    PostMethod({ url: `${API_URL}/auth/fotgotpassword`, body }),
  changepassword: (body, token) =>
    PostMethod({
      url: `${API_URL}/auth/changepassword`,
      headers: { Authorization: `Bearer ${token}` },
      body,
    }),
  // contianer build and upcode server API routes
  deploy: () =>
    GetMethod({
      url: `${API_URL}/deploy`,
      headers: { Authorization: `Bearer ${Token()}` },
    }),
  deploySpawn: () =>
    PostMethod({
      url: `${API_URL}/deploy`,
      headers: { Authorization: `Bearer ${Token()}` },
    }),
  upvscode: () =>
    PostMethod({
      url: `${API_URL}/upvscode`,
      headers: { Authorization: `Bearer ${Token()}` },
    }),
  // network API router
  networks: () =>
    GetMethod({
      url: `${API_URL}/networks`,
      headers: { Authorization: `Bearer ${Token()}` },
    }),
  addpeer: (body) =>
    PostMethod({
      url: `${API_URL}/addpeer`,
      headers: { Authorization: `Bearer ${Token()}` },
      body,
    }),
  getwgpeer: () =>
    GetMethod({
      url: `${API_URL}/getwgpeer`,
      headers: { Authorization: `Bearer ${Token()}` },
    }),
  wgpeer: (publicKey, type,res) =>
    GetMethod({
      url: `${API_URL}/wgpeer/${publicKey}/${type}`,
      headers: { Authorization: `Bearer ${Token()}` },
      ...res
    }),
  addomain: (body) =>
    PostMethod({
      url: `${API_URL}/addomain`,
      headers: { Authorization: `Bearer ${Token()}` },
      body,
    }),
};

const GetMethod = async (props) => {
  try {
    const headers = props.headers ?? {}; // Set headers to an empty object if not provided
    const responseType = props.responseType ?? "";
    const response = await axios
      .get(props.url, { headers, responseType })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err.response;
      });
    return response;
  } catch (error) {
    throw error;
  }
};

const PostMethod = async (props) => {
  try {
    const headers = props.headers ?? {};
    const body = props.body ?? {};
    const response = await axios
      .post(props.url, body, { headers })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err.response;
      });
    return response;
  } catch (error) {
    throw error;
  }
};

const PatchMethod = async ({ url, body }) => {
  try {
    const response = await axios
      .patch(url, body)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err.response.data);
      });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const DeleteMethod = async ({ url }) => {
  try {
    const response = await axios
      .delete(url)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err.response.data);
      });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
