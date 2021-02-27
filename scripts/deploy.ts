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
    },
    gitignore: {
        to: path.join(root, ".gitignore"),
        data: [
            "scripts",
            "site"
        ].join("\n")
    },
    indexFile: {
        from: path.join(root, "docs", "index.html"),
        to: path.join(root, "docs", "404.html")
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

    /* Rename index.html */
    await fs.rename(config.indexFile.from, config.indexFile.to);
    console.log("Rename index.html");

    /* New gitignore */
    await fs.writeFile(config.gitignore.to, config.gitignore.data);
    console.log("Wrote new gitignore");
}

start();