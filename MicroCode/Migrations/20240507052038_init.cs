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
                    roles = table.Column<string>(type: "text", nullable: true),
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
                name: "ExamModel",
                columns: table => new
                {
                    examId = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    totaScore = table.Column<int>(type: "integer", nullable: false),
                    timeLimit = table.Column<int>(type: "integer", nullable: false),
                    discription = table.Column<string>(type: "text", nullable: false),
                    allProblems = table.Column<string>(type: "text", nullable: false),
                    accessCode = table.Column<string>(type: "text", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamModel", x => x.examId);
                    table.ForeignKey(
                        name: "FK_ExamModel_UserModel_user_id",
                        column: x => x.user_id,
                        principalTable: "UserModel",
                        principalColumn: "user_id");
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
                    tag = table.Column<string>(type: "text", nullable: true),
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
                name: "ExamSubmissionModel",
                columns: table => new
                {
                    eSubmissionId = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    examId = table.Column<Guid>(type: "uuid", nullable: false),
                    totalScore = table.Column<int>(type: "integer", nullable: false),
                    trackProblem = table.Column<string>(type: "text", nullable: true),
                    CompletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamSubmissionModel", x => x.eSubmissionId);
                    table.ForeignKey(
                        name: "FK_ExamSubmissionModel_ExamModel_examId",
                        column: x => x.examId,
                        principalTable: "ExamModel",
                        principalColumn: "examId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExamSubmissionModel_UserModel_user_id",
                        column: x => x.user_id,
                        principalTable: "UserModel",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "UserExamModels",
                columns: table => new
                {
                    modelId = table.Column<Guid>(type: "uuid", nullable: false),
                    examId = table.Column<Guid>(type: "uuid", nullable: false),
                    taken = table.Column<bool>(type: "boolean", nullable: false),
                    atmtCount = table.Column<int>(type: "integer", nullable: false),
                    maxScore = table.Column<int>(type: "integer", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserExamModels", x => x.modelId);
                    table.ForeignKey(
                        name: "FK_UserExamModels_ExamModel_examId",
                        column: x => x.examId,
                        principalTable: "ExamModel",
                        principalColumn: "examId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserExamModels_UserModel_user_id",
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
                    language = table.Column<string>(type: "text", nullable: false),
                    hidden_testcase = table.Column<string>(type: "text", nullable: false),
                    public_testcase = table.Column<string>(type: "text", nullable: false),
                    timeLimit = table.Column<int>(type: "integer", nullable: false),
                    memoryLimit = table.Column<int>(type: "integer", nullable: false)
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
                name: "CodeSubmissions",
                columns: table => new
                {
                    codeSubmissionId = table.Column<Guid>(type: "uuid", nullable: false),
                    solved = table.Column<bool>(type: "boolean", nullable: false),
                    code = table.Column<string>(type: "text", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    CompletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    language = table.Column<string>(type: "text", nullable: false),
                    Program_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodeSubmissions", x => x.codeSubmissionId);
                    table.ForeignKey(
                        name: "FK_CodeSubmissions_ProgramModel_Program_id",
                        column: x => x.Program_id,
                        principalTable: "ProgramModel",
                        principalColumn: "program_id");
                    table.ForeignKey(
                        name: "FK_CodeSubmissions_UserModel_user_id",
                        column: x => x.user_id,
                        principalTable: "UserModel",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CodeSubmissions_Program_id",
                table: "CodeSubmissions",
                column: "Program_id");

            migrationBuilder.CreateIndex(
                name: "IX_CodeSubmissions_user_id",
                table: "CodeSubmissions",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_ExamModel_user_id",
                table: "ExamModel",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_ExamSubmissionModel_examId",
                table: "ExamSubmissionModel",
                column: "examId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamSubmissionModel_user_id",
                table: "ExamSubmissionModel",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_ProgramModel_user_id",
                table: "ProgramModel",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserExamModels_examId",
                table: "UserExamModels",
                column: "examId");

            migrationBuilder.CreateIndex(
                name: "IX_UserExamModels_user_id",
                table: "UserExamModels",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CodeModels");

            migrationBuilder.DropTable(
                name: "CodeSubmissions");

            migrationBuilder.DropTable(
                name: "ExamSubmissionModel");

            migrationBuilder.DropTable(
                name: "UserExamModels");

            migrationBuilder.DropTable(
                name: "ProgramModel");

            migrationBuilder.DropTable(
                name: "ExamModel");

            migrationBuilder.DropTable(
                name: "UserModel");
        }
    }
}
