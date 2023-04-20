const { uploadDocument } = require("../service/document");

exports.a = (req, res) => {
        console.log(req.body);
        res.send("OK");
    };
