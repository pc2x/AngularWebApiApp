using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApiNetCore2023.Models;

namespace WebApiNetCore2023.Controllers
{
    [Route("oauth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AuthController(UserManager<IdentityUser> userManager)
        {
                _userManager = userManager;
        }

        [HttpPost("token")]
        [Consumes("application/x-www-form-urlencoded")]
        public async Task<IActionResult> Token([FromForm] TokenRequest request)
        {
            if (request is null)
            {
                return BadRequest();
            }

            if(request.Grant_Type != "password")
            {
                return BadRequest("invalid grant type");
            }

            if (string.IsNullOrWhiteSpace(request.Client_Id) || string.IsNullOrWhiteSpace(request.Client_Secret))
            {
                return BadRequest("missing client credentials");
            }

            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("missing user credentials");
            }

            // Validación de las credenciales de cliente
            if (!ValidateClientCredentials(request.Client_Id, request.Client_Secret))
            {
                return Unauthorized("Credenciales de cliente no válidas.");
            }

            // Validación de las credenciales del usuario
            //var user = await _userManager.FindByLoginAsync(request.Username, request.Password);
            var user = await _userManager.FindByNameAsync(request.Username);
            
            if(user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
                return Unauthorized("Credenciales de usuario no válidas.");

            //setea los claims que viajaran en el token
            var tokenClaims = new[]
            {
                //sub identifica el sujeto del token
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim("authentication_method", "ROPC"),
                new Claim("username", user.UserName)
            };

            // Aquí se utiliza la llave del issuer para firmar el token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ENV_VARS.Jwt_Key));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                ENV_VARS.Jwt_Issuer, //(Issuer)
                ENV_VARS.Jwt_Audience, //(Audience)
                tokenClaims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        }

        private bool ValidateClientCredentials(string client_Id, string client_Secret)
        {
            return true;
        }
    }
}
