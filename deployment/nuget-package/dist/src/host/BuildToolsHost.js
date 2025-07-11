// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as tl from 'azure-pipelines-task-lib/task';
import { getEnvironmentUrl } from "../params/auth/getEnvironmentUrl";
import buildToolsLogger from "../host/logger";
export class BuildToolsHost {
    name = "Build-Tools";
    _artifactStoreName;
    constructor(artifactStoreName) {
        this._artifactStoreName = artifactStoreName || 'artifacts';
    }
    getInput(entry) {
        if (entry.name === 'Environment')
            return getEnvironmentUrl();
        const value = tl.getInput(entry.name, entry.required);
        // normalize value to always be undefined if the user has not declared the input value
        return (value && value.trim() !== '') ? value : undefined;
    }
    getArtifactStore() {
        return new AzDevOpsArtifactStore(this._artifactStoreName);
    }
}
class AzDevOpsArtifactStore {
    _subFolder;
    _hasArtifactFolder = false;
    _resultsDirectory;
    constructor(subFolder) {
        this._subFolder = subFolder;
        this._resultsDirectory = os.tmpdir();
    }
    getTempFolder() {
        const outputDirectory = this.getOutputDirectory();
        this._resultsDirectory = path.join(outputDirectory, 'results');
        buildToolsLogger.debug(`Artifact directory: ${outputDirectory}`);
        return outputDirectory;
    }
    async upload(artifactName, files) {
        buildToolsLogger.debug(`files: ${files.join(';')}`);
        await fs.emptyDir(this._resultsDirectory);
        for (const file of files) {
            if (path.extname(file).toLowerCase() === '.zip') {
                buildToolsLogger.debug(`unzipping ${file} into ${this._resultsDirectory} ...`);
                await extractToFolder(file, this._resultsDirectory);
            }
            else {
                buildToolsLogger.debug(`copying ${file} into ${this._resultsDirectory} ...`);
                await fs.copyFile(file, path.join(this._resultsDirectory, path.basename(file)));
            }
        }
        if (this._hasArtifactFolder) {
            // https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/logging-commands?view=azure-devops&tabs=bash#upload-upload-an-artifact
            tl.uploadArtifact(this._subFolder, this._resultsDirectory, artifactName);
        }
        else {
            // pipeline has no artifact store (e.g. release pipelines):
            const resultFiles = await fs.readdir(this._resultsDirectory);
            for await (const resultFile of resultFiles) {
                const fqn = path.join(this._resultsDirectory, resultFile);
                tl.uploadFile(fqn);
            }
        }
    }
    // Establish output directory for the different pipeline runtime contexts:
    // different variables are predefined depending on type of pipeline (build vs. release) and classic vs. yaml
    // https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml#agent-variables
    getOutputDirectory() {
        this._hasArtifactFolder = false;
        let baseOutDir;
        if (process.env.BUILD_ARTIFACTSTAGINGDIRECTORY) {
            baseOutDir = process.env.BUILD_ARTIFACTSTAGINGDIRECTORY;
            this._hasArtifactFolder = true;
        }
        else if (process.env.PIPELINE_WORKSPACE) {
            baseOutDir = process.env.PIPELINE_WORKSPACE;
        }
        else if (process.env.AGENT_BUILDDIRECTORY) {
            baseOutDir = process.env.AGENT_BUILDDIRECTORY;
        }
        else {
            baseOutDir = path.join(process.cwd(), 'out');
        }
        const outputDirectory = path.join(baseOutDir, this._subFolder);
        fs.emptyDirSync(outputDirectory);
        return outputDirectory;
    }
}
async function extractToFolder(zipFile, outDirectory) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(zipFile)
            .pipe(unzip.Extract({ path: outDirectory }))
            .on("close", () => {
            resolve(outDirectory);
        })
            .on("error", (error) => {
            reject(error);
        });
    });
}
