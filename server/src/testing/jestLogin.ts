import { Express } from "express";
import request from "supertest";

const jestLogin = (
  app: Express,
  email: string,
  password: string = "password"
) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const loginMutation = `
        mutation Login($data: LoginData!) {
          login(data: $data)
        }
      `;

      const res = await request(app)
        .post("/graphql")
        .send({
          query: loginMutation,
          variables: {
            data: {
              email,
              password,
              rememberMe: true,
            },
          },
        });

      if (!res.body.data || !res.body.data.login)
        throw new Error(`Unable to login: ${JSON.stringify(res.body)}`);

      resolve(res.body.data.login);
    } catch (e) {
      reject(e);
    }
  });
};

export default jestLogin;
