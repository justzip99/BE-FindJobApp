import { MigrationInterface, QueryRunner } from "typeorm";

export class Gen1727257739457 implements MigrationInterface {
    name = 'Gen1727257739457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`resume\` \`resume\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`balance\` \`balance\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`resume\` \`resume\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`balance\` \`balance\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`balance\` \`balance\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`resume\` \`resume\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`balance\` \`balance\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`resume\` \`resume\` varchar(255) NOT NULL`);
    }

}
