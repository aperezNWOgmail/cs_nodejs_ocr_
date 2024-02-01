//----------------------------------
//----------------------------------

const Tesseract = require('tesseract.js');

async function recognizeText(imagePath) {
  const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
  console.log("texto en imagen :" + text);
}

recognizeText('img/signatures/signature.png');




