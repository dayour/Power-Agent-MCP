"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentials = getCredentials;
var tl = require("azure-pipelines-task-lib/task");
var url_1 = require("url");
var azure_pipelines_task_lib_1 = require("azure-pipelines-task-lib");
var getAuthenticationType_1 = require("./getAuthenticationType");
var getEndpointName_1 = require("./getEndpointName");
function getCredentials(defaultAuthType) {
    var authenticationType = (0, getAuthenticationType_1.getAuthenticationType)(defaultAuthType);
    switch (authenticationType) {
        case "PowerPlatformEnvironment":
            return getUsernamePassword();
        case "PowerPlatformSPN":
            return getClientCredentials();
    }
}
function getClientCredentials() {
    var endpointName = (0, getEndpointName_1.getEndpointName)("PowerPlatformSPN");
    var authorization = getEndpointAuthorizationParameters(endpointName);
    tl.debug("Auth Scheme: " + authorization.scheme);
    if (authorization.scheme === "WorkloadIdentityFederation") {
        // Set environment variables for Workload Identity Federation
        tl.debug('Acquiring Workload Identity Federation details from pipeline service connection');
        process.env.PAC_ADO_ID_TOKEN_REQUEST_URL = buildIdTokenRequestUrl();
        var pipelineAuth = tl.getEndpointAuthorization('SYSTEMVSSCONNECTION', false);
        if (pipelineAuth && pipelineAuth.scheme === 'OAuth') {
            tl.debug('Pipeline connection found with OAuth scheme');
            process.env.PAC_ADO_ID_TOKEN_REQUEST_TOKEN = pipelineAuth.parameters['AccessToken'];
            tl.setSecret(process.env.PAC_ADO_ID_TOKEN_REQUEST_TOKEN); // Mask in logs, though that *should* already be done.
        }
        else {
            tl.warning('Could not find pipeline connection details. Workload Identity Federation may not work as expected.');
        }
        return {
            tenantId: authorization.parameters.tenantid,
            appId: authorization.parameters.serviceprincipalid,
            cloudInstance: resolveCloudInstance(endpointName),
            scheme: authorization.scheme,
            federationProvider: "AzureDevOps"
        };
    }
    return {
        tenantId: authorization.parameters.tenantId,
        appId: authorization.parameters.applicationId,
        clientSecret: authorization.parameters.clientSecret,
        encodeSecret: true,
        cloudInstance: resolveCloudInstance(endpointName),
        scheme: authorization.scheme
    };
}
// Docs: https://learn.microsoft.com/en-us/rest/api/azure/devops/distributedtask/oidctoken/create?view=azure-devops-rest-7.2
function buildIdTokenRequestUrl() {
    var oidcApiVersion = '7.2-preview.1';
    var projectId = tl.getVariable('System.TeamProjectId');
    var hub = tl.getVariable("System.HostType");
    var planId = tl.getVariable('System.PlanId');
    var jobId = tl.getVariable('System.JobId');
    var serviceConnectionId = tl.getInput("PowerPlatformSPN", true);
    var uri = tl.getVariable("System.CollectionUri");
    if (!uri) {
        uri = tl.getVariable("System.TeamFoundationServerUri");
    }
    var tokenRequestUrl = "".concat(uri).concat(projectId, "/_apis/distributedtask/hubs/").concat(hub, "/plans/").concat(planId, "/jobs/").concat(jobId, "/oidctoken?serviceConnectionId=").concat(serviceConnectionId, "&api-version=").concat(oidcApiVersion);
    tl.debug("OIDC Token Request URL: ".concat(tokenRequestUrl));
    return tokenRequestUrl;
}
function getUsernamePassword() {
    var endpointName = (0, getEndpointName_1.getEndpointName)("PowerPlatformEnvironment");
    var authorization = getEndpointAuthorizationParameters(endpointName);
    return {
        username: authorization.parameters.username,
        password: authorization.parameters.password,
        encodePassword: true,
        cloudInstance: resolveCloudInstance(endpointName)
    };
}
function getEndpointAuthorizationParameters(endpointName) {
    var authorization = (0, azure_pipelines_task_lib_1.getEndpointAuthorization)(endpointName, false);
    if (authorization === undefined) {
        throw new Error("Could not get credentials for endpoint: ".concat(endpointName));
    }
    return authorization;
}
// needed for backwards compatibility to the PS implementation:
// infer the cloudInstance from the default endpoint url on the service connection
// see Get-Origin in https://dev.azure.com/dynamicscrm/OneCRM/_git/PowerApps.AzDevOpsExtensions?path=/src/extension/common/SharedFunctions.psm1&version=GBmaster&line=23&lineEnd=24&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contents
function resolveCloudInstance(endpointName) {
    var defaultEndpointUrl = (0, azure_pipelines_task_lib_1.getEndpointUrl)(endpointName, true);
    if (!defaultEndpointUrl) {
        return "Public";
    }
    var hostname = new url_1.URL(defaultEndpointUrl)
        .hostname
        .split('.')
        .reverse();
    hostname.splice(-1);
    var regionalized = hostname.reverse().join('.');
    // see also:
    // https://docs.microsoft.com/en-us/power-platform/admin/new-datacenter-regions
    // https://dev.azure.com/dynamicscrm/OneCRM/_git/CRM.DevToolsCore?path=%2Fsrc%2FGeneralTools%2FDataverseClient%2FClient%2FModel%2FDiscoveryServers.cs&_a=contents&version=GBmaster
    switch (regionalized) {
        case 'crm.dynamics.com':
        case 'crm2.dynamics.com':
        case 'crm3.dynamics.com':
        case 'crm4.dynamics.com':
        case 'crm5.dynamics.com':
        case 'crm6.dynamics.com':
        case 'crm7.dynamics.com':
        case 'crm8.dynamics.com':
        case 'crm11.dynamics.com':
        case 'crm12.dynamics.com':
        case 'crm14.dynamics.com':
        case 'crm15.dynamics.com':
        case 'crm16.dynamics.com':
        case 'crm17.dynamics.com':
        case 'crm19.dynamics.com':
        case 'crm20.dynamics.com':
        case 'crm21.dynamics.com':
            return "Public";
        case 'crm9.dynamics.com':
            return "UsGov";
        case 'crm.microsoftdynamics.us':
            return "UsGovHigh";
        case 'crm.appsplatform.us':
            return "UsGovDod";
        case 'crm.dynamics.cn':
            return "China";
        case 'crm10.dynamics.com':
            return "Preprod";
        case 'crmtest.dynamics.com':
            return "Test";
        default:
            return "Public";
    }
}
