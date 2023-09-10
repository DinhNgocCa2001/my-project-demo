import axios from "axios";
// import CommonFunction from "../../lib/common";
// import appSettings from "appSettings";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/",
});

CommonFunction.prepareAxiosClient(
  axiosClient,
  window.app_context.keycloak || {},
  appSettings.env
);




export default axiosClient;