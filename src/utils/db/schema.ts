import { pgTable, text, uuid, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const profiles = pgTable('profiles', {
    id: uuid('id').primaryKey().notNull(),
    updated_at: timestamp('updated_at'),
    username: text('username'),
    avatar_url: text('avatar_url'),
});
export const checkin_points = pgTable('checkin_points', {
    id: uuid('id').primaryKey().notNull(),
    latitude: text('latitude'),
    longitude: text('longitude'),
    photo_url: text('photo_url'),
    name: text('name'),
    city: text('city'),
    description: text('description'),
    date_added: timestamp('date_added'),
});
export const user_checkins = pgTable('user_checkins', {
    user_id: text('user_id').primaryKey().notNull().references(() => profiles.id),
    checkin_points_id: uuid('checkin_points_id').primaryKey().notNull().references(() => checkin_points.id),
    checkin: boolean('checkin'),
});
export const friends = pgTable('friends', {
    user_id: uuid('user_id').primaryKey().notNull().references(() => profiles.id),
    friend_id: uuid('friend_id').primaryKey().notNull().references(() => profiles.id),
});
