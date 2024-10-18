-- CreateTable
CREATE TABLE `Gizi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan` VARCHAR(191) NOT NULL,
    `puskesmas` VARCHAR(191) NOT NULL,
    `jumlah_balita_ditimbang` INTEGER NOT NULL,
    `bb_u_kurang` INTEGER NOT NULL,
    `persen_bb_u_kurang` DOUBLE NOT NULL,
    `jumlah_balita_diukur_tinggi_badan` INTEGER NOT NULL,
    `tb_u_pendek` INTEGER NOT NULL,
    `persen_tb_u_pendek` DOUBLE NOT NULL,
    `jumlah_balita_diukur_bb_tb` INTEGER NOT NULL,
    `bb_tb_gizi_kurang` INTEGER NOT NULL,
    `persen_gizi_kurang` DOUBLE NOT NULL,
    `bb_tb_gizi_buruk` INTEGER NOT NULL,
    `persen_gizi_buruk` DOUBLE NOT NULL,
    `laporan_tanggal` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(32) NOT NULL,
    `password` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
