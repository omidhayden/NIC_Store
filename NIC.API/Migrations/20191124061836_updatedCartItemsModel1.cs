using Microsoft.EntityFrameworkCore.Migrations;

namespace NIC.API.Migrations
{
    public partial class updatedCartItemsModel1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "totalPrice",
                table: "CartItems",
                newName: "TotalPrice");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalPrice",
                table: "CartItems",
                newName: "totalPrice");
        }
    }
}
