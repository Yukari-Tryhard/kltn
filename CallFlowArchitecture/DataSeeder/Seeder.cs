using CallFlowApplication.Entities;
using CallFlowArchitecture.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowArchitecture.DataSeeder
{
    public class Seeder
    {
        public static void SeedData(KLTNContext context)
        {
            // Ensure the database is created
            context.Database.EnsureCreated();

            // Check if there's already data in the database
            if (context.Companies.Any() || context.Trunks.Any() || context.Settings.Any())
            {
                return; // Data is already seeded
            }

            // Seed sample data
            var companies = new List<Company>
        {
            new Company
            {
                Name = "Company 1",
                Address = "Address 1",
                CallFlowUsers = new List<CallFlowUser>
                {
                    new CallFlowUser
                    {
                        Email = "admin@callflow.com",
                        HasedPassword = "Hello@123",
                        isActive = true,
                        UserName = "admin",
                        PersonalInfo = new PersonalInfo
                        {
                            PhoneNumber = "089999123",
                            Address = "123 Dang Van Bi",
                            DateOfBirth = DateTime.Parse("23/4/2002").Date,
                            Gender = "Male",
                            FirstName = "Admin",
                            MiddleName = "Super",
                            LastName = "Jr"
                        }
                        // Set other user properties
                    }
                },
                Trunk = new Trunk
                {
                    Name = "Trunk 1",
                    Provider = "FPT",
                    Status = "Online",
                    IsActive = true,
                }
            }
        };

            var settings = new Setting
            {
                IsLocal = true,
                AsteriskServerUrl = "localhost",
                AsteriskServerPort = "5060",
                AsteriskServerUsername = "username",
                AsteriskServerPassword = "password",
            };

            context.Companies.AddRange(companies);
            context.Settings.Add(settings);

            context.SaveChanges();
        }
    }
}
