﻿using System;
using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<Comment> Comments { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); //gives appuser a primary key
            builder.Entity<Value>()
            .HasData(
                new Value { Id = 1, Name = "Value 101" },
                new Value { Id = 2, Name = "Value 102" },
                new Value { Id = 3, Name = "Value 103" },
                new Value { Id = 4, Name = "Value 104" }
            );

            builder.Entity<UserActivity>(x => x.HasKey(ua =>
              new { ua.AppUserId, ua.ActivityId }));

            builder.Entity<AppUser>()
            .HasMany(x => x.UserActivities)
            .WithOne(x => x.AppUSer)
            .HasForeignKey(x => x.AppUserId);

            builder.Entity<Activity>()
           .HasMany(x => x.UserActivities)
           .WithOne(x => x.Activity)
           .HasForeignKey(x => x.ActivityId);
        }

    }

}
