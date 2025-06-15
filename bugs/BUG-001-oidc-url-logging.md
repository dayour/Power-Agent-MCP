# BUG-001: Potential Information Disclosure in OIDC Token URL Logging

## Severity: Medium
## Category: Security - Information Disclosure  
## File: src/params/auth/getCredentials.ts
## Line: 75

### Description:
The system logs the complete OIDC token request URL at debug level, which contains sensitive parameters including serviceConnectionId and potentially other identifiable information.

### Code Location:
```typescript
const tokenRequestUrl = `${uri}${projectId}/_apis/distributedtask/hubs/${hub}/plans/${planId}/jobs/${jobId}/oidctoken?serviceConnectionId=${serviceConnectionId}&api-version=${oidcApiVersion}`;
tl.debug(`OIDC Token Request URL: ${tokenRequestUrl}`);
```

### Security Impact:
- Service connection IDs could be exposed in logs
- Project IDs, plan IDs, and job IDs may aid in reconnaissance
- Full URL structure reveals system architecture details
- Could facilitate targeted attacks if logs are compromised

### Recommendation:
1. Remove or redact sensitive parameters from URL logging
2. Log only essential non-sensitive components for debugging
3. Consider using tl.setSecret() for sensitive URL components

### Risk Level: Medium
URL logging poses moderate risk if debug logs are accessible to unauthorized parties.

### Status: New
### Reporter: Security Audit Bot
### Date: $(date)