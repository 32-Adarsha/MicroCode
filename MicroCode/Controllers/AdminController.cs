using System.IdentityModel.Tokens.Jwt;
using MicroCode.Data;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace MicroCode.Controllers;

[ApiController]
public class AdminController : ControllerBase
{
    private readonly IAdminRepository _adminRepository;
    private readonly MicroCodeContext _context;
   public AdminController(IAdminRepository adminRepository , MicroCodeContext context){
        _adminRepository = adminRepository;
        _context = context;
   }
   
   [Route("/admin/problems")]
   [HttpGet]
   [Authorize(Roles ="Admin")]

    public async Task<IActionResult> getProblems(int pageIndex = 1, int pageSize = 10){
        var problems = await _adminRepository.GetProblems(pageIndex, pageSize);
        return Ok(problems);
    }

    [Route("/admin/getAllUser")]
    [HttpGet]
    [Authorize(Roles ="Admin")]
    public async Task<IActionResult> getUsers(int pageIndex = 1, int pageSize = 10) {
        try { 
            var users = await _adminRepository.GetUsers(pageIndex, pageSize);
            return Ok(users);
        } catch (Exception e){
            return BadRequest(e.Message);
        }
        
    }

    [Route("/admin/getUser")]
    [HttpGet]
    [Authorize(Roles ="Admin")]
    public async Task<IActionResult> getUser([FromHeader] string id) {
        try { 
            var user = await _adminRepository.getUser(new Guid(id));
            return Ok(user);
        } catch (Exception e){
            return BadRequest(e.Message);
        }
        
    }


    [Route("/admin/getProblemById")]
    [HttpGet]
    [Authorize(Roles ="Admin")]
    public async Task<IActionResult> getProblemById([FromHeader] string id) {
        try { 
            var problem = await _adminRepository.GetProblemById(new Guid(id));
            return Ok(problem);
        } catch (Exception e){
            return BadRequest(e.Message);
        }
        
    }


    [Route("/admin/getExamByID")]
    [HttpGet]
    [Authorize(Roles ="Admin")]

    public async Task<IActionResult> getExamByID([FromHeader] string examID){
        try {
            var exam = await _adminRepository.GetExamById(new Guid(examID));
            List<aProblemModel> e = [];
            if (exam != null) {
                foreach (var m in exam.allProblems){
                    e.Add(await _adminRepository.GetProblemsForSide(new Guid(m.problemId)));
                }
            }
            return Ok(new {
                exam = exam,
                allProblem = e,
            });
        } catch (Exception e){
            return BadRequest(e);
        }
    }


    [Route("/admin/getStat")]
    [HttpGet]
    [Authorize(Roles ="Admin")]
    public async Task<IActionResult> getSiteStat(){
        var coutUsers = _context.UserModel.Count();
        var coutProblem = _context.ProgramModel.Count();
        var coutExam = _context.ExamModel.Count();


        return Ok(new
        {
            users = coutUsers,
            problems = coutProblem,
            exam = coutExam,
        });
    }




    




}