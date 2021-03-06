var express = require('express');
var router = express.Router();
var config = require('../config/env');
var moment = require('moment');

/* 檢測ID是否存在 */
function _CheckID(db, id) {
  let sql = "SELECT * FROM `property_found` WHERE `ID` = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, id, function(err, result) {
        if (err) {
          /* 查詢失敗時回傳訊息物件 */
          reject(config.development === true ? {"message": "查詢 ID:" + id + " 拾獲物資訊失敗", err} : {"message": "查詢 ID:" + id + " 拾獲物資訊失敗"});
        } else if(result.length == 0) {
          /* 查詢不到指定ID時回傳訊息物件 */
          reject({"message": "找不到指定拾獲物 (ID:" + id + ")"});
        } else {
          resolve({"message": "Success"});
        }
    });
  });
}

/* 查詢全部拾獲物 */
function _Search(db) {
  return new Promise((resolve, reject) => {
    // 預設由新至舊
    let sql ="SELECT `ID`, `name`, `classification_id`, `location`, `registered_time`, `time_interval_LB`, `time_interval_UB`, `department_id`, `registrant_id`, `description`, `state`, `image` FROM `property_found` order by time_interval_LB DESC";
    db.query(sql, function (err, result, fields) {
      if(err) {
        /* 查詢失敗時回傳訊息物件 */
        reject(config.development === true ? {"message": "查詢全部拾獲物資訊失敗", err} : {"message": "查詢全部拾獲物資訊失敗"});
      } else {
        /* 新增成功時回傳拾獲物物件 */
        resolve(result);
      }
    });
  });
}

/* 查詢指定ID拾獲物 */
function _SearchID(db, id) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT `ID`, `name`, `classification_id`, `location`, `registered_time`, `time_interval_LB`, `time_interval_UB`, `department_id`, `registrant_id`, `description`, `state`, `image`, `department_id` FROM `property_found` WHERE `ID` = ?";
    db.query(sql, id, function (err, result, fields) {
      if(err) {
        /* 查詢失敗時回傳訊息物件 */
        reject(config.development === true ? {"message": "查詢全部拾獲物資訊失敗", err} : {"message": "查詢全部拾獲物資訊失敗"});
      } else if(result.length == 0) {
        /* 查詢不到指定ID時回傳訊息物件 */
        reject({"message": "找不到指定拾獲物 (ID:" + id + ")"});
      } else {
        /* 新增成功時回傳拾獲物物件 */
        resolve(result);
      }
    });
  });
}

/* 查詢指定state遺失物 */
function _SearchState(db, state) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT `ID`, `name`, `classification_id`, `location`, `registered_time`, `time_interval_LB`, `time_interval_UB`, `department_id`, `registrant_id`, `description`, `state`, `image`,`department_id` FROM `property_found` WHERE `state` = ? order by time_interval_LB DESC";
      db.query(sql, state, function (err, result, fields) {
        if(err) {
          /* 查詢失敗時回傳訊息物件 */
          reject(config.development === true ? {"message": "查詢全部拾獲物資訊失敗", err} : {"message": "查詢全部拾獲物資訊失敗"});
        } else if(result.length == 0) {
          /* 查詢不到指定ID時回傳訊息物件 */
          reject({"message": "找不到指定狀態拾獲物 (狀態:" + state + ")"});
        } else {
          /* 新增成功時回傳拾獲物物件 */
          resolve(result);
        }
      });
    });
  }

/* 新增拾獲物 */
function _Post(db, values) {
  let sql = "INSERT INTO `property_found` SET ?";
  return new Promise((resolve, reject) => {
    db.query(sql, values, function (err, result, fields) {
      if(err) {
        /* 新增失敗時回傳訊息物件 */
        reject(config.development === true ? {"message": "新增拾獲物失敗", err} : {"message": "新增拾獲物失敗"});
      } else {
        /* 新增成功時回傳訊息物件 */
        resolve({"message": "新增拾獲物成功"});
      }
    });
  });
}

