export interface PrismaBaseModel<T extends object> {
  findUnique: (args: any) => Promise<T | null>;
  findFirst: (args?: any) => Promise<T | null>;
  findMany: (args?: any) => Promise<Array<T>>;
  create: (args: any) => Promise<T>;
  update: (args: any) => Promise<T>;
  count: () => Promise<number>;
  delete: (args: any) => Promise<T>;
}
