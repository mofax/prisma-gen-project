import { z } from "zod";
export const Role = z.enum(["USER", "ADMIN"]);
export const PostStatus = z.enum(["DRAFT", "PUBLISHED"]);
export const User = z.object({
	id: z.number(),
	createdAt: z.date(),
	email: z.string(),
	name: z.string().optional(),
	meta: z.object({}).optional(),
	role: Role,
	posts: z.object({}).array().optional(),
});
export const Post = z.object({
	id: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
	published: z.boolean(),
	title: z.string(),
	status: PostStatus,
	author: z.object({}).optional(),
	authorId: z.number().optional(),
});
