using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MicroCode.Migrations
{
    /// <inheritdoc />
    public partial class init5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "UserExamModels");
        }
    }
}
