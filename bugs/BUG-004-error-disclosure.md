# BUG-004: Generic Error Handling May Leak Sensitive Information

## Severity: Medium
## Category: Security - Information Disclosure  
## Files: All task implementations (src/tasks/*/index.ts)
## Lines: catch blocks (various)

### Description:
All tasks use a generic error handling pattern that passes the complete error object to `tl.setResult()`, potentially exposing sensitive information in error messages.

### Code Pattern:
```typescript
})().catch(error => {
  tl.setResult(tl.TaskResult.Failed, error);
});
```

### Security Impact:
- Full error objects may contain sensitive data (credentials, internal paths, system info)
- Stack traces could reveal internal system architecture
- Database connection strings or API endpoints might be exposed
- Debugging information could aid attackers in reconnaissance

### Examples of Potential Information Leakage:
1. **Authentication Errors**: May contain partial credentials or authentication URLs
2. **File System Errors**: Could reveal internal directory structures
3. **Network Errors**: Might expose internal hostnames or IP addresses
4. **API Errors**: Could contain sensitive API endpoints or tokens

### Recommendations:
1. **Error Sanitization**: Create a function to sanitize error messages before logging
2. **Generic Error Messages**: Provide user-friendly error messages without sensitive details  
3. **Separate Logging**: Log detailed errors securely while showing generic messages to users
4. **Error Classification**: Categorize errors and handle each type appropriately

### Example Secure Implementation:
```typescript
function sanitizeError(error: any): string {
  const sensitivePatterns = [
    /password[=:]\s*[^\s&]+/gi,
    /token[=:]\s*[^\s&]+/gi,
    /secret[=:]\s*[^\s&]+/gi,
    /key[=:]\s*[^\s&]+/gi
  ];
  
  let message = error.message || error.toString();
  sensitivePatterns.forEach(pattern => {
    message = message.replace(pattern, '[REDACTED]');
  });
  
  return message;
}

})().catch(error => {
  tl.debug(error); // Full error for debugging
  tl.setResult(tl.TaskResult.Failed, sanitizeError(error)); // Sanitized for user
});
```

### Risk Level: Medium
Generic error handling poses moderate risk of sensitive information disclosure.

### Status: New
### Reporter: Security Audit Bot
### Date: $(date)