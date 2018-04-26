const express = require('express');
const pug = require('pug');
const multer = require('multer');
const fs = require('fs');
const upload = multer({
    dest: 'public/uploads'
});
const port = 3000;
const app = express();

const uploaded_files = [];

app.use(express.static('public'));
app.use(express.static('./public/uploads/'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    const path = './public/uploads/';
    fs.readdir(path, function (err, items) {
    console.log(items);
    res.render('index', { imgs: items })
  })
});
app.get('/', (req, res) => {
    const path = './public/uploads/';
    fs.readdir(path, function (err, items) {
        console.log(items);
        let html = `
        <h1>Welcome to Kenziegram!</h1>
        <form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
        <h1>Welcome to ADGram, Please Upload your pictures!!!</h1> 
        <div>
        <label for="file">Choose a File</label>
        <!-- <input type="file" id="file" name="myFile"> -->
        <input type="file" id="file" name="myFile">
      
        </div>
     <div>
       <button>Send the file</button>
     </div>
   </form>
        `;
        for (i = 0; i < items.length; i++) {
            html += `<img src="${items[i]}">`;
        }

        res.send(html);
    });
});

app.post('/upload', upload.single('myFile'), function (req, res, next) {

    // req.file is the `myFile` file
    // req.body will hold the text fields, if there are any
    console.log("Uploaded: " + req.file.filename);
    // console.log(`Uploaded: ${req.file.filename}`;    
    uploaded_files.push(req.file.filename);
    let html = `<h1> Uploaded!!!!</h1>
    <a href = " / ">
    <button>Back</button>
    </a>`;
    res.send(html);
});


app.listen(port);