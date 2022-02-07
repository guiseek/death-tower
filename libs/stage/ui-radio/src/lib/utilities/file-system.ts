export class FileSystem {
  createInput() {
    return new Promise((resolve, reject) => {
      const container = document.createElement('div');

      const input = document.createElement('input');
      input.type = 'file';

      const overlay = document.createElement('div');
      overlay.onclick = () => input.click();

      container.appendChild(overlay);
      container.appendChild(input);

      const files = input.files || [];

      input.onchange = () => {
        if (files && files.length > 0) {
          this.loadFile(files[0]).then((buffer) => {
            container.removeChild(overlay);
            container.removeChild(input);
            resolve(buffer);
          });
        } else {
          reject('No file selected');
        }
      };
    });
  }

  loadFile(file: File) {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = (err) => reject(err);

      reader.readAsArrayBuffer(file);
    });
  }

  loadAudio(buffer: ArrayBuffer) {
    const audio = new Audio();
    audio.src = URL.createObjectURL(new Blob([buffer]));
    return audio;
  }
}
