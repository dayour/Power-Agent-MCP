import { getInput } from "azure-pipelines-task-lib";
export function getEndpointName(authenticationType) {
    const endpointName = getInput(authenticationType);
    if (endpointName === undefined) {
        throw new Error(`End Point Name for ${authenticationType} is undefined`);
    }
    return endpointName;
}
