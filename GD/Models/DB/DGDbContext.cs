using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace GD.Models.DB;

public partial class DGDbContext : DbContext
{
    public DGDbContext()
    {
    }

    public DGDbContext(DbContextOptions<DGDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Area> Areas { get; set; }

    public virtual DbSet<Documento> Documentos { get; set; }

    public virtual DbSet<EstadoDocumento> EstadoDocumentos { get; set; }

    public virtual DbSet<HistorialDocumento> HistorialDocumentos { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<Sede> Sedes { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Area>(entity =>
        {
            entity.HasKey(e => e.AreaId).HasName("PRIMARY");

            entity.ToTable("Area");

            entity.HasIndex(e => e.Codigo, "Codigo").IsUnique();

            entity.HasIndex(e => e.SedeId, "SedeId");

            entity.Property(e => e.Codigo).HasMaxLength(50);
            entity.Property(e => e.Nombre).HasMaxLength(100);

            entity.HasOne(d => d.Sede).WithMany(p => p.Areas)
                .HasForeignKey(d => d.SedeId)
                .HasConstraintName("Area_ibfk_1");
        });

        modelBuilder.Entity<Documento>(entity =>
        {
            entity.HasKey(e => e.DocumentoId).HasName("PRIMARY");

            entity.ToTable("Documento");

            entity.HasIndex(e => e.AreaActualId, "AreaActualId");

            entity.HasIndex(e => e.EstadoActualId, "EstadoActualId");

            entity.HasIndex(e => e.UsuarioId, "UsuarioId");

            entity.Property(e => e.FechaAceptado).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");
            entity.Property(e => e.Nombre).HasMaxLength(255);
            entity.Property(e => e.Src).HasMaxLength(255);
            entity.Property(e => e.Tipo).HasMaxLength(100);

            entity.HasOne(d => d.AreaActual).WithMany(p => p.Documentos)
                .HasForeignKey(d => d.AreaActualId)
                .HasConstraintName("Documento_ibfk_3");

            entity.HasOne(d => d.EstadoActual).WithMany(p => p.Documentos)
                .HasForeignKey(d => d.EstadoActualId)
                .HasConstraintName("Documento_ibfk_2");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Documentos)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("Documento_ibfk_1");


            entity.HasOne(d => d.UsuarioRadicador).WithMany(p => p.DocumentosRadicados)
                .HasForeignKey(d => d.UsuarioRadicadorId)
                .HasConstraintName("Documento_ibfk_4");

        });

        modelBuilder.Entity<EstadoDocumento>(entity =>
        {
            entity.HasKey(e => e.EstadoId).HasName("PRIMARY");

            entity.ToTable("EstadoDocumento");

            entity.HasIndex(e => e.Nombre, "Nombre").IsUnique();

            entity.Property(e => e.Nombre).HasMaxLength(50);
        });

        modelBuilder.Entity<HistorialDocumento>(entity =>
        {
            entity.HasKey(e => e.HistorialId).HasName("PRIMARY");

            entity.ToTable("HistorialDocumento");

            entity.HasIndex(e => e.DocumentoId, "DocumentoId");

            entity.HasIndex(e => e.EstadoId, "EstadoId");

            entity.HasIndex(e => e.UsuarioId, "UsuarioId");

            entity.Property(e => e.FechaCambio)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Documento).WithMany(p => p.HistorialDocumentos)
                .HasForeignKey(d => d.DocumentoId)
                .HasConstraintName("HistorialDocumento_ibfk_1");

            entity.HasOne(d => d.Estado).WithMany(p => p.HistorialDocumentos)
                .HasForeignKey(d => d.EstadoId)
                .HasConstraintName("HistorialDocumento_ibfk_2");

            entity.HasOne(d => d.Usuario).WithMany(p => p.HistorialDocumentos)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("HistorialDocumento_ibfk_3");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.RolId).HasName("PRIMARY");

            entity.ToTable("Rol");

            entity.HasIndex(e => e.Nombre, "Nombre").IsUnique();

            entity.Property(e => e.Nombre).HasMaxLength(50);
        });

        modelBuilder.Entity<Sede>(entity =>
        {
            entity.HasKey(e => e.SedeId).HasName("PRIMARY");

            entity.ToTable("Sede");

            entity.Property(e => e.Ciudad).HasMaxLength(100);
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuarioId).HasName("PRIMARY");

            entity.ToTable("Usuario");

            entity.HasIndex(e => e.AreaId, "AreaId");

            entity.HasIndex(e => e.RolId, "RolId");

            entity.HasIndex(e => e.User, "Usuario").IsUnique();

            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(100);
            entity.Property(e => e.User)
                .HasMaxLength(50)
                .HasColumnName("Usuario");

            entity.HasOne(d => d.Area).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.AreaId)
                .HasConstraintName("Usuario_ibfk_2");

            entity.HasOne(d => d.Rol).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.RolId)
                .HasConstraintName("Usuario_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
