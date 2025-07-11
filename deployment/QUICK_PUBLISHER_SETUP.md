# Publisher Account Setup - Quick Guide

## VSCode Marketplace Setup (@darbotlabs)

### 1. Install VSCE and Setup Publisher

```bash
# Install VSCE CLI globally
npm install -g vsce

# Create publisher account at marketplace.visualstudio.com/manage
# Then create publisher via CLI
vsce create-publisher darbotlabs
```

### 2. Configure Authentication

1. Create Personal Access Token at dev.azure.com
2. Set scope to "Marketplace (Manage)"
3. Login with VSCE:

```bash
vsce login darbotlabs
2iAvU3FZZS36JODYClwqW0PoO7QDk9wECCon6lSIhPFbEhlqdciGJQQJ99BGACAAAAAeNEnbAAASAZDOdma3
```

### 3. Verify Setup

```bash
vsce verify-pat darbotlabs
vsce show darbotlabs
```

## NuGet Setup (DarBotLabs)

### 1. darbotlabs

### 2. nuget.org API Key your-nuget-api-key

### 3. Configure CLI

```bash
# Install NuGet CLI
choco install nuget.commandline

# Set API key
nuget setApiKey YOUR_API_KEY -Source https://api.nuget.org/v3/index.json
```

## Environment Variables

```bash
# Set for deployment
$env:VSCE_PUBLISHER = "darbotlabs"
$env:VSCE_PAT = "your-pat"
$env:NUGET_API_KEY = "your-api-key"
```

## Verification Checklist

- [ ] VSCode publisher account created
- [ ] VSCE CLI authenticated
- [ ] NuGet account created and verified
- [ ] API keys configured
- [ ] Environment variables set

Ready for packaging and deployment!
