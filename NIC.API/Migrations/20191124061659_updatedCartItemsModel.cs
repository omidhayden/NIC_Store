using Microsoft.EntityFrameworkCore.Migrations;

namespace NIC.API.Migrations
{
    public partial class updatedCartItemsModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "CartItems",
                newName: "totalPrice");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "totalPrice",
                table: "CartItems",
                newName: "Price");
        }
    }
}
