import { getInput } from "azure-pipelines-task-lib";
export function getAuthenticationType(defaultAuthType) {
    const authenticationType = getInput("authenticationType");
    if (!authenticationType && defaultAuthType) {
        return defaultAuthType;
    }
    assertIsEndpointName(authenticationType);
    return authenticationType;
}
function assertIsEndpointName(input) {
    if (input === undefined) {
        throw new Error("authenticationType is undefined");
    }
    if (input !== "PowerPlatformEnvironment" && input !== "PowerPlatformSPN") {
        throw new Error(`Unsupported authenticationType: ${input}`);
    }
}
