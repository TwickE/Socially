import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from './_generated/server';

export const createUser = mutation({
  args: {
    username: v.string(),
    fullname: v.string(),
    image: v.string(),
    bio: v.optional(v.string()),
    email: v.string(),
    clerkId: v.string(),
  },

  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) return;

    await ctx.db.insert("users", {
      username: args.username,
      fullname: args.fullname,
      image: args.image,
      bio: args.bio,
      email: args.email,
      clerkId: args.clerkId,
      followers: 0,
      following: 0,
      posts: 0,
    })
  }
});

export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("User not authenticated");
  }
  const currentUser = await ctx.db.query("users").withIndex(
    "by_clerk_id", (q) => q.eq("clerkId", identity.subject)
  ).first();

  if (!currentUser) {
    throw new Error("User not found");
  }

  return currentUser;
}

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
});

export const updateProfile = mutation({
  args: {
    fullname: v.string(),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    await ctx.db.patch(currentUser._id, {
      fullname: args.fullname,
      bio: args.bio,
    });
  }
});

export const getUserProfile = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    if (!user) {
      throw new Error("User not found");
    }

    return user
  }
});

export const isFollowing = query({
  args: { followingId: v.id("users") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const follow = await ctx.db
      .query("follows")
      .withIndex("by_both", (q) =>
        q.eq("followerId", currentUser._id).eq("followingId", args.followingId))
      .first();

    return !!follow;
  }
});

export const toggleFollow = mutation({
  args: { followingId: v.id("users") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const existingFollow = await ctx.db.query("follows")
      .withIndex("by_both", (q) =>
        q.eq("followerId", currentUser._id).eq("followingId", args.followingId))
      .first();

    if (existingFollow) {
      await ctx.db.delete(existingFollow._id);
      await updateFollowCounts(ctx, currentUser._id, args.followingId, false);

      const deleteNotification = await ctx.db
        .query("notifications")
        .withIndex("by_both_and_type", (q) =>
          q.eq("receiverId", args.followingId)
            .eq("senderId", currentUser._id)
            .eq("type", "follow"))
        .first();

      if (deleteNotification) {
        await ctx.db.delete(deleteNotification._id);
      }
    } else {
      await ctx.db.insert("follows", {
        followerId: currentUser._id,
        followingId: args.followingId
      });
      await updateFollowCounts(ctx, currentUser._id, args.followingId, true);

      await ctx.db.insert("notifications", {
        receiverId: args.followingId,
        senderId: currentUser._id,
        type: "follow",
      });
    }
  }
});

async function updateFollowCounts(
  ctx: MutationCtx,
  followerId: Id<"users">,
  followingId: Id<"users">,
  isFollow: boolean
) {
  const follower = await ctx.db.get(followerId);
  const following = await ctx.db.get(followingId);

  if (follower && following) {
    await ctx.db.patch(followerId, {
      following: follower.following + (isFollow ? 1 : -1)
    });
    await ctx.db.patch(followingId, {
      followers: following.followers + (isFollow ? 1 : -1)
    });
  }
}

export const searchUsersByUsername = query({
  args: { searchQuery: v.string() },
  handler: async (ctx, args) => {
    if (!args.searchQuery || args.searchQuery.trim() === "") {
      return [];
    }

    const users = await ctx.db
      .query("users")
      .withSearchIndex("search_username", (q) =>
        q.search("username", args.searchQuery)
      )
      .collect();

    return users;
  },
});

export const getUserFollowers = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const followers = await ctx.db
      .query("follows")
      .withIndex("by_following", (q) => q.eq("followingId", args.id))
      .collect();

    const followersWithInfo = await Promise.all(
      followers.map(async (follow) => {
        const user = await ctx.db.get(follow.followerId);

        const bothFollow = await ctx.db
          .query("follows")
          .withIndex("by_both", (q) => q.eq("followerId", args.id).eq("followingId", user!._id))
          .first();

        return {
          ...follow,
          user: {
            id: user!._id,
            username: user!.username,
            fullname: user!.fullname,
            image: user!.image,
            bothFollow: !!bothFollow,
          }
        };
      })
    );
    return followersWithInfo;
  }
});

export const getUserFollowing = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const following = await ctx.db
      .query("follows")
      .withIndex("by_follower", (q) => q.eq("followerId", args.id))
      .collect();

    const followingWithInfo = await Promise.all(
      following.map(async (follow) => {
        const user = await ctx.db.get(follow.followingId);

        const bothFollow = await ctx.db
          .query("follows")
          .withIndex("by_both", (q) => q.eq("followerId", user!._id).eq("followingId", args.id))
          .first();

        return {
          ...follow,
          user: {
            id: user!._id,
            username: user!.username,
            fullname: user!.fullname,
            image: user!.image,
            bothFollow: !!bothFollow,
          }
        };
      })
    );
    return followingWithInfo;
  }
});