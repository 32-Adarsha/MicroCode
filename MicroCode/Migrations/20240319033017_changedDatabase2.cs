using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MicroCode.Migrations
{
    /// <inheritdoc />
    public partial class changedDatabase2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CodeModels_ProgramModel_Program_id",
                table: "CodeModels");

            migrationBuilder.RenameColumn(
                name: "Program_id",
                table: "CodeModels",
                newName: "program_id");

            migrationBuilder.AddForeignKey(
                name: "FK_CodeModels_ProgramModel_program_id",
                table: "CodeModels",
                column: "program_id",
                principalTable: "ProgramModel",
                principalColumn: "program_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CodeModels_ProgramModel_program_id",
                table: "CodeModels");

            migrationBuilder.RenameColumn(
                name: "program_id",
                table: "CodeModels",
                newName: "Program_id");

            migrationBuilder.AddForeignKey(
                name: "FK_CodeModels_ProgramModel_Program_id",
                table: "CodeModels",
                column: "Program_id",
                principalTable: "ProgramModel",
                principalColumn: "program_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
