const path = require("path");
const util = require("util");
const writeFile = util.promisify(require("fs").writeFile);
const exec = util.promisify(require("child_process").exec);

exports.onPreInit = ({ reporter }) => {
  reporter.info("Initialized meta-plugin");
  // reporter.verbose("Initialized meta-plugin");
  // reporter.error("Error in meta-plugin", new Error('meta-plugin error'));
  // reporter.panic("Fatal error in meta-plugin", new Error('meta-plugin error'));
  // reporter.panicOnBuild("Fatal error during build in meta-plugin", new Error('meta-plugin error'));
};

exports.onPostBuild = async ({ graphql, reporter }) => {
  const { stdout: sha } = await exec("git rev-parse HEAD");

  const { data } = await graphql(`
    {
      siteBuildMetadata {
        buildTime
      }
    }
  `);

  const meta = {
    sha: sha?.trim(),
    branch: process.env.BRANCH,
    buildTime: data.siteBuildMetadata.buildTime,
  };

  await writeFile(
    path.join("./public", "meta.json"),
    JSON.stringify(meta, null, " ")
  );

  reporter.info("Wrote meta.json file with build metadata");
};
