namespace WebApiNetCore2023.Logger
{
    public class FileLogger : ILogger
    {
        private string logDirectory;
        private LogLevel logLevel;
        private readonly string _categoryName;

        public FileLogger(string directory, LogLevel level, string categoryName)
        {
            logDirectory = directory;
            logLevel = level;
            var dir = Directory.CreateDirectory(logDirectory);
            ENV_VARS.LogDirectory = dir.FullName;
            _categoryName = categoryName;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return logLevel >= this.logLevel;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            if (!IsEnabled(logLevel))
            {
                return;
            }
            var level = GetLogLevelText(logLevel);
            var logPath = Path.Combine(logDirectory, $"{level}_{_categoryName}_{DateTime.Now:yyyy-MM-dd-HHmmss-fff}.log");
            var exceptionMsg = "";
            if (exception != null)
            {
                exceptionMsg = "Exception:" +exception.Message;
                if (exception.InnerException != null)
                    exceptionMsg += Environment.NewLine + "InnerEx:" + exception.InnerException.Message;
            }

            using (var writer = new StreamWriter(logPath, true))
            {
                writer.WriteLine($"[{logLevel}] {formatter(state, exception!)} {Environment.NewLine}{exceptionMsg}");
            }
        }

        private string GetLogLevelText(LogLevel level)
        {
            switch (level)
            {
                case LogLevel.Trace:
                    return "Trace";
                case LogLevel.Debug:
                    return "Debug";
                case LogLevel.Information:
                    return "Information";
                case LogLevel.Warning:
                    return "Warning";
                case LogLevel.Error:
                    return "Error";
                case LogLevel.Critical:
                    return "Critical";
                case LogLevel.None:
                    return "None";
                default:
                    return "Unknown";
            }
        }

    }
}

