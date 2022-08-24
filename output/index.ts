import { z } from "zod";
export const Role = z.enum(["USER", "ADMIN"]);
export const PostStatus = z.enum(["DRAFT", "PUBLISHED"]);
