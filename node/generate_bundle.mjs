import fs from "fs/promises";
import path from "path";
const SRC_DIR = "./build/components";
const BUNDLE_NAME = "g2_bundle.js"
let all = await fs.readdir(SRC_DIR);
// console.log(all);
let buffers = [];
for(let cur_file of all)
{
    
    // console.log(path.extname(cur_file));

    if( path.extname(cur_file) === ".js" && cur_file !== BUNDLE_NAME){
        console.log("Collecting "+cur_file);
        let content = await fs.readFile(path.join(SRC_DIR, cur_file));
        
        let data = {
            filename : cur_file,
            buffer : content
        };

        buffers.push(data);
    }
}

const output_path = path.join(SRC_DIR, "..", BUNDLE_NAME);


fs.writeFile(output_path, ""); // clear file content
for(let item of buffers)
{
    item.filename;
    await fs.appendFile(output_path, "\n");
    await fs.appendFile(output_path, "// "+item.filename + "\n")
    await fs.appendFile(output_path, item.buffer );

}
console.log(`---Done writing ${output_path} to disk---`);
