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

    public async Task<IActionResult> getProblems(int pageIndex = 1, int pageSize = 10){
        var problems = await _adminRepository.GetProblems(pageIndex, pageSize);
        return Ok(problems);

    }



    




}