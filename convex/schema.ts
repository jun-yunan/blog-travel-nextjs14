import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { create } from 'domain';

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    username: v.string(),
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),

    personalWebsite: v.optional(v.string()),
    bio: v.optional(v.string()),
    location: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    phone: v.optional(v.string()),
    role: v.optional(v.union(v.literal('admin'), v.literal('user'))),
  })
    .index('by_email', ['email'])
    .index('by_clerkId', ['clerkId']),
  blogs: defineTable({
    authorId: v.id('users'),
    title: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
  }),
});
