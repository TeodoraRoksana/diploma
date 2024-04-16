using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataBaseLayer.Migrations
{
    /// <inheritdoc />
    public partial class DelUserToFilter2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilterNames_Users_UsersId",
                table: "FilterNames");

            migrationBuilder.DropIndex(
                name: "IX_FilterNames_UsersId",
                table: "FilterNames");

            migrationBuilder.DropColumn(
                name: "UsersId",
                table: "FilterNames");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsersId",
                table: "FilterNames",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FilterNames_UsersId",
                table: "FilterNames",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_FilterNames_Users_UsersId",
                table: "FilterNames",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