/* 更新指定ID拾獲物 */
function _Update(db, values, id) {
  let sql = "UPDATE `property_found` SET ? WHERE `ID` = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [values, id], function (err, result) {
      if(err) {
        /* 新增失敗時回傳訊息物件 */
        reject(config.development === true ? {"message": "拾獲物更新失敗 (ID:" + id + ")", err} : {"message": "拾獲物更新失敗 (ID:" + id + ")"});
      } else {
        /* 新增成功時回傳訊息物件 */
        resolve({"message": "拾獲物更新成功 (ID:" + id + ")"});
      }
    });
  });
}

/* 更新指定ID拾獲物狀態 */
function _UpdateState(db, state, id) {
  let sql = "UPDATE `property_found` SET `state` = ? WHERE `ID` = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [stats, id], function (err, result) {
      if(err) {
        /* 新增失敗時回傳訊息物件 */
        reject(config.development === true ? {"message": "拾獲物狀態更新失敗 (ID:" + id + ")", err} : {"message": "拾獲物狀態更新失敗 (ID:" + id + ")"});
      } else {
        /* 新增成功時回傳訊息物件 */
        resolve({"message": "拾獲物狀態更新成功 (ID:" + id + ")"});
      }
    });
  });
}

/* 刪除指定ID拾獲物 */
function _Delete(db, id) {
  let sql = "DELETE FROM `property_found` WHERE `ID` = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, id, function (err, result) {
      if(err) {
        /* 刪除失敗時回傳訊息物件 */
        reject(config.development === true ? {"message": "拾獲物刪除失敗 (ID:" + id + ")", err} : {"message": "拾獲物刪除失敗 (ID:" + id + ")"});
      } else {
        /* 刪除成功時回傳訊息物件 */
        resolve({"message": "拾獲物刪除成功 (ID:" + id + ")"});
      }
    });
  });
}

/* 全部拾獲物 */
router.get('/', function(req, res, next) {
  let db = req.dbstatus;
  _Search(db).then(foundObj => {
    res.send(foundObj);
    return;
  }).catch(errorObj => {
    res.status(404).send(errorObj);
    return;
  });
});

/* 以ID查詢拾獲物 */
router.get('/id/:id', function(req, res, next) {
  let db = req.dbstatus;
  let found_id = req.params.id;
  _SearchID(db, found_id).then(foundObj => {
    res.send(foundObj);
    return;
  }).catch(errorObj => {
    res.status(404).send(errorObj);
    return;
  });
});

/* 以state查詢遺失物 */
router.get('/state/:state', function(req, res, next) {
    let db = req.dbstatus;
    let found_state = req.params.state;
    _SearchState(db, found_state).then(foundObj => {
    res.send(foundObj);
    return;
    }).catch(errorObj => {
    res.status(404).send(errorObj);
    return;
    });
});

/* 更新state */
router.patch('/state', function(req, res, next) {
  let db = req.dbstatus;
  let target = req.body;
  let info_Object = {
    "success": [],
    "failure": []
  };

  for(let i = 0; i < target.length; i++) {
    _UpdateState(db, target[i].state, target[i].id).then(success => {
      info_Object.success[info_Object.success.length] = target[i].id;
    }).catch(error => {
      info_Object.failure[info_Object.failure.length] = target[i].id;
    });
  }

  res.send(info_Object);
});

