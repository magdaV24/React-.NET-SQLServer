using Azure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using server.DTOs;
using server.Models;
using server.Utils;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly QuizAppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<UserRole> _roleManager;
        private readonly TokenService _tokenService;

        public UsersController(QuizAppDbContext context, UserManager<User> userManager, RoleManager<UserRole> roleManager, TokenService tokenService)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
        }


        // GET: api/Users/username
        // Login
        [HttpPost("login")]
        [EnableCors("WithoutAuthorization")]
        public async Task<ActionResult<TokenDTO>> Login(LoginDTO loginDTO)
        {
            try
            {
                var user = await _context.Users.Where(u => u.UserName == loginDTO.Username).FirstOrDefaultAsync();

                if (user == null)
                {
                    return BadRequest("Incorrect username!");
                }
                var checkPassword = VerifyPassword(loginDTO.Password, user.PasswordHash);
                if (!checkPassword)
                {
                    return BadRequest("The password is not correct!");

                };

                user.RememberMe = loginDTO.RememberMe;
                var token = _tokenService.GenerateToken(user);

                return new TokenDTO
                {
                    Token = token,
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>
        /// The function recieves the register information from the user (username, password, email, avatar) and returns
        /// a token that contains the user information
        /// </summary>
        /// <param name="registerDTO"></param>
        /// <returns></returns>
        [HttpPost("register")]
        [EnableCors("WithoutAuthorization")]
        public async Task<ActionResult<TokenDTO>> Register(RegisterDTO registerDTO)
        {
            var user = new User { UserName = registerDTO.Username, Email = registerDTO.Email, Avatar = registerDTO.Avatar };
            var password = registerDTO.Password;

            var hashedPassword = HashPassword(password);

            user.PasswordHash = hashedPassword;

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
            }

            var role = await _roleManager.FindByNameAsync("Admin");

            if (role == null)
            {
                var roleResult = await _roleManager.CreateAsync(new UserRole { Name = "Admin" });

                if (!roleResult.Succeeded)
                {
                    return BadRequest(roleResult.Errors);
                }
            }
            var addRole = await _userManager.AddToRoleAsync(user, "Admin");

            if (!addRole.Succeeded)
            {
                return BadRequest(addRole.Errors);
            }

            var newUser = await _userManager.FindByNameAsync(registerDTO.Username);
            newUser.RememberMe = false;
            var token = _tokenService.GenerateToken(newUser);
            return new TokenDTO
            {
                Token = token
            };
        }

        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private static string HashPassword(string password)
        {
            if(password == null)
            {
                throw new Exception("The provide password is null!");
            }
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
        /// <summary>
        /// Functions to verify if the password provided during the log in process and the user's hashed password
        /// stored in the database match.
        /// </summary>
        /// <param name="password">The password provided by the user trying to log in</param>
        /// <param name="hashedPassword">The hash corresponding to the account.</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        private static bool VerifyPassword(string password, string hashedPassword)
        {
            if (password == null || hashedPassword == null)
            {
                throw new Exception("The password or the hashed password is null!");
            }
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}
