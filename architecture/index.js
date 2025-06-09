const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 5;

setTimeout(() => {
  console.log("Hello from Timer 1");
}, 0);

setImmediate(() => {
  console.log("Hello from Immediate fn 1 ");
});

fs.readFile("contact.txt", "utf-8", () => {
  console.log("IO polling Finish");

  setTimeout(() => console.log("Hello timer 2"), 0);
  setTimeout(() => console.log("Hello timer 3"), 5 * 1000);

  crypto.pbkdf2("password", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start} ms`, "password 1 DONE");
  });
  crypto.pbkdf2("password2", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start} ms`, "password 2 DONE");
  });
  crypto.pbkdf2("password3", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start} ms`, "password 3 DONE");
  });
  crypto.pbkdf2("password4", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start} ms`, "password 4 DONE");
  });

  crypto.pbkdf2("password4", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start} ms`, "password 4 DONE");
  });
  crypto.pbkdf2("password4", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start} ms`, "password 4 DONE");
  });
});

console.log("Hello from NodeJS");
