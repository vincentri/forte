/*
  Warnings:

  - You are about to drop the `transactons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactons" DROP CONSTRAINT "transactons_model_id_fkey";

-- DropTable
DROP TABLE "transactons";

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "model_id" INTEGER NOT NULL,
    "transaction_number" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_transaction_number_key" ON "transactions"("transaction_number");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
