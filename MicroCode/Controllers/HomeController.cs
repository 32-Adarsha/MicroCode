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

public class HomeController : ControllerBase
{
    private readonly MicroCodeContext dbcontext;
    public HomeController(MicroCodeContext dbcontext)
    {
        this.dbcontext = dbcontext;
    }

    [Route("/getProblem")]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> getProblem()
    {
        var problems = dbcontext.ProgramModel.Where(p => p.isPublic == true && p.verified == true).ToList();


        return Ok(problems);
    }
    [Route("/getsitestats")]
    [HttpPost]
    [Authorize]
    public IActionResult getSiteStats()
    {
        int total_users = dbcontext.UserModel.Count();
        int total_problems = dbcontext.ProgramModel.Count(p=>p.isPublic && p.verified);


            var stats = new
            {
                total_users = total_users,
                total_problems = total_problems
            };

        return Ok(stats);
    }




}
