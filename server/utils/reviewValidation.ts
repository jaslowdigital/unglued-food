export function containsLinksOrCode(text: string): boolean {
  if (!text || text.trim().length === 0) {
    return false;
  }

  const textLower = text.toLowerCase();

  // Check for URLs and links
  const urlPatterns = [
    /https?:\/\//i,                    // http:// or https://
    /www\./i,                          // www.
    /\.(com|org|net|edu|gov|io|co|uk|ca|de|fr|jp|au|ru|br|cn|in|nl|se|no|es|it|pl|be|ch|at|dk|fi|pt|gr|cz|ro|hu|nz|za|sg|hk|tw|kr|mx|ar|cl|pe|ve|ua|ie|il|ae|sa|pk|bd|ng|eg|ke|tn|ma|gh|ug|et|dz|ao|cd|cm|ci|mg|mw|ml|mr|ne|sd|sn|so|td|zw)\b/i, // Common TLDs
    /bit\.ly|tinyurl|goo\.gl|t\.co/i,  // URL shorteners
  ];

  // Check for code patterns
  const codePatterns = [
    /<[^>]+>/,                         // HTML tags
    /<script|<style|<iframe/i,         // Dangerous HTML tags
    /\{[^}]*\}/,                       // Curly braces (common in code)
    /function\s*\(/i,                  // Function declarations
    /\bvar\s+\w+/i,                    // var declarations
    /\bconst\s+\w+/i,                  // const declarations
    /\blet\s+\w+/i,                    // let declarations
    /=>\s*\{/,                         // Arrow functions
    /```/,                             // Code blocks
    /`[^`]+`/,                         // Backtick code
    /;\s*$/m,                          // Statements ending with semicolon
    /import\s+.*from/i,                // Import statements
    /export\s+(default|const|function)/i, // Export statements
  ];

  // Check all patterns
  for (const pattern of urlPatterns) {
    if (pattern.test(text)) {
      return true;
    }
  }

  for (const pattern of codePatterns) {
    if (pattern.test(text)) {
      return true;
    }
  }

  return false;
}
