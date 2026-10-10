import fs from "fs";

// app.use((req, res, next) => {
//   console.log("Hello From middleware 1");
//   req.myUserName = "MuhammadHaris.dev";
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Hello From middleware 2", req.myUserName);
//   next();
// });

const logReqRes = (fileName) => {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `\n${Date.now()} ${req.ip} : ${req.method} : ${req.path}`,
      (err, data) => {
        next();
      },
    );
  };
};

export default logReqRes;
