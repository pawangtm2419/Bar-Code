const db = require("../_helpers/_db");
const maxID = require("../_helpers/_maxid");
const readXlsxFile = require('read-excel-file/node');

const upload = async (req, next) => {
    try {
        let fileArray = req.files, tutorials = [];
        if (fileArray && fileArray.length > 0) {
            let name = `../api/uploadFile/${req.files[0].originalname}`;
            readXlsxFile(name).then((rows) => {
                rows.shift();
                rows.forEach((row) => {
                    let tutorial = {
                        firstname: (row[0]) ? row[0] : '',
                        lastname: (row[1]) ? row[1] : '',
                        faxnumber: (row[2]) ? row[2] : '',
                        phonenumber: (row[3]) ? row[3] : '',
                        contactnumber: (row[4]) ? row[4] : '',
                        email: (row[5]) ? row[5] : '',
                        companyname: (row[6]) ? row[6] : '',
                        jobprofile: (row[7]) ? row[7] : '',
                        street: (row[8]) ? row[8] : '',
                        city: (row[9]) ? row[9] : '',
                        state: (row[10]) ? row[10] : '',
                        country: (row[11]) ? row[11] : '',
                        pincode: (row[12]) ? row[12] : '',
                        website: (row[13]) ? row[13] : ''
                    };
                    tutorials.push(tutorial);
                });
                tutorials.forEach(async item => {
                    let maxId = await maxID.maxID('contact');
                    let keys = Object.keys(item);
                    var i = {};
                    keys.forEach(element => {
                        if(item[element]) {
                            i[element] = item[element];
                        }
                    });
                    keys = Object.keys(i);
                    let data = Object.values(i);
                    data = data.map(item => {
                        if(typeof item == 'number') {
                            return item;
                        } else {
                            return `'${item}'`;
                        }
                    });
                    let sql = `INSERT INTO contact (contact_id, ${keys}) VALUES (${maxId}, ${data});`;
                    console.log(sql);
                    let result = await db.query(sql);
                    console.log(result.rowCount);
                });
                return next({ status: true, message: "Uploaded the file successfully: " + req.files[0].originalname, data: tutorials });
            });
        } else {
            return next({ status: false, message: "Please upload an excel file!" });
        }
    } catch (error) {
      console.log(error);
      return next({ status: false, message: "Something went wrong", error: error });
    }
};
  
const getContactList = async (req, next) => {
    try {
        let sql = `SELECT * FROM contact;`;
        let result = await db.query(sql);
        return (result.rowCount > 0) ? next({ status: true, message: "Contact details found!", data: result.rows }) : next({ status: true, message: "Data not found!" });
    } catch (error) {
        return next({ status: false, message: "Something went wrong", error: error });
    }
};

const getContactData = async (req, next) => {
    try {
        let sql = `SELECT * FROM contact WHERE contact_id = ${id};`;
        let result = await db.query(sql);
        return (result.rowCount > 0) ? next({ status: true, message: "Contact details found!", data: result.rows }) : next({ status: true, message: "Data not found!" });
    } catch (error) {
        return next({ status: false, message: "Something went wrong", error: error });
    }
};

const createContactData = async (req, next) => {
    try {
        let body = req.body;
        let maxId = await maxID.maxID('contact');
        let keys = Object.keys(body);
        var i = {};
        keys.forEach(element => {
            if(body[element]) {
                i[element] = body[element];
            }
        });
        keys = Object.keys(i);
        keys = keys.map(item => item.toLowerCase());
        let data = Object.values(i);
        data = data.map(item => {
            if(typeof item == 'number') {
                return item;
            } else {
                return `'${item}'`;
            }
        });
        let sql = `INSERT INTO contact (contact_id, ${keys}) VALUES (${maxId}, ${data});`;
        console.log(sql);
        let result = await db.query(sql);
        return (result.rowCount > 0) ? next({ status: true, message: "Contact saved!" }) : next({ status: false, message: "Contact does not save!" });
    } catch (error) {
        return next({ status: false, message: "Something went wrong", error: error });
    }
};

module.exports = { getContactData, createContactData, getContactList, upload };