using System.Reflection.Metadata.Ecma335;
using MicroCode.Data;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace MicroCode.Controllers;

[ApiController]
[Route("[controller]")]
public class SignUpController : ControllerBase
{
   private readonly MicroCodeContext dbContext;

   public SignUpController(MicroCodeContext dbContext){
        this.dbContext = dbContext;
   }

   [HttpPost(Name ="signup")]
   [AllowAnonymous]
    public async Task<IActionResult> addUser ([FromBody] ProfileModel user){
        string salt = BCrypt.Net.BCrypt.GenerateSalt(12);
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.password, salt);
        var newUser = new UserModel {
            user_id = Guid.NewGuid(),
            username = user.username,
            first_name = user.first_name,
            last_name = user.last_name,
            phone_no = user.phone_no,
            eamil = user.eamil,
            password_hash = hashedPassword,
            registration_data = DateTime.Now,
        };

        await dbContext.UserModel.AddAsync(newUser);
        await dbContext.SaveChangesAsync();
        return Ok(newUser);
    }
}
