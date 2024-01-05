import { log } from "console";
import fs from "fs/promises";
import path from "path";
const SRC_DIR = "./components";
let all = await fs.readdir(SRC_DIR);
// console.log(all);
let buffers = [];
for(let cur_file of all)
{
    
    // console.log(path.extname(cur_file));

    if( path.extname(cur_file) === ".js" && cur_file !== "bundle.js"){
        console.log(cur_file);
        let content = await fs.readFile(path.join(SRC_DIR, cur_file));
        // console.log(content);
        let data = {
            filename : cur_file,
            buffer : content
        };

        buffers.push(data);
    }
}

// fs.writeFile(path.join(SRC_DIR, "bundle.js"), buffers[0].buffer );
// fs.appendFile()
for(let item of buffers)
{
    item.filename;
    
    fs.appendFile(path.join(SRC_DIR, "bundle.js"), item.buffer );
}
