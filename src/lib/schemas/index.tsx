import { z } from 'zod';
export const MemorySchema = z.object({
    id: z.number().optional(),
    imageUrl: z.string().optional(), 
    message: z.string(), 
    name: z.string().optional(), 
    tags: z.array(z.string()).optional(), 
  });

export type Memory = z.infer<typeof MemorySchema>