using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataBaseLayer.Migrations
{
    /// <inheritdoc />
    public partial class someChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilterNames_Tasks_FilterNames_Tasks_FilterNamesId",
                table: "FilterNames");

            migrationBuilder.DropIndex(
                name: "IX_FilterNames_Tasks_FilterNamesId",
                table: "FilterNames");

            migrationBuilder.DropColumn(
                name: "Tasks_FilterNamesId",
                table: "FilterNames");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_FilterNames_FilterNamesId",
                table: "Tasks_FilterNames",
                column: "FilterNamesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_FilterNames_FilterNames_FilterNamesId",
                table: "Tasks_FilterNames",
                column: "FilterNamesId",
                principalTable: "FilterNames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_FilterNames_FilterNames_FilterNamesId",
                table: "Tasks_FilterNames");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_FilterNames_FilterNamesId",
                table: "Tasks_FilterNames");

            migrationBuilder.AddColumn<int>(
                name: "Tasks_FilterNamesId",
                table: "FilterNames",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FilterNames_Tasks_FilterNamesId",
                table: "FilterNames",
                column: "Tasks_FilterNamesId");

            migrationBuilder.AddForeignKey(
                name: "FK_FilterNames_Tasks_FilterNames_Tasks_FilterNamesId",
                table: "FilterNames",
                column: "Tasks_FilterNamesId",
                principalTable: "Tasks_FilterNames",
                principalColumn: "Id");
        }
    }
}
