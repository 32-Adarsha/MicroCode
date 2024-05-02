using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MicroCode.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "expires",
                table: "ExamSubmissionModel");

            migrationBuilder.DropColumn(
                name: "judgeId",
                table: "ExamSubmissionModel");

            migrationBuilder.AddColumn<int>(
                name: "timeLimit",
                table: "ExamModel",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "timeLimit",
                table: "ExamModel");

            migrationBuilder.AddColumn<DateTime>(
                name: "expires",
                table: "ExamSubmissionModel",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "judgeId",
                table: "ExamSubmissionModel",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
