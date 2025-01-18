var recLength = 0,
  recBuffers = [],
  sampleRate;

self.onmessage = function(e) {
  switch(e.data.command) {
    case 'init':
      init(e.data.config);
      break;
    case 'record':
      record(e.data.buffer);
      break;
    case 'exportWAV':
      exportWAV(e.data.type);
      break;
    case 'getBuffers':
      getBuffers();
      break;
    case 'clear':
      clear();
      break;
  }
};

function init(config) {
  sampleRate = config.sampleRate;
}

function record(inputBuffer) {
  recBuffers.push(inputBuffer[0]);
  recLength += inputBuffer[0].length;
}

function exportWAV(type) {
  var buffer = mergeBuffers(recBuffers, recLength);
  var dataview = encodeWAV(buffer);
  var audioBlob = new Blob([dataview], { type: type });

  self.postMessage(audioBlob);
}

function getBuffers() {
  var buffers = [];
  buffers.push(mergeBuffers(recBuffers, recLength));
  self.postMessage(buffers);
}

function clear() {
  recLength = 0;
  recBuffers = [];
}

function mergeBuffers(recBuffers, recLength) {
  var result = new Float32Array(recLength);
  var offset = 0;
  for (var i = 0; i < recBuffers.length; i++) {
    result.set(recBuffers[i], offset);
    offset += recBuffers[i].length;
  }
  return result;
[_{{{CITATION{{{_1{](https://github.com/AbirdFlying/GreedySpeech/tree/9272cdcd9745d4016dee2d513f9614fbaae05c5f/GreedySpeech%2FScripts%2FgreedySpeech%2Frecorder.js)[_{{{CITATION{{{_2{](https://github.com/nanakwame667/X-Voice-Software/tree/406dc3fdf8a443d1d52c90b8452320e602a54f54/static%2Fjs%2FvoiceRecorder.js)[_{{{CITATION{{{_3{](https://github.com/alexwchen/RehabApp_Django/tree/25af220c75490aa5bf0941d3b96e9e94e0db516c/static_media_alex%2Faudio%2Frecorder.js)[_{{{CITATION{{{_4{](https://github.com/israelspjr/testeseuidioma/tree/30ce897c55d96c5c044e2c39310153b2503983c4/testes%2FWebcam%2Frecorder.js)[_{{{CITATION{{{_5{](https://github.com/anvth/MIR/tree/d15cd075c989fc9ccb55edafedcfd161e3bf09b2/static%2Fjs%2Frecorder.js)[_{{{CITATION{{{_6{](https://github.com/lcolantuono/docVox/tree/315de6f1bcb7883513ef30656d6c25ca5ab41f36/AudioRecorder%2Fjs%2Frecorderjs%2Frecorder.js)[_{{{CITATION{{{_7{](https://github.com/spaguette/hack-web/tree/ebfbaaba2c3d09d1ce48b003940d0bc43ac60818/src%2Fjs%2Futils%2FrecorderWorker.js)[_{{{CITATION{{{_8{](https://github.com/Kaayo/TESTTCC2/tree/f9082c41b8d33077bca5f5a741c673d39201dd99/caio_prototipo_final_apresentacao%2Fjs%2Flib%2FrecorderWorker.js)[_{{{CITATION{{{_9{](https://github.com/neowutran/Devint2014/tree/5b25134161534dedc7614e0e18cdef7207e393d1/Argyros%2Fbin%2Fjs%2Fmicro%2FrecorderWorker.js)[_{{{CITATION{{{_10{](https://github.com/urbien/urbini/tree/76f16bf529b62f5a2ee959fa78073b044f5bc35d/js%2Flib%2FrecorderWorker.js)[_{{{CITATION{{{_11{](https://github.com/gonzeD/ingiVoice/tree/cb9d5f7be73f40fb704f28437319c6130809c9f7/src%2Fjs%2Fkaldi%2FrecorderWorker.js)[_{{{CITATION{{{_12{](https://github.com/ts-smith/ChroNotes/tree/189b41ed25898f8b2e0d7077dcf59dcb53d0a711/js%2Frecorderjs%2FrecorderWorker.js)