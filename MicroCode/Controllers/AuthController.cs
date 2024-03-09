using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MicroCode.models;
using MicroCode.Data;
using BCrypt.Net;
using Microsoft.VisualBasic;


namespace CustomJwtAuth.Controller
{


    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IConfiguration configuration;
        private readonly MicroCodeContext dbContext;
        public AuthController(IConfiguration configuration, MicroCodeContext dbContext)
        {
            this.configuration = configuration;
            this.dbContext = dbContext;
        }


        [AllowAnonymous]
        [HttpPost]
        public IActionResult Auth([FromBody] LoginModel person)
        {
            IActionResult response = Unauthorized();
            var user = dbContext.UserModel.FirstOrDefault(u => u.eamil == person.Email);

            if (user != null)
            {
                bool verify = BCrypt.Net.BCrypt.Verify(person.Password, user.password_hash, false, hashType: HashType.SHA512);

                if (verify)
                {
                    // Create the JWT token
                    var issuer = configuration["Jwt:Issuer"];
                    var audience = configuration["Jwt:Audience"];
                    var key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
                    var signingCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha512Signature
                    );

                    var subject = new ClaimsIdentity(new[]
                    {
                new Claim(JwtRegisteredClaimNames.Sub, user.username),
                new Claim(JwtRegisteredClaimNames.Email, user.eamil),
                new Claim(JwtRegisteredClaimNames.Sid, user.user_id.ToString()),
            });

                    var expires = DateTime.UtcNow.AddMinutes(10);

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = subject,
                        Expires = expires,
                        Issuer = issuer,
                        Audience = audience,
                        SigningCredentials = signingCredentials
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    var jwtToken = tokenHandler.WriteToken(token);

                    
                    var cookieOptions = new CookieOptions
                    {
                        HttpOnly = true,
                        SameSite = SameSiteMode.Strict, 
                    };

                    
                    Response.Cookies.Append("Token", jwtToken, cookieOptions);

                    return Ok();
                }
            }

            return response;
        }


    }
}