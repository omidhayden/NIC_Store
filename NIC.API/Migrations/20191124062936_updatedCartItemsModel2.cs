using Microsoft.EntityFrameworkCore.Migrations;

namespace NIC.API.Migrations
{
    public partial class updatedCartItemsModel2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "TotalPrice",
                table: "CartItems",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "TotalPrice",
                table: "CartItems",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
