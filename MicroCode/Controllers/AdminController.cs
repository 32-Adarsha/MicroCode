using System.IdentityModel.Tokens.Jwt;
using MicroCode.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace MicroCode.Controllers;

[ApiController]
public class AdminController : ControllerBase
{
    private readonly IAdminRepository _adminRepository;
   public AdminController(IAdminRepository adminRepository){
        _adminRepository = adminRepository;
   }
   
   [Route("/admin/problems")]
   [HttpGet]
   [AllowAnonymous]

    public async Task<IActionResult> getProblems(int pageIndex = 1, int pageSize = 10){
        var problems = await _adminRepository.GetProblems(pageIndex, pageSize);
        return Ok(problems);
    }

    [Route("/admin/getAllUser")]
    [HttpGet]
    [AllowAnonymous]
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
    [AllowAnonymous]
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
    [AllowAnonymous]
    public async Task<IActionResult> getProblemById([FromHeader] string id) {
        try { 
            var problem = await _adminRepository.GetProblemById(new Guid(id));
            return Ok(problem);
        } catch (Exception e){
            return BadRequest(e.Message);
        }
        
    }



    




}