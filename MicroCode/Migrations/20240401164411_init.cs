using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MicroCode.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserModel",
                columns: table => new
                {
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    first_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    last_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    phone_no = table.Column<string>(type: "text", nullable: false),
                    username = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    email = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    password_hash = table.Column<string>(type: "text", nullable: false),
                    registration_data = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserModel", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "ProgramModel",
                columns: table => new
                {
                    program_id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    discription = table.Column<string>(type: "text", nullable: false),
                    diffulty = table.Column<int>(type: "integer", nullable: false),
                    judgeId = table.Column<Guid>(type: "uuid", nullable: true),
                    verified = table.Column<bool>(type: "boolean", nullable: false),
                    isPublic = table.Column<bool>(type: "boolean", nullable: false),
                    flagged = table.Column<bool>(type: "boolean", nullable: false),
                    registration_data = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    hasError = table.Column<string>(type: "text", nullable: false),
                    errorMessage = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgramModel", x => x.program_id);
                    table.ForeignKey(
                        name: "FK_ProgramModel_UserModel_user_id",
                        column: x => x.user_id,
                        principalTable: "UserModel",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "CodeModels",
                columns: table => new
                {
                    program_id = table.Column<Guid>(type: "uuid", nullable: false),
                    mainCode = table.Column<string>(type: "text", nullable: false),
                    hidden_input = table.Column<string>(type: "text", nullable: false),
                    public_input = table.Column<string>(type: "text", nullable: false),
                    hidden_output = table.Column<string>(type: "text", nullable: false),
                    public_output = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodeModels", x => x.program_id);
                    table.ForeignKey(
                        name: "FK_CodeModels_ProgramModel_program_id",
                        column: x => x.program_id,
                        principalTable: "ProgramModel",
                        principalColumn: "program_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResponseModels",
                columns: table => new
                {
                    JudgeId = table.Column<string>(type: "text", nullable: false),
                    completed = table.Column<bool>(type: "boolean", nullable: true),
                    user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    CompletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    language = table.Column<string>(type: "text", nullable: false),
                    Program_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResponseModels", x => x.JudgeId);
                    table.ForeignKey(
                        name: "FK_ResponseModels_ProgramModel_Program_id",
                        column: x => x.Program_id,
                        principalTable: "ProgramModel",
                        principalColumn: "program_id");
                    table.ForeignKey(
                        name: "FK_ResponseModels_UserModel_user_id",
                        column: x => x.user_id,
                        principalTable: "UserModel",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProgramModel_user_id",
                table: "ProgramModel",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_ResponseModels_Program_id",
                table: "ResponseModels",
                column: "Program_id");

            migrationBuilder.CreateIndex(
                name: "IX_ResponseModels_user_id",
                table: "ResponseModels",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CodeModels");

            migrationBuilder.DropTable(
                name: "ResponseModels");

            migrationBuilder.DropTable(
                name: "ProgramModel");

            migrationBuilder.DropTable(
                name: "UserModel");
        }
    }
}
