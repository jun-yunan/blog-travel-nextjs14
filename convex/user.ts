import { internalMutation, internalQuery, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';

export const create = internalMutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (context, args) => {
    await context.db.insert('users', args);
  },
});

export const get = internalQuery({
  args: {
    clerkId: v.string(),
  },
  handler: async (context, args) => {
    return await context.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique();
  },
});

export const getUserById = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('Unauthorized');
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError('User not found');
    }
    return user;
  },
});
