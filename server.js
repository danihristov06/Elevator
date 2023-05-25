const http = require('http');
const fs = require('fs');
const port = 3000;
let param = '';
let body;
let database;
let newRecord;
// var floors = 1;

function readDataFromFile() {
    const data = fs.readFileSync("Accounts.json", 'utf8');
    return JSON.parse(data);
}

function writeDataToFile() {
    const data = JSON.stringify(database, null, 2);
    fs.writeFileSync("Accounts.json", data, 'utf8');
}

function convertToJSON(input) {
    const jsonOutput = {};

    for (const item of input) {
        const [key, value] = item.split('=');
        jsonOutput[key] = value;
    }

    return jsonOutput;
}


const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (req.method === 'POST') {
        req.on('data', chunk => {
            database = readDataFromFile();
            body = '';
            body += chunk.toString();
            body = body.replace('undefined', "");
            body = body.split("&");
            param = '';

            newRecord = convertToJSON(body);
            // database.forEach(element => {
            //     if(element != newRecord){
            //         console.log("creted.");
            //         database.push(newRecord);
            //         writeDataToFile();
            //     } else{
            //         param = '?success=true';
            //         console.log("exists");
            //     }
            // });
            let exists = false;
            for (let i = 0; i < database.length; i++) {
                if (database[i]['psw'] == newRecord['psw']) {
                    exists = true;
                    param = '?success=true';
                    console.log("exists");
                    break; // Exit the loop once a match is found
                }
            }
            if (!exists) {
                console.log("created.");
                database.push(newRecord);
                writeDataToFile();
            }

        });
        req.on('end', () => {
            // console.log('POST data:', body);
            res.writeHead(302, { Location: "http://127.0.0.1:5500/index.html" + param });
            res.end();
        })
    };


})

server.listen(port, function (error) {
    if (error) {
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
})