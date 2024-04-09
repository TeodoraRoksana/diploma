using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataBaseLayer.migrations
{
    /// <inheritdoc />
    public partial class RefreshTableWeeklyNotes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_WeeklyNotes_UsersId",
                table: "WeeklyNotes",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_WeeklyNotes_Users_UsersId",
                table: "WeeklyNotes",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeeklyNotes_Users_UsersId",
                table: "WeeklyNotes");

            migrationBuilder.DropIndex(
                name: "IX_WeeklyNotes_UsersId",
                table: "WeeklyNotes");
        }
    }
}
