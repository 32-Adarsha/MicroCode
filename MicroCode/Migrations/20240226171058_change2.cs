using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MicroCode.Migrations
{
    /// <inheritdoc />
    public partial class change2 : Migration
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
                    eamil = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
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
                    Program_id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    discription = table.Column<string>(type: "text", nullable: false),
                    verified = table.Column<bool>(type: "boolean", nullable: false),
                    isPrivate = table.Column<bool>(type: "boolean", nullable: false),
                    flagged = table.Column<bool>(type: "boolean", nullable: false),
                    registration_data = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgramModel", x => x.Program_id);
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
                    Program_id = table.Column<Guid>(type: "uuid", nullable: false),
                    mainCode = table.Column<string>(type: "text", nullable: false),
                    template = table.Column<string>(type: "text", nullable: false),
                    input = table.Column<string>(type: "text", nullable: false),
                    output = table.Column<string>(type: "text", nullable: false),
                    verified = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodeModels", x => x.Program_id);
                    table.ForeignKey(
                        name: "FK_CodeModels_ProgramModel_Program_id",
                        column: x => x.Program_id,
                        principalTable: "ProgramModel",
                        principalColumn: "Program_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResponseModel",
                columns: table => new
                {
                    ResponseID = table.Column<Guid>(type: "uuid", nullable: false),
                    UserCode = table.Column<string>(type: "text", nullable: false),
                    customInput = table.Column<string>(type: "text", nullable: false),
                    verified = table.Column<bool>(type: "boolean", nullable: false),
                    submission_data = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    language = table.Column<string>(type: "text", nullable: false),
                    Program_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResponseModel", x => x.ResponseID);
                    table.ForeignKey(
                        name: "FK_ResponseModel_ProgramModel_Program_id",
                        column: x => x.Program_id,
                        principalTable: "ProgramModel",
                        principalColumn: "Program_id");
                    table.ForeignKey(
                        name: "FK_ResponseModel_UserModel_user_id",
                        column: x => x.user_id,
                        principalTable: "UserModel",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProgramModel_user_id",
                table: "ProgramModel",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_ResponseModel_Program_id",
                table: "ResponseModel",
                column: "Program_id");

            migrationBuilder.CreateIndex(
                name: "IX_ResponseModel_user_id",
                table: "ResponseModel",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CodeModels");

            migrationBuilder.DropTable(
                name: "ResponseModel");

            migrationBuilder.DropTable(
                name: "ProgramModel");

            migrationBuilder.DropTable(
                name: "UserModel");
        }
    }
}
