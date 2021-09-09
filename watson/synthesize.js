const fs = require('fs');
const path = require('path')
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const credentials = require('./apikey-ibm-cloud-tts.json')
const textToConvert = fs.readFileSync(path.join(__dirname, './transcription.txt'), 'utf8')

async function synthesize() {
  const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey: credentials.apikey,
    }),
    serviceUrl: credentials.url,
  });

  const params = {
    text: textToConvert,
    voice: 'pt-BR_IsabelaV3Voice', // Optional voice
    accept: 'audio/wav'
  };

  // Synthesize speech, correct the wav header, then save to disk
  // (wav header requires a file length, but this is unknown until after the header is already generated and sent)
  // note that `repairWavHeaderStream` will read the whole stream into memory in order to process it.
  // the method returns a Promise that resolves with the repaired buffer
  await textToSpeech
    .synthesize(params)
    .then(response => {
      const audio = response.result;
      return textToSpeech.repairWavHeaderStream(audio);
    })
    .then(repairedFile => {
      fs.writeFileSync('audio.wav', repairedFile);
      console.log('audio.wav written with a corrected wav header');
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = synthesize
// // or, using WebSockets
// textToSpeech.synthesizeUsingWebSocket(params);
// synthStream.pipe(fs.createWriteStream('./audio.ogg'));
// see more information in examples/text_to_speech_websocket.js
