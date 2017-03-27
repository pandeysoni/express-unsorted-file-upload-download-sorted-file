'use strict';
let fs = require('fs');

exports.displayForm = (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.write(
        '<form action="/upload" method="post" enctype="multipart/form-data">' +
        '<input type="file" name="file">' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
    res.end();
};

/** create function to create User. */
exports.uploadDownload = (req, res, next) => {
   let fileName = req.files.file.name;
   let tmp_path = req.files.file.path;
        fs.readFile(tmp_path, "utf-8", (error, data) => {
            data = data.split('\n')
            let newArray = [], sortedArray = '';
            for(let i = 0; i < data.length; i++){
                let newData = data[i].split(',')
                newArray.push(newData)
            }
            newArray = newArray.slice(0,-1)
            for(let j = 0; j < newArray.length; j++){
                let unsortedData = newArray[j].map((el) => { return +el;});
                 bubbleSort(unsortedData, (error, result) => {
                    sortedArray = sortedArray+ "\n" +result
                })
            }
            sortedArray = sortedArray.replace(/^\s*\n/gm, "")
            res.setHeader('Content-type', "application/octet-stream");
            res.setHeader('Content-disposition', 'attachment; filename='+fileName+'');
            res.send( sortedArray);
        });    
};

let bubbleSort = (items, callback) => {  
    let length = items.length;
    for (let i = (length - 1); i >= 0; i--) {
        for (let j = (length - i); j > 0; j--) {
            if (items[j] < items[j - 1]) {
                let tmp = items[j];
                items[j] = items[j - 1];
                items[j - 1] = tmp;
            }
        }
    }
    callback(null, items)
}
