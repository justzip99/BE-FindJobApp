import { MigrationInterface, QueryRunner } from "typeorm";

export class Gen1727249993525 implements MigrationInterface {
    name = 'Gen1727249993525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL, \`position\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`datePost\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`resume\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`balance\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_ae05faaa55c866130abef6e1fee\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_ae05faaa55c866130abef6e1fee\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`balance\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`resume\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
    }

}
