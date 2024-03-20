using System.CodeDom.Compiler;
using System.IdentityModel.Tokens.Jwt;
using System.Numerics;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography.X509Certificates;
using System.Text.RegularExpressions;
using MicroCode.Data;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Tree;
using Microsoft.EntityFrameworkCore;

namespace MicroCode.Controllers;

[ApiController]

public class SignUpController : ControllerBase
{
    private readonly MicroCodeContext dbContext;
    private Regex emailregex = new Regex("(?<user>[^@]+)@(?<host>.+)");
    private Regex passwordRegex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$");
    private Regex phoneRegex = new Regex(@"^\d{10,}$");
    private Regex notBlank = new Regex(@"^[a-zA-Z]+$");

    public SignUpController(MicroCodeContext dbContext)
    {
        this.dbContext = dbContext;
    }

    // All Validation Function
    //This function Validate Email
    private ErrCode CheckEmail(string thisEmail)
    {
        if (!emailregex.Match(thisEmail).Success)
        {
            return new ErrCode
            {
                HasError = true,
                ErrorMessage = "Invalid Email"
            };
        }
        else if (dbContext.UserModel.Any(o => o.email == thisEmail))
        {
            return new ErrCode
            {
                HasError = true,
                ErrorMessage = "Email address already in use"
            };
        }
        return new ErrCode
        {
            HasError = false,
            ErrorMessage = "Valid Email"
        };

    }
    // This Function Validate password
    private ErrCode CheckPassword(string thisPassword)
    {
        if (!passwordRegex.Match(thisPassword).Success)
        {
            return new ErrCode
            {
                HasError = true,
                ErrorMessage = "Please Set Strong Password"
            };
        };

        return new ErrCode
        {
            HasError = false,
            ErrorMessage = "Password Valid"
        };



        }
    // This Function Validate Phone Number
    private ErrCode CheckPhoneNo(string thisPhone)
    {
        if (!phoneRegex.Match(thisPhone).Success)
        {
            return new ErrCode
            {
                HasError = true,
                ErrorMessage = "Phone Number should be digit and should be of length 10 character"
            };
        }

        return new ErrCode
        {
            HasError = false,
            ErrorMessage = "Phone Number Is Valid"
        };
    }
    // This Function Validate Username
    private ErrCode CheckUserName(string thisUserName)
    {
        if (dbContext.UserModel.Any(o => o.username == thisUserName))
        {
            return new ErrCode
            {
                HasError = true,
                ErrorMessage = "Username Already Exist"
            };
        }
        return new ErrCode
        {
            HasError = false,
            ErrorMessage = "Username is Valid"
        };
    }

    private ErrCode CheckName (string thisName){
        if (notBlank.Match(thisName).Success){
            return new ErrCode {
                HasError = false,
                ErrorMessage = "Valid Name"
            };
           
        }
         return new ErrCode {
                HasError = true,
                ErrorMessage = "InValid Name"
            };
    }
    private ErrorModel ValidateUser(ProfileModel ThisPerson)
    {

        return new ErrorModel
        {
            username = CheckUserName(ThisPerson.username),
            email = CheckEmail(ThisPerson.email),
            password = CheckPassword(ThisPerson.password),
            phone_no = CheckPhoneNo(ThisPerson.phone_no),
            first_name = CheckName(ThisPerson.first_name),
            last_name = CheckName(ThisPerson.last_name)
            
        };
    }

    [Route("/signup")]
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> AddUser([FromBody] ProfileModel profile)
    {
        if (CheckUserName(profile.username).HasError || CheckEmail(profile.email).HasError){
            ErrCode [] message = {CheckUserName(profile.username) , CheckEmail(profile.email)};
            return BadRequest(message);
        }
        string salt = BCrypt.Net.BCrypt.GenerateSalt(12);
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(profile.password, salt);
        var newUser = new UserModel
        {
            user_id = Guid.NewGuid(),
            username = profile.username,
            first_name = profile.first_name,
            last_name = profile.last_name,
            phone_no = profile.phone_no,
            email = profile.email,
            password_hash = hashedPassword,
            registration_data = DateTime.UtcNow,
        };

        await dbContext.UserModel.AddAsync(newUser);
        await dbContext.SaveChangesAsync();
        return Ok(newUser);
    }

    [Route("/exist")]
    [HttpPost]
    [AllowAnonymous]
    public IActionResult AddUserExist([FromBody] ExistModel Obj )
    {
        if (Obj.what == "username"){
            return Ok(CheckUserName(Obj.value));
        }else if (Obj.what == "email") {
            return Ok(CheckEmail(Obj.value));
        }else {
            return BadRequest();
        }
    }

    [Route("/editprofile")]
    [HttpPost]
    [Authorize]
    public IActionResult EditProfile([FromBody] ExistModel Obj )
    {
        var thisUser = HttpContext.User;
        if (thisUser?.Claims != null)
        {
            foreach (var claim in thisUser.Claims)
            {
                if (claim.Type == JwtRegisteredClaimNames.Sid)
                {
                    var user = dbContext.UserModel.FirstOrDefault(u => u.user_id == new Guid(claim.Value));
                    var profileUser = new EditProfileModel {
                        username = user.username,
                        first_name = user.first_name,
                        last_name = user.last_name,
                        phone_no = user.phone_no
                    };
                    return Ok(profileUser);
                };
            };
        };
    return Unauthorized();
    }
}
