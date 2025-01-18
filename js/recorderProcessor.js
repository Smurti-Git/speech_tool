class RecorderProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.recording = false;
    this.buffers = [];
  }

  process(inputs) {
    if (!this.recording) return true;

    const input = inputs[0];
    const buffer = input[0];

    this.port.postMessage({
      command: 'record',
      buffer: buffer
    });

    return true;
  }
  
  static get parameterDescriptors() {
    return [];
  }
}

registerProcessor('recorder-processor', RecorderProcessor);
