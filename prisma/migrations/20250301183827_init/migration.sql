/*
  Warnings:

  - Added the required column `event_organizer` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "event_organizer" TEXT NOT NULL;
