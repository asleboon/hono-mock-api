import { z } from "@hono/zod-openapi";

const GeoSchema = z
  .object({
    lat: z.string().openapi({ example: "5.7430785" }),
    lng: z.string().openapi({ example: "58.9334144" }),
  })
  .openapi("GeoLocation");

const AddressSchema = z
  .object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: GeoSchema,
  })
  .openapi("Address");

const CompanySchema = z
  .object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
  })
  .openapi("Company");

export const UserSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    address: AddressSchema,
    phone: z.string(),
    website: z.string(),
    company: CompanySchema,
  })
  .openapi("User");

export const UsersSchema = z.array(UserSchema).openapi("Users");

export type User = z.infer<typeof UserSchema>;

//TODO:  Refactor. Cannot create a new function every time
// export const validateUsers = async (
//   responsePromise: Promise<unknown>,
// ): Promise<User[]> => {
//   try {
//     const response = await responsePromise;
//     const users = UsersSchema.parse(response);
//     return users;
//   } catch (err: unknown) {
//     throw new Error(`Validation error: ${err}`);
//   }
// };
//
// export const validateUser = async (
//   responsePromise: Promise<unknown>,
// ): Promise<User> => {
//   try {
//     const response = await responsePromise;
//     const user = UserSchema.parse(response);
//     return user;
//   } catch (err: unknown) {
//     throw new Error(`Validation error: ${err}`);
//   }
// };
