using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MicroCode.Migrations
{
    /// <inheritdoc />
    public partial class chagedMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResponseModel_ProgramModel_Program_id",
                table: "ResponseModel");

            migrationBuilder.DropForeignKey(
                name: "FK_ResponseModel_UserModel_user_id",
                table: "ResponseModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ResponseModel",
                table: "ResponseModel");

            migrationBuilder.DropColumn(
                name: "ResponseID",
                table: "ResponseModel");

            migrationBuilder.DropColumn(
                name: "UserCode",
                table: "ResponseModel");

            migrationBuilder.DropColumn(
                name: "verified",
                table: "ResponseModel");

            migrationBuilder.RenameTable(
                name: "ResponseModel",
                newName: "ResponseModels");

            migrationBuilder.RenameColumn(
                name: "eamil",
                table: "UserModel",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "submission_data",
                table: "ResponseModels",
                newName: "CompletedDate");

            migrationBuilder.RenameColumn(
                name: "customInput",
                table: "ResponseModels",
                newName: "JudgeId");

            migrationBuilder.RenameIndex(
                name: "IX_ResponseModel_user_id",
                table: "ResponseModels",
                newName: "IX_ResponseModels_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_ResponseModel_Program_id",
                table: "ResponseModels",
                newName: "IX_ResponseModels_Program_id");

            migrationBuilder.AddColumn<int>(
                name: "diffulty",
                table: "ProgramModel",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ResponseModels",
                table: "ResponseModels",
                column: "JudgeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ResponseModels_ProgramModel_Program_id",
                table: "ResponseModels",
                column: "Program_id",
                principalTable: "ProgramModel",
                principalColumn: "Program_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ResponseModels_UserModel_user_id",
                table: "ResponseModels",
                column: "user_id",
                principalTable: "UserModel",
                principalColumn: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResponseModels_ProgramModel_Program_id",
                table: "ResponseModels");

            migrationBuilder.DropForeignKey(
                name: "FK_ResponseModels_UserModel_user_id",
                table: "ResponseModels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ResponseModels",
                table: "ResponseModels");

            migrationBuilder.DropColumn(
                name: "diffulty",
                table: "ProgramModel");

            migrationBuilder.RenameTable(
                name: "ResponseModels",
                newName: "ResponseModel");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "UserModel",
                newName: "eamil");

            migrationBuilder.RenameColumn(
                name: "CompletedDate",
                table: "ResponseModel",
                newName: "submission_data");

            migrationBuilder.RenameColumn(
                name: "JudgeId",
                table: "ResponseModel",
                newName: "customInput");

            migrationBuilder.RenameIndex(
                name: "IX_ResponseModels_user_id",
                table: "ResponseModel",
                newName: "IX_ResponseModel_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_ResponseModels_Program_id",
                table: "ResponseModel",
                newName: "IX_ResponseModel_Program_id");

            migrationBuilder.AddColumn<Guid>(
                name: "ResponseID",
                table: "ResponseModel",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "UserCode",
                table: "ResponseModel",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "verified",
                table: "ResponseModel",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ResponseModel",
                table: "ResponseModel",
                column: "ResponseID");

            migrationBuilder.AddForeignKey(
                name: "FK_ResponseModel_ProgramModel_Program_id",
                table: "ResponseModel",
                column: "Program_id",
                principalTable: "ProgramModel",
                principalColumn: "Program_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ResponseModel_UserModel_user_id",
                table: "ResponseModel",
                column: "user_id",
                principalTable: "UserModel",
                principalColumn: "user_id");
        }
    }
}
