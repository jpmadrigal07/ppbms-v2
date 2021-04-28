const mongoose = require('mongoose');
const keys = require("./config/keys");
const EncodeList = require("./models/encodeList");
const _ = require("lodash");
const moment = require("moment");

const mongoDbFunction = async () => {
    try {
        mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        console.log('mongodb connected');
    } catch (error) {
        console.log(`Cant connect to db due to ${error}`);
        process.exit(-1);
    }

    const encodeListName = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result+".xlsx";
     }

    const res = [...Array(1000)].map((_, i) => {
        return {
            fileName: `${i}${encodeListName(6)}`
        };
    });

    const toInsert = EncodeList.insertMany(res,
        {
           ordered: true
        }
    )

    console.log('res', toInsert)

};

mongoDbFunction();