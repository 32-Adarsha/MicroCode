using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MicroCode.Migrations
{
    /// <inheritdoc />
    public partial class changedDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "verified",
                table: "CodeModels");

            migrationBuilder.RenameColumn(
                name: "Program_id",
                table: "ProgramModel",
                newName: "program_id");

            migrationBuilder.RenameColumn(
                name: "isPrivate",
                table: "ProgramModel",
                newName: "isPublic");

            migrationBuilder.RenameColumn(
                name: "template",
                table: "CodeModels",
                newName: "callerFunction");

            migrationBuilder.AddColumn<string>(
                name: "errorMessage",
                table: "ProgramModel",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "hasError",
                table: "ProgramModel",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "judgeId",
                table: "ProgramModel",
                type: "uuid",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "errorMessage",
                table: "ProgramModel");

            migrationBuilder.DropColumn(
                name: "hasError",
                table: "ProgramModel");

            migrationBuilder.DropColumn(
                name: "judgeId",
                table: "ProgramModel");

            migrationBuilder.RenameColumn(
                name: "program_id",
                table: "ProgramModel",
                newName: "Program_id");

            migrationBuilder.RenameColumn(
                name: "isPublic",
                table: "ProgramModel",
                newName: "isPrivate");

            migrationBuilder.RenameColumn(
                name: "callerFunction",
                table: "CodeModels",
                newName: "template");

            migrationBuilder.AddColumn<bool>(
                name: "verified",
                table: "CodeModels",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
