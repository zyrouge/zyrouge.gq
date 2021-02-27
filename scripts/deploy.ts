import fs from "fs-extra";
import path from "path";
import cp from "child_process";
import { promisify } from "util";

const root = path.resolve(__dirname, "..");
const exec = promisify(cp.exec);

/* Configuration */
const config = {
    command: "cd ../site && npm install && npm run build",
    site: {
        from: path.join(root, "site", "dist"),
        to: path.join(root, "docs")
    }
}

const start = async () => {
    console.log("Starting deploy process");

    /* Build site */
    await exec(config.command);
    console.log("Finished building site");

    /* Copy build files */
    await fs.copy(config.site.from, config.site.to);
    console.log("Copied build files");
}

start();