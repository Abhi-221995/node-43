const fs = require("fs");

// fs.writeFileSync("./test.txt", "Hello FS module");

//  fs.writeFile("./test.txt", "Hello File System", (err) => {});

// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result);

// fs.readFile("./contact.txt", "utf-8", (err, result) => {
//   console.log(result);
// });

// fs.appendFile("./test.txt", "Hello earth\n", (err) => {
// });

// fs.copyFile("./test.txt", './copy.txt', () =>{})

// fs.unlinkSync("./copy.txt");

// console.log(fs.statSync("./contact.txt"));

fs.mkdirSync("my-docs/a/b", { recursive: true });