/* 新增拾獲物 */
router.post('/', function(req, res, next) {
  let db = req.dbstatus;
  let foundObj = req.body;

  let time_LB = foundObj.time_interval_LB;
  let time_UB = foundObj.time_interval_UB;
  /* 處理時間上下限相反的情況 */
  if(time_LB > time_UB) {
    let temp = time_LB;
    time_LB = time_UB;
    time_UB = temp;
  }

  let values = {
    "name": foundObj.name,
    "classification_id": foundObj.classification_id,
    "location": foundObj.location,
    "registered_time": moment().toISOString(true),
    "time_interval_LB": time_LB,
    "time_interval_UB": time_UB,
    "description": foundObj.description,
    "image": foundObj.image,
    "deleteHash": foundObj.deleteHash
  };

  /* 驗證修改資訊 */
  let LessObj = {
    "message": "資料不得為空或缺少資料 ("
  };
  let CheckNum = 0;
  for(index in values) {
    if(foundObj[index] == undefined && foundObj[index] != '' && index != "description" && index != "registered_time") {
      LessObj.message += index + ",";
      CheckNum ++;
    } else if(index == "time_interval_LB" || index == "time_interval_UB"){
      // 判斷時間是否符合 ISO8601格式
      if(!moment(values[index], moment.ISO_8601, true).isValid()) {
        LessObj.message += index + "(時間格式不符),";
        CheckNum ++;
      }
    }
  }
  if(CheckNum != 0) {
    LessObj.message = LessObj.message.slice(0, -1);
    LessObj.message += ")";
    res.status(404).send(LessObj);
    return;
  }

  _Post(db, values).then(successObj => {
    res.send(successObj);
    return;
  }).catch(errorObj => {
    res.status(404).send(errorObj);
    return;
  });
});

/* 修改拾獲物資訊 */
router.patch('/:id', function(req, res, next) {
  let db = req.dbstatus;
  let found_id = req.params.id;
  let foundObj = req.body;

  /* 檢驗ID是否存在 */
  _CheckID(db, found_id).then(value => {
    var time_LB = foundObj.time_interval_LB;
    var time_UB = foundObj.time_interval_UB;
    // 處理時間上下限相反的情況
    if(time_LB > time_UB) {
      let temp = time_LB;
      time_LB = time_UB;
      time_UB = temp;
    }
    let values = {
      "name": foundObj.name,
      "classification_id": foundObj.classification_id,
      "location": foundObj.location,
      "time_interval_LB": foundObj.time_interval_LB,
      "time_interval_UB": foundObj.time_interval_UB,
      "description": foundObj.description
    };
    // 如果有圖片更動, 則攜帶image及deleteHash資料
    if(foundObj['image'] != undefined && foundObj['image'] != '') {
      values['image'] = foundObj.image;
      values['deleteHash'] = foundObj.deleteHash;
    }
    /* 驗證修改資訊 */
    let LessObj = {
      "message": "資料不得為空或缺少資料 ("
    };
    let CheckNum = 0;
    for(index in values) {
      if(foundObj[index] == undefined && index != "description") {
        LessObj.message += index + ",";
        CheckNum ++;
      } else if(index == "time_interval_LB" || index == "time_interval_UB"){
        // 判斷時間是否符合 ISO8601格式
        if(!moment(values[index], moment.ISO_8601, true).isValid()) {
          LessObj.message += index + "(時間格式不符),";
          CheckNum ++;
        }
      }
    }
    if(CheckNum != 0) {
      LessObj.message = LessObj.message.slice(0, -1);
      LessObj.message += ")";
      /* 如果缺少資料則將缺少欄位回傳並結束 */
      res.status(404).send(LessObj);
      return;
    }
    /* 執行更新 */
    return _Update(db, values, found_id);
  }).then(successObj => {
    res.send(successObj);
    return;
  }).catch(errorObj => {
    res.status(404).send(errorObj);
  });

});

/* 刪除拾獲物 */
router.delete('/:id', function(req, res, next) {
  let db = req.dbstatus;
  let found_id = req.params.id;
  /* 檢驗ID是否存在 */
  _CheckID(db, found_id).then(value => {
    return _Delete(db, found_id);
  }).then(successObj =>{
    res.send(successObj);
    return;
  }).catch((errorObj) => {
    res.status(404).send(errorObj);
    return;
  });

});

module.exports = router;