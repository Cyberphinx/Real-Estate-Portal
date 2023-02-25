using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class RemovedItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobInvoiceItem_JobInvoiceItem_JobInvoiceItemId",
                table: "JobInvoiceItem");

            migrationBuilder.DropIndex(
                name: "IX_JobInvoiceItem_JobInvoiceItemId",
                table: "JobInvoiceItem");

            migrationBuilder.DropColumn(
                name: "JobInvoiceItemId",
                table: "JobInvoiceItem");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "61341e52-a848-42bb-ab0b-0d40ef78a7e3");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "3bb7e062-7ea1-4f8c-a9d0-9849a8a65759");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3",
                column: "ConcurrencyStamp",
                value: "44636d1c-027e-4a08-b5c7-1781e0a2e2a7");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4",
                column: "ConcurrencyStamp",
                value: "2d54f083-cecf-433b-8474-10aa1a0f590d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5",
                column: "ConcurrencyStamp",
                value: "eb84ebaa-9437-453b-b581-b55fd38c2469");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6",
                column: "ConcurrencyStamp",
                value: "27f1ea9e-1c9e-47c8-b915-0c8c2047abee");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "JobInvoiceItemId",
                table: "JobInvoiceItem",
                type: "uuid",
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

            migrationBuilder.CreateIndex(
                name: "IX_JobInvoiceItem_JobInvoiceItemId",
                table: "JobInvoiceItem",
                column: "JobInvoiceItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobInvoiceItem_JobInvoiceItem_JobInvoiceItemId",
                table: "JobInvoiceItem",
                column: "JobInvoiceItemId",
                principalTable: "JobInvoiceItem",
                principalColumn: "Id");
        }
    }
}
