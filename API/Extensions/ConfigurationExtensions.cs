using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Configuration;

namespace API.Extensions;

public static class ConfigurationExtensions
{
    public static int GetMaxRollingFiles(this IConfiguration config)
    {
        return int.Parse(config.GetSection("Logging").GetSection("File").GetSection("MaxRollingFiles").Value);
    }
    public static string GetLoggingFileName(this IConfiguration config)
    {
        return config.GetSection("Logging").GetSection("File").GetSection("Path").Value;
    }
    public static Regex[] GetVolumeRegex(this IConfiguration config)
    {
        var arr = config.GetSection("VolumeRegex").Get<string[]>();
        if (arr != null)
        {
            return arr
                .Select(str => new Regex(str, Services.Tasks.Scanner.Parser.Parser.MatchOptions, Services.Tasks.Scanner.Parser.Parser.RegexTimeout))
                .ToArray();
        }
        return new Regex[0];
    }
    public static Regex[] GetSeriesRegex(this IConfiguration config)
    {
        var arr = config.GetSection("SeriesRegex").Get<string[]>();
        if (arr != null)
        {
            return arr
                .Select(str => new Regex(str, Services.Tasks.Scanner.Parser.Parser.MatchOptions, Services.Tasks.Scanner.Parser.Parser.RegexTimeout))
                .ToArray();
        }
        return new Regex[0];
    }
}
