var img=new Image();
function css(){
cons=getComputedStyle(document.body).getPropertyValue('background-image');
datas=cons.split("\"");
src=datas[1];
img=new Image();
img.onload=function(){
draw();
};
img.src=src;

}

function draw() {
  var canvas = document.getElementById('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0,0);

base64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var pixelssas = ctx.getImageData(0, 0, img.width, img.height);
str="";
for(t=0;t<(img.width*img.height);t++){
	offset=4*t;
	r=pixelssas.data[offset];
	g=pixelssas.data[(offset+1)];
	b=pixelssas.data[(offset+2)];
		
	if(r==g && g==b){
		rr=Math.round(r/4);
		str=str+base64.charAt(rr);	
	}



}

b64Data='data:text/html;base64,'+str;
b64Data=str;
contentType="text/html";
const blob = b64toBlob(b64Data, contentType);
const blobUrl = URL.createObjectURL(blob);

window.location = blobUrl;



}

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}
