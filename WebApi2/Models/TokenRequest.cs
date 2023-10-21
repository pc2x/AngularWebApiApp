namespace WebApiNetCore2023.Models
{
    public class TokenRequest
    {
        /*flujo de Resource Owner Password Credentials" (ROPC) */
        public string? Grant_Type { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Client_Id { get; set; }
        public string? Client_Secret { get; set; }

        /*
        flujo de "Client Credentials
        solo valida las credenciales del cliente
        public string? Grant_Type { get; set; }
        public string? Client_Id { get; set; }
        public string? Client_Secret { get; set; }
        */
    }
}
