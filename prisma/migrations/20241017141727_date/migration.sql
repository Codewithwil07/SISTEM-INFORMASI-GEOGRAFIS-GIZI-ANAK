/*
  Warnings:

  - Made the column `laporan_tanggal` on table `gizi` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `gizi` MODIFY `laporan_tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
