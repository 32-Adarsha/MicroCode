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
    private readonly IExamRepository _Exam;
    public HomeController(MicroCodeContext dbcontext,IExamRepository Exam)
    {
        _Exam = Exam;
        this.dbcontext = dbcontext;
    }

    [Route("/getProblem")]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> getProblem()
    {
        try
        {
            var problems = dbcontext.ProgramModel.Where(p => p.isPublic == true && p.verified == true).ToList();
            return Ok(problems);
        } 
        catch
        {
            return NotFound("Requested content is unavailable");
        }
        
    }



    [Route("/getInfo")]
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult getSiteStats()
    {
        int total_users = dbcontext.UserModel.Count();
        int total_problems = dbcontext.ProgramModel.Count(p=>p.isPublic && p.verified);
        int total_exam = dbcontext.ExamModel.Count();


            var stats = new
            {
                total_users = total_users,
                total_problems = total_problems
            };

        return Ok(stats);
    }


    [Route("/getAllExam")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> getAllExam() {
        try {
            var allExam = await _Exam.GetAllExamAsync();
        return Ok(allExam);
        } catch(Exception e){
            return BadRequest(e.Message);
        }
    }


    [Route("/getCreatedExams")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> getCreatedExam() {
        var userIdClaim = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid);
        try {
            var allExam = await _Exam.getCreatedExam(userIdClaim.Value);
            return Ok(allExam);
        } catch(Exception e){
            return BadRequest(e.Message);
        }
    }



}
