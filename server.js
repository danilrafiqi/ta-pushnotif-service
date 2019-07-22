const express = require("express");
const fcm = require("fcm-notification");
const FCM = new fcm("./privatekey-firebase.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-notif", (req, res) => {
  const Tokens = req.body.tokens;
  const message = {
    data: {
      title: req.body.title,
      body: req.body.body
    },
    notification: {
      title: req.body.title,
      body: req.body.body
    }
  };
  FCM.sendToMultipleToken(message, Tokens, function(err, response) {
    if (err) {
      res.send(err);
      console.log("err--", err);
    } else {
      res.send({ message: "success" });
      console.log("response-----", response);
    }
  });
});

const port = process.env.PORT || 2019;
app.listen(port, process.env.IP, () => {
  console.log("server berjalan pada port : ", port);
});
