﻿// <auto-generated />
using System;
using MicroCode.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MicroCode.Migrations
{
    [DbContext(typeof(MicroCodeContext))]
    partial class MicroCodeContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("MicroCode.models.CodeModel", b =>
                {
                    b.Property<Guid>("program_id")
                        .HasColumnType("uuid");

                    b.Property<string>("callerFunction")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("input")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("mainCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("output")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("program_id");

                    b.ToTable("CodeModels");
                });

            modelBuilder.Entity("MicroCode.models.ProgramModel", b =>
                {
                    b.Property<Guid>("program_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("diffulty")
                        .HasColumnType("integer");

                    b.Property<string>("discription")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("errorMessage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("flagged")
                        .HasColumnType("boolean");

                    b.Property<string>("hasError")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("isPublic")
                        .HasColumnType("boolean");

                    b.Property<Guid?>("judgeId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("registration_data")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("title")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<Guid?>("user_id")
                        .HasColumnType("uuid");

                    b.Property<bool>("verified")
                        .HasColumnType("boolean");

                    b.HasKey("program_id");

                    b.HasIndex("user_id");

                    b.ToTable("ProgramModel");
                });

            modelBuilder.Entity("MicroCode.models.ResponseModel", b =>
                {
                    b.Property<string>("JudgeId")
                        .HasColumnType("text");

                    b.Property<DateTime>("CompletedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("Program_id")
                        .HasColumnType("uuid");

                    b.Property<bool?>("completed")
                        .HasColumnType("boolean");

                    b.Property<string>("language")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("user_id")
                        .HasColumnType("uuid");

                    b.HasKey("JudgeId");

                    b.HasIndex("Program_id");

                    b.HasIndex("user_id");

                    b.ToTable("ResponseModels");
                });

            modelBuilder.Entity("MicroCode.models.UserModel", b =>
                {
                    b.Property<Guid>("user_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("first_name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("last_name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("password_hash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("phone_no")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("registration_data")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("user_id");

                    b.ToTable("UserModel");
                });

            modelBuilder.Entity("MicroCode.models.CodeModel", b =>
                {
                    b.HasOne("MicroCode.models.ProgramModel", "ProgramModel")
                        .WithOne("CodeModel")
                        .HasForeignKey("MicroCode.models.CodeModel", "program_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ProgramModel");
                });

            modelBuilder.Entity("MicroCode.models.ProgramModel", b =>
                {
                    b.HasOne("MicroCode.models.UserModel", "UserModel")
                        .WithMany("ProgramModels")
                        .HasForeignKey("user_id");

                    b.Navigation("UserModel");
                });

            modelBuilder.Entity("MicroCode.models.ResponseModel", b =>
                {
                    b.HasOne("MicroCode.models.ProgramModel", "ProgramModel")
                        .WithMany("ResponseModels")
                        .HasForeignKey("Program_id");

                    b.HasOne("MicroCode.models.UserModel", "UserModel")
                        .WithMany("ResponseModels")
                        .HasForeignKey("user_id");

                    b.Navigation("ProgramModel");

                    b.Navigation("UserModel");
                });

            modelBuilder.Entity("MicroCode.models.ProgramModel", b =>
                {
                    b.Navigation("CodeModel")
                        .IsRequired();

                    b.Navigation("ResponseModels");
                });

            modelBuilder.Entity("MicroCode.models.UserModel", b =>
                {
                    b.Navigation("ProgramModels");

                    b.Navigation("ResponseModels");
                });
#pragma warning restore 612, 618
        }
    }
}
