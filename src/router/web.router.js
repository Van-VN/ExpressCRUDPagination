const express = require("express");
const router = express.Router();
const UserModel = require("../model/user.model");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.redirect("/user/index");
});

router.get("/user/create", (req, res) => {
  res.render("create");
});

router.post("/user/create", upload.single("image"), async (req, res) => {
  let results = req.body;
  if (req.file) {
    let uploadIMG = req.file.originalname;
    await UserModel.createEmployee(
      results.employeeName,
      results.employeeDepartment,
      uploadIMG
    ).catch((err) => {
      console.log(err);
    });
  } else {
    await UserModel.createEmployee(
      results.employeeName,
      results.employeeDepartment
    ).catch((err) => {
      console.log(err);
    });
  }
  res.redirect("/user/index");
});

router.get("/user/index", async (req, res) => {
  res.redirect("/user/index/1/page");
  //   let result = await UserModel.showAllEmployee().catch((err) => {
  //     console.log(err);
  //   });
  //   const limit = 5;
  //   const employee = await UserModel.showAllEmployee().catch((err) =>
  //     console.log(err)
  //   );
  //   const totalPage = Math.ceil(employee.length / limit);
  //   res.render("index", { data: result, page: totalPage });
  // });

  // router.get("/user/:id/delete", async (req, res) => {
  //   const userID = req.params.id;
  //   await UserModel.deleteEmployee(userID).catch((err) => console.log(err));
  //   res.redirect("/user/index");
});

router.get("/user/:id/detail", async (req, res) => {
  const userID = req.params.id;
  let userInfo = await UserModel.getEmployee(userID);
  res.render("detail", { data: userInfo[0] });
});

router.get("/user/:id/update", async (req, res) => {
  const userID = req.params.id;
  let employee = await UserModel.getEmployee(userID).catch((err) =>
    console.log(err)
  );
  res.render("update", { data: employee[0] });
});

router.get("/user/index/:id/page", async (req, res) => {
  const pageID = req.params.id;
  const limit = 5;
  const employee = await UserModel.showAllEmployee().catch((err) =>
    console.log(err)
  );
  const totalPage = Math.ceil(employee.length / limit);
  let offset = (pageID - 1) * limit;
  const data = await UserModel.limitEmployee(limit, offset);
  res.render("index", { data: data, page: totalPage });
});

module.exports = router;
