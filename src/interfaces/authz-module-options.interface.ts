export interface AuthZModuleOptions<T = any> {
  model: string;
  policy: string | Promise<T>;
}
