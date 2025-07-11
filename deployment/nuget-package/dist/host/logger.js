// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from "azure-pipelines-task-lib/task";
const buildToolsLogger = {
    log: (...args) => console.log(args),
    warn: (...args) => tl.warning(args.join()),
    error: (...args) => tl.error(args.join()),
    debug: (...args) => tl.debug(args.join())
};
export default buildToolsLogger;
