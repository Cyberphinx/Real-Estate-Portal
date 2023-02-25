using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class VatNumberAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VatNumber",
                table: "Companies",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "f17dd2a2-7948-4ff1-9bd9-30c928ee9b23");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "82b6240c-d98c-47e0-8c07-7de7351da2fd");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3",
                column: "ConcurrencyStamp",
                value: "9000b7f4-7cd9-456f-a546-5959773172ee");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4",
                column: "ConcurrencyStamp",
                value: "ea2b1eca-6aa2-49fd-b9ed-2979d4232a7f");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5",
                column: "ConcurrencyStamp",
                value: "e5b47fb6-92de-41f5-af5b-283e1b48b89e");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6",
                column: "ConcurrencyStamp",
                value: "d9f93931-0a55-43b2-9ba1-2a805063125a");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VatNumber",
                table: "Companies");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "c307b04d-ba5a-44d5-9cdb-09eadd10d6d3");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "61fb192b-39d7-4649-acdf-ec83a12a2446");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3",
                column: "ConcurrencyStamp",
                value: "e776f18c-0085-4686-99bb-1891d5198a05");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4",
                column: "ConcurrencyStamp",
                value: "9a6a6ee3-d548-4b40-84d0-0bf0967a339c");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5",
                column: "ConcurrencyStamp",
                value: "4479ed52-bc0a-4bbb-84c0-4d1e37b82be4");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6",
                column: "ConcurrencyStamp",
                value: "ddcec337-2834-46e6-b594-a27f44d46d61");
        }
    }
}
