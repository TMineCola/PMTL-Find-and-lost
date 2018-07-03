var express = require('express');
var router = express.Router();
var middleware = require('./middleware/login');
var db = require('./modules/objectController');

router.post('/changeState/found', function(req, res, next) {
    let object = req.body;
    if(typeof(object['state']) != "number" || object['state'] < 0 || object['state'] > 7) {
        res.status(500).send({"failed": "非正確狀態"});
    }
    let response = {
        failed: []
    };
    let runtime = [];

    object["ID"].forEach(ID => {
        runtime.push(db.changeState('property_found', ID, object.state).catch(() => {
            response.failed.push(ID);
        }));
    })

    Promise.all(runtime).then(() => res.status(200).send(response)).catch(error => res.status(500).send(error));
});

module.exports = router;