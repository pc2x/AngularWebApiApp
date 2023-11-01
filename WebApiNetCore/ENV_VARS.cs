namespace WebApiNetCore2023
{
    public static class ENV_VARS
    {
        public static readonly string Jwt_Issuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? new Guid().ToString();
        public static readonly string Jwt_Key = Environment.GetEnvironmentVariable("JWT_KEY")?? new Guid().ToString();
        public static readonly string Jwt_Audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? new Guid().ToString();
        public static readonly string ConnectionString = Environment.GetEnvironmentVariable("DefaultConnection")??"";
        public static readonly string AdminUser = Environment.GetEnvironmentVariable("AdminUser") ?? "Admin";
        public static readonly string AdminPass = Environment.GetEnvironmentVariable("AdminPass") ?? "Adminis09.";
        public static readonly string AdminEmail = Environment.GetEnvironmentVariable("AdminEmail") ?? "alberto_ville@hotmail.com";
        public static readonly string LogsPath = Environment.GetEnvironmentVariable("LogsPath") ?? "logs";
        public const string AntiforgeryTokenName = "RequestVerificationToken";
        public const string AntiforgeryCookieName = "AspNetCore.Antiforgery";
        public static string LogDirectory = "";
    }
}
