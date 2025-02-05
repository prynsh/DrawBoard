import { z } from "zod";

export const UserSchema  = z.object({
    username: z.string(),
    password: z.string(),
    name : z.string()
})

export const SingInSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export const CreateRoomSchema = z.object({
    name : z.string()
})