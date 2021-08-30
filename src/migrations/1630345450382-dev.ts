import {MigrationInterface, QueryRunner} from "typeorm";

export class dev1630345450382 implements MigrationInterface {
    name = 'dev1630345450382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "challenge" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(100) NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_5f31455ad09ea6a836a06871b7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."submission" DROP COLUMN "challengeId"`);
        await queryRunner.query(`ALTER TABLE "public"."submission" ADD "challengeId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."submission" ADD CONSTRAINT "FK_d3af0954e5f8c6c9ee89e9dd989" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."submission" DROP CONSTRAINT "FK_d3af0954e5f8c6c9ee89e9dd989"`);
        await queryRunner.query(`ALTER TABLE "public"."submission" DROP COLUMN "challengeId"`);
        await queryRunner.query(`ALTER TABLE "public"."submission" ADD "challengeId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "challenge"`);
    }

}
