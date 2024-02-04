//----------------------------------
//----------------------------------
//
const _express = require('express');
const app      = _express();
const port     = 3000;
const fs       = require("fs");
const _multer  = require('multer');
const _upload  = _multer({ dest: 'img/signatures/dest/' }); // Store uploaded images in 'uploads' directory
//----------------------------------
//----------------------------------
//
function doOcr(p_imagePath) { 
    //
    const Tesseract = require('tesseract.js');
    //
    async function recognizeText(imagePath) {
      const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
      const msg = "texto en imagen :" + text;
      console.debug(msg);
      return msg;
    }
    //
    return recognizeText(p_imagePath);
}
//
app.post('/upload', _upload.single('image'), (req, res) => {
  const imagePath = req.file.path; // Access path of uploaded image
  console.debug('Image uploaded successfully:', imagePath);
  res.send('Image uploaded successfully');
  const msg       = doOcr(imagePath);
});
// index
async function GetIndex() {
  //
  const data = await fs.readFileSync("index.html", "utf8");
  //const data = await fs.readFileSync("index.html");
  //
  return data;
}
//----------------------------------
// END POINTS
//----------------------------------
//http://localhost:3000/functionCall/?functionId=1
app.get('/functionCall/', (req, res) => {
  // Access query parameters using req.query
  let functionId = req.query.functionId || 'Guest';
  let operation  = '';
  //
  switch (functionId) {
    case "1" :
      //
      operation = 'Doing OCR!';
      //
      doOcr('img/signatures/dest/36ee4ca6dbb018e553ac64708d13a8b6');
    break;
  }
  //
  let msg = `functionId = ${functionId} : [${operation}]`;
  //
  res.send(msg);
});
//
(async () => {
  //
  const result = await GetIndex();
  //
  app.get("/Index", (req, res) => {
    res.send(result);
  });
  //
  console.log(result);
})();
//----------------------------------
// DRIVER CODE
//----------------------------------
//
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})





