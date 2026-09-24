-- CreateTable
CREATE TABLE `horario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `claseId` INTEGER NOT NULL,
    `dia` VARCHAR(191) NOT NULL,
    `horaInicio` VARCHAR(191) NOT NULL,
    `cupoMaximo` INTEGER NOT NULL,
    `entrenador` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `horario` ADD CONSTRAINT `horario_claseId_fkey` FOREIGN KEY (`claseId`) REFERENCES `clase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
