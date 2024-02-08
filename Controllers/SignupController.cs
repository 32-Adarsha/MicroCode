using System.Reflection.Metadata.Ecma335;
using MicroCode.Data;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace MicroCode.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SignUpController : ControllerBase
{
   private readonly MicroCodeContext dbContext;

   public SignUpController(MicroCodeContext dbContext){
        this.dbContext = dbContext;
   }

   [HttpPost]
   [AllowAnonymous]
    public async Task<IActionResult> AddUser ([FromBody] ProfileModel profile){
        string salt = BCrypt.Net.BCrypt.GenerateSalt(12);
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(profile.password, salt);
        var newUser = new UserModel {
            user_id = Guid.NewGuid(),
            username = profile.username,
            first_name = profile.first_name,
            last_name = profile.last_name,
            phone_no = profile.phone_no,
            eamil = profile.eamil,
            password_hash = hashedPassword,
            registration_data = DateTime.UtcNow,
        };

        await dbContext.UserModel.AddAsync(newUser);
        await dbContext.SaveChangesAsync();
        return Ok(newUser);
    }
}
