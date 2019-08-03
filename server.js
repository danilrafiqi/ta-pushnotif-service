const express = require("express");
const fcm = require("fcm-notification");
const FCM = new fcm("./privatekey-firebase.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
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
    const pesan = response[0].response;
    if (pesan.substr(0, 5) == "Error") {
      res.send({
        status: "error",
        message: `${response[0].response}, Token not valid`,
        data: []
      });
    } else {
      res.send({
        status: "success",
        message: response[0].response,
        data: []
      });
    }
  });
});

const port = process.env.PORT || 2019;
app.listen(port, process.env.IP, () => {
  console.log("server berjalan pada port : ", port);
});
