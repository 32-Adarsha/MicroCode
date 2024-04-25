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
        [Route("/api/Auth")]
        public IActionResult Auth([FromBody] LoginModel person)
        {
            IActionResult response = Unauthorized();
            try
            {
                var user = dbContext.UserModel.FirstOrDefault(u => u.email == person.Email);

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

                        var claims = new List<Claim>{
                        new Claim(JwtRegisteredClaimNames.Sub, user.username),
                        new Claim(JwtRegisteredClaimNames.Email, user.email),
                        new Claim(JwtRegisteredClaimNames.Sid, user.user_id.ToString()),
                    };

                        if (user.roles != null)
                        {
                            foreach (var role in user.roles)
                            {
                                claims.Add(new Claim(ClaimTypes.Role, role));
                            }
                        }

                        var expires = DateTime.UtcNow.AddMinutes(10);

                        var tokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new ClaimsIdentity(claims),
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
                    else
                    {
                        return Unauthorized();
                    }
                }
            } catch(Exception e) {
                return Unauthorized(e.Message);
            }

            return response;
        }


        [Authorize]
        [HttpGet]
        [Route("/isLoggedIn")]
        public IActionResult IsLoggedIn()
        {
            return Ok("User Is Logged In");
        }

        [Authorize]
        [HttpPost]
        [Route("/api/Logout")] 
        public IActionResult Logout()
        {
            Response.Cookies.Delete("Token");
            return Ok("Logged out successfully");
        }

    }
}