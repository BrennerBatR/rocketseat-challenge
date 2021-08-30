import {MigrationInterface, QueryRunner} from "typeorm";

export class dev1630347489754 implements MigrationInterface {
    name = 'dev1630347489754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "submission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "repositoryUrl" character varying(100) NOT NULL, "status" character varying(10) NOT NULL DEFAULT 'Pending', "grade" double precision NOT NULL DEFAULT '0', "challengeId" character varying NOT NULL, CONSTRAINT "PK_7faa571d0e4a7076e85890c9bd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "challenge" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(100) NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_5f31455ad09ea6a836a06871b7a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "challenge"`);
        await queryRunner.query(`DROP TABLE "submission"`);
    }

}
