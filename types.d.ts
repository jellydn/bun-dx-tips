declare module "bun" {
  interface Env {
    PORT: number;
    SERVER_URL: string;
  }
}
