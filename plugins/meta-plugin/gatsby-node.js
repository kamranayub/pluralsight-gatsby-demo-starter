exports.onPreInit = ({ reporter }) => {
  reporter.info("Initialized meta-plugin");
  // reporter.verbose("Initialized meta-plugin");
  // reporter.error("Error in meta-plugin", new Error('meta-plugin error'));
  // reporter.panic("Fatal error in meta-plugin", new Error('meta-plugin error'));
  // reporter.panicOnBuild("Fatal error during build in meta-plugin", new Error('meta-plugin error'));
}