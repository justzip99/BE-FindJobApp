import { MigrationInterface, QueryRunner } from "typeorm";

export class Gen1728546941881 implements MigrationInterface {
    name = 'Gen1728546941881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`balance\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`balance\` int(10) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`balance\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`balance\` decimal(10) NOT NULL DEFAULT '0'`);
    }

}
