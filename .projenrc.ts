import { CDKTFConstruct } from "@dschmidt/cdktf-construct-base";
const project = new CDKTFConstruct({
  author: "Daniel Schmidt",
  authorAddress: "danielmschmidt92@gmail.com",
  defaultReleaseBranch: "main",
  name: "cdktf-cdk8s",
  repositoryUrl: "https://github.com/DanielMSchmidt/cdktf-cdk8s.git",
  bundledDeps: ["yaml@1.10.2"],

  description:
    "A compatability layer for using cdk8s constructs within Terraform CDK." /* The description is just a string that helps people understand the purpose of the package. */,
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  // release: undefined,      /* Add release management to this project. */
  license: "MIT",
  eslintOptions: {
    dirs: ["src"],
    ignorePatterns: ["**/node_modules/**", "**/test/imports/**"],
  },
  docgen: false,
});

project.addPeerDeps(
  "@cdktf/provider-kubernetes@>=3.0.0",
  "cdk8s@>=2.1.6",
  "cdktf@>=0.13.3"
);

project.addDevDeps("@dschmidt/cdktf-construct-base", "cdk8s-cli@>=2.0");

project.testTask.prependExec(
  `cd ./test && cdk8s import k8s --language typescript`
);

project.addDevDeps("ts-node@10.9.1");

project.synth();
