import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  printBlob = printBlob;
  printBlobUrl = printBlobUrl;

}

export const printBlob = (blob: Blob) => {
  $('#printBlob').remove();
  
  let url = URL.createObjectURL(blob);

  if ($('#printBlob').length == 0) {
    $("body").append(
      `<iframe style="display:none;" id="printBlob" src="${url}" frameborder="0" allowfullscreen=""></iframe>`
    );

  } else {
    $("printBlob").replaceWith(
      `<iframe style="display:none;" id="printBlob" src="${url}" frameborder="0" allowfullscreen=""></iframe>`
    );

  }

  let doc: any = document.getElementById('printBlob');
  doc.focus();
  
  doc.contentWindow.print();

}

export const printBlobUrl = (blobUrl:any) =>{

  if ($('#printBlob').length == 0) {
    $("body").append(
      `<iframe style="display:none;" id="printBlob" src="${blobUrl}" frameborder="0" allowfullscreen=""></iframe>`
    );

  } else {
    $("printBlob").replaceWith(
      `<iframe style="display:none;" id="printBlob" src="${blobUrl}" frameborder="0" allowfullscreen=""></iframe>`
    );

  }
  let doc: any = document.getElementById('printBlob');
  doc.focus();
  
  doc.contentWindow.print();
}