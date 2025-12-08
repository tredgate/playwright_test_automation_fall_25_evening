// src/api/tegb/
// user_api.ts

import { APIRequestContext } from "@playwright/test";

export class UserApi {
  readonly request: APIRequestContext;
  readonly apiUrl = "http://localhost:3000";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerUser(username: string, password: string, email: string) {
    const response = await this.request.post(
      "http://localhost:3000/user/register",
      {
        data: {
          email,
          password,
          username,
        },
      }
    );
    return response;
  }

  async login(username: string, password: string) {
    const loginResponse = await this.request.post(
      "http://localhost:3000/auth/login",
      {
        data: {
          password,
          username,
        },
      }
    );
    return loginResponse;
  }
}
