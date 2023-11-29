import { z as zod } from "zod";

export const CollectionSchema = zod.object({
  namePrefix: zod
    .string()
    .trim()
    .min(4, { message: "Name must be 4 or more characters long!" }),
  description: zod.string(),
  amount: zod.number()
});

export type CollectionInput = zod.infer<typeof CollectionSchema>;

export const defaultCollectionState = {
    namePrefix: "",
    description: "",
    amount: 0,
}
