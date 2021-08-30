import {MigrationInterface, QueryRunner} from "typeorm";

export class dev1630353847463 implements MigrationInterface {
    name = 'dev1630353847463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."submission" DROP COLUMN "challengeId"`);
        await queryRunner.query(`ALTER TABLE "public"."submission" ADD "challengeId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."submission" ADD CONSTRAINT "FK_d3af0954e5f8c6c9ee89e9dd989" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."submission" DROP CONSTRAINT "FK_d3af0954e5f8c6c9ee89e9dd989"`);
        await queryRunner.query(`ALTER TABLE "public"."submission" DROP COLUMN "challengeId"`);
        await queryRunner.query(`ALTER TABLE "public"."submission" ADD "challengeId" character varying NOT NULL`);
    }

}
