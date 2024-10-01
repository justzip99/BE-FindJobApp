import { MigrationInterface, QueryRunner } from "typeorm";

export class Gen1727754186476 implements MigrationInterface {
    name = 'Gen1727754186476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`job_position\` varchar(255) NOT NULL DEFAULT '', \`location\` varchar(255) NOT NULL DEFAULT '', \`datePost\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`description\` varchar(255) NOT NULL DEFAULT '', \`salary\` int NOT NULL DEFAULT '0', \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(255) NOT NULL DEFAULT '', \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`skill\` varchar(255) NULL, \`education\` varchar(255) NULL, \`experience\` varchar(255) NULL, \`language\` varchar(255) NULL, \`resume\` varchar(255) NULL, \`balance\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_ae05faaa55c866130abef6e1fee\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_ae05faaa55c866130abef6e1fee\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
    }

}
