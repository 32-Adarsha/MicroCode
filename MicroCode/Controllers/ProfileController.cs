using System.IdentityModel.Tokens.Jwt;
using System.Numerics;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text.RegularExpressions;
using MicroCode.Data;
using MicroCode.Dependency;
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

public class ProfileController : ControllerBase
{
   private readonly MicroCodeContext _cntx;
   public ProfileController(MicroCodeContext cntx){
        this._cntx = cntx;
   }
   
   [Route("/getDetail")]
   [HttpPost]
   [Authorize]
    public async Task<IActionResult> getDetail()
{
    var id =  HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid).Value;
    var user = _cntx.UserModel
            .Where(u => u.user_id == new Guid(id))
            .Select(u => new 
            {
                u.first_name,
                u.last_name,
                u.phone_no,
                u.username,
                u.email
            })
            .FirstOrDefault();

    var problems =  _cntx.CodeSubmissions
            .Where(x => x.user_id == new Guid(id))
            .Select(u => new {
                u.Program_id,
                u.codeStatus,
                u.JudgeId,
                u.CompletedDate,
                u.language
            }).ToList();

    var result = new { user, problems };

    return Ok(result);
}




}
