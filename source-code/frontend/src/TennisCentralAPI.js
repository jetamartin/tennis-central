import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class TennisCentralAPI {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${TennisCentralAPI.token}` };
    const params = method === "get" ? data : {};
    // debugger;
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getUserProfile(userId, userToken) {
    TennisCentralAPI.token = userToken;
    let res = await this.request(`users/${userId}`);
    debugger;
    return res;
  }

  static async registerUser(newUserInfo) {
    let res = await this.request(`auth/register`, newUserInfo, "post");
    return res;
  }

  static async loginUser(userCredentials) {
    debugger;
    let res = await this.request(`auth/login`, userCredentials, "post");
    return res;
  }

  static async updateUserProfile(userRecord, userId, userToken) {
    TennisCentralAPI.token = userToken;
    debugger;
    let res = await this.request(
      `users/${userId}`,
      userRecord,
      "patch",
      TennisCentralAPI.token
    );
    debugger;
    return res;
  }

  static async getAllUsers(userToken) {
    TennisCentralAPI.token = userToken;
    let res = await this.request(`users`);
    return res;
  }

  static async addPartner(userId, partnerId, userToken) {
    debugger;
    TennisCentralAPI.token = userToken;
    let res = await this.request(
      `users/${userId}/partners/${partnerId}`,
      {},
      "post"
    );
    return res;
  }
  static async getPartner(userId, partnerId, userToken) {
    TennisCentralAPI.token = userToken;
    let res = await this.request(`users/${userId}/partners/${partnerId}`);
    return res;
  }

  static async getPartners(userId, userToken) {
    TennisCentralAPI.token = userToken;
    let res = await this.request(`users/${userId}/partners`);
    return res;
  }

  static async updatePartnerTable(partnerRecord, userId, partnerId, userToken) {
    TennisCentralAPI.token = userToken;
    let res = await this.request(
      `users/${userId}/partners/${partnerId}`,
      partnerRecord,
      "patch"
    );
    return res;
  }

  static async deletePartner(userId, partnerId, userToken) {
    TennisCentralAPI.token = userToken;
    let res = await this.request(
      `users/${userId}/partners/${partnerId}`,
      {},
      "delete"
    );
    return res;
  }
}

export default TennisCentralAPI;
