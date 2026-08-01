-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR', 'USD', 'RUB');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'EUR';
