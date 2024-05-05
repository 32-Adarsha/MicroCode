using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MicroCode.Migrations
{
    /// <inheritdoc />
    public partial class init19 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "input",
                table: "CodeModels");

            migrationBuilder.DropColumn(
                name: "output",
                table: "CodeModels");

            migrationBuilder.AddColumn<string>(
                name: "hidden_testcase",
                table: "CodeModels",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "public_testcase",
                table: "CodeModels",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "hidden_testcase",
                table: "CodeModels");

            migrationBuilder.DropColumn(
                name: "public_testcase",
                table: "CodeModels");

            migrationBuilder.AddColumn<string>(
                name: "input",
                table: "CodeModels",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "output",
                table: "CodeModels",
                type: "text",
                nullable: true);
        }
    }
}
