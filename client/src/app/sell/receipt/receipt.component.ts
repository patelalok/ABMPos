import { Component, OnInit, Inject, Input } from '@angular/core';
import * as jspdf from "jspdf";
import * as bootstrap from "bootstrap";
import { TransactionDtoList } from 'app/sell/sell.component';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
  providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class ReceiptComponent implements OnInit {
  @Input() data: ReceiptData;
  private pageHeightPts: number;
  private pageWidthPts: number;
  private fontSize: number;
  private MM_TO_POINT = 2.83465;
  private charactersPerLine;
  private maxLines: number;
  private spacingBetweenLines: number;
  private spacingBetweenCharacters: number;
  private document: jspdf;
  private currentLine: number = 0;

  constructor( @Inject('Window') private window: Window) {
    this.pageWidthPts = 80 * this.MM_TO_POINT;
    this.pageHeightPts = 1000 * this.MM_TO_POINT;
    this.charactersPerLine = 56;
    this.fontSize = this.pageWidthPts * 2 / this.charactersPerLine;
    this.spacingBetweenCharacters = this.fontSize;
    this.spacingBetweenLines = this.fontSize * 2;
    this.maxLines = this.pageHeightPts / this.spacingBetweenLines;
  }

  ngOnInit() {
    this.document = new jspdf({
      orientation: 'potrait',
      unit: 'pt',
      format: [this.pageWidthPts, this.pageHeightPts]
    });
    console.log('Max Lines', this.maxLines);
    this.document.setFontSize(this.fontSize);
    this.document.setFont("courier");
    // console.log("Font list", this.document.getFontList());
    // this.document
    // this.print()
  }

  convertImageToCanvas(imageUrl: string) {
    var image = document.createElement('img');
    image.src = imageUrl;
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    console.log(image);
    canvas.getContext("2d").drawImage(image, 0, 0);

    return canvas;
  }
  centerText(text: string, line: number): { x: number, y: number, text: string } {
    let length = text.length;
    const width = this.pageWidthPts;
    const height = this.pageHeightPts;

    console.log(length);
    let data = {
      text: text,
      x: (width - length * 11.33 * 2) / 2,
      y: line * 11.33
    }
    console.log(data);
    return data;
  }
  docTest(doc: jspdf) {
    const fontSize = this.fontSize;
    let i, j;
    let text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (i = 0; i < this.maxLines; i++) {
      for (j = 0; j < this.charactersPerLine; j++) {
        let index = ((j) % text.length);
        if (i << 1)
          console.log(index);
        doc.text(text.split('')[index], j * this.spacingBetweenCharacters, i * this.spacingBetweenLines)
      }
    }
  }
  drawLine(doc: jspdf, line: number) {
    for (let i = 1; i < this.charactersPerLine - 29; i++) {
      doc.text(`-`, i * this.spacingBetweenCharacters, line);
    }
  }

  addLineItemData(doc: jspdf) {
    let transactionList = this.data.transactionLineItemDtoList;


    let line = (8) * this.spacingBetweenLines;
    doc.setFontSize(this.fontSize);
    doc.text(`Product No.`, 2 * this.spacingBetweenCharacters, line);
    doc.text(`Description`, 12 * this.spacingBetweenCharacters, line);
    doc.text(`Retail`, 22 * this.spacingBetweenCharacters, line);
    doc.setFontSize(this.fontSize);
    this.drawLine(doc, 9 * this.spacingBetweenLines);
    let lineAdjustment = 0;
    transactionList.forEach((data, i) => {

      let productDescription = data.productDescription.trim();
      let productDescriptionLines = [];
      const descriptionLength = productDescription.length;
      let lines = descriptionLength / 16;
      for (let z = 1; z <= lines + 1; z++) {
        let low = ((z - 1) * 16)
        let high = descriptionLength > z ? z * 16 : descriptionLength;
        productDescriptionLines.push(productDescription.substring(low, high));
      }

      line = (10 + i + lineAdjustment) * this.spacingBetweenLines;
      doc.text(`${data.productNumber}`, 2 * this.spacingBetweenCharacters, line);
      let adjust = 0;
      productDescriptionLines.forEach((lineData) => {
        doc.text(`${lineData}`, 12 * this.spacingBetweenCharacters, line + (adjust * this.spacingBetweenLines));
        adjust++;
        lineAdjustment++;
      })
      doc.text(`$ ${data.cost}`, 23 * this.spacingBetweenCharacters, line);

    })
    line = line + 3 * this.spacingBetweenLines
    this.drawLine(doc, line);

    this.currentLine = line;
  }

  addStoreDetails(doc: jspdf) {
    const startLine = 3;
    const endLine = 4 + startLine;
    let currentLine = startLine;
    const store = {
      name: "Pitts & PUtt store",
      address: "123 demo stuff ghhghg hghgg jhk",
      phone: "(123) 345-7654"
    }
    let x = (this.charactersPerLine - store.name.length) / 2;
    doc.text(store.name, x * (this.spacingBetweenCharacters / 2), ++currentLine * this.spacingBetweenLines);
    x = (this.charactersPerLine - store.address.length) / 2;
    doc.text(store.address, x * (this.spacingBetweenCharacters / 2), ++currentLine * this.spacingBetweenLines);
    x = (this.charactersPerLine - store.phone.length) / 2;
    doc.text(store.phone, x * (this.spacingBetweenCharacters / 2), ++currentLine * this.spacingBetweenLines);

  }
  spacePad(data: string, finalLength: number) {
    let length = data.length;

    let arr = data.trim().split('');

    while (arr.length < finalLength) {
      arr = arr.concat(" ");
    };

    return arr.join('');
  }
  addLogo(doc: jspdf) {
    let imgData = "data:image/jpeg;base64,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";
    doc.addImage({
      imageData: imgData,
      x: 6 * this.spacingBetweenCharacters,
      y: 4 * this.spacingBetweenLines,
      h: 10 * this.MM_TO_POINT,
      w: 50 * this.MM_TO_POINT,
      format: 'JPEG'
    });
  }
  addTotalSaleData(doc: jspdf) {
    let line = this.currentLine + 1 * this.spacingBetweenLines;
    let receiptData = this.data.transactionDtoList[0];
    doc.text(`Subtotal`, 12 * this.spacingBetweenCharacters, line);
    doc.text(`$${receiptData.subTotal}`, 20 * this.spacingBetweenCharacters, line);

    line = line + 1 * this.spacingBetweenLines;
    doc.text(`Tax 7.00%`, 12 * this.spacingBetweenCharacters, line);
    doc.text(`$${receiptData.tax}`, 20 * this.spacingBetweenCharacters, line);

    line = line + 1 * this.spacingBetweenLines;
    doc.text(`Discount`, 12 * this.spacingBetweenCharacters, line);
    doc.text(`$${receiptData.discount}`, 20 * this.spacingBetweenCharacters, line);

    line = line + 1 * this.spacingBetweenLines;
    doc.text(`Total`, 12 * this.spacingBetweenCharacters, line);
    doc.text(`$${receiptData.totalAmount}`, 20 * this.spacingBetweenCharacters, line);


    if (receiptData.paidAmountCash > 0) {
      line = line + 1 * this.spacingBetweenLines;
      doc.text(`Paid by Cash`, 2 * this.spacingBetweenCharacters, line);
      doc.text(`Amount`, 12 * this.spacingBetweenCharacters, line);
      doc.text(`$${receiptData.paidAmountCash}`, 20 * this.spacingBetweenCharacters, line);
    }


    if (receiptData.paidAmountCheck > 0) {
      line = line + 1 * this.spacingBetweenLines;
      doc.text(`Paid by Check`, 2 * this.spacingBetweenCharacters, line);
      doc.text(`Amount`, 12 * this.spacingBetweenCharacters, line);
      doc.text(`$${receiptData.paidAmountCheck}`, 20 * this.spacingBetweenCharacters, line);
    }


    if (receiptData.paidAmountDebit > 0) {
      line = line + 1 * this.spacingBetweenLines;
      doc.text(`Paid by Check`, 2 * this.spacingBetweenCharacters, line);
      doc.text(`Amount`, 12 * this.spacingBetweenCharacters, line);
      doc.text(`$${receiptData.paidAmountDebit}`, 20 * this.spacingBetweenCharacters, line);
    }

    if (receiptData.paidAmountCredit > 0) {
      line = line + 1 * this.spacingBetweenLines;
      doc.text(`Paid by Check`, 2 * this.spacingBetweenCharacters, line);
      doc.text(`Amount`, 12 * this.spacingBetweenCharacters, line);
      doc.text(`$${receiptData.paidAmountCredit}`, 20 * this.spacingBetweenCharacters, line);
    }

    line = line + 3 * this.spacingBetweenLines;
    doc.text(`Thank you for your business!`, 5.5 * this.spacingBetweenCharacters, line);

  }

  print() {
    this.addLineItemData(this.document);
    this.addStoreDetails(this.document);
    this.addTotalSaleData(this.document);
    window.open(this.document.output('bloburl'), '_blank')
  }

  download() {

    let doc = new jspdf({
      orientation: 'potrait',
      unit: 'mm',
      format: [80, 297]

    });
    // doc.setFontSize(8);
    // doc.text('Hello world!', 0, 0);
    // doc.text(0, 0, 'This is client-side Javascript, pumping out a PDF.');
    // doc.addPage();
    // doc.text(0, 0, 'http://www.coding4developers.com/');

    // Save the PDF
    doc.save('Test.pdf');
    doc.autoPrint();

  }

}
export interface ReceiptData {
  transactionDtoList: Array<ReceiptTotalDetails>;
  transactionLineItemDtoList: Array<ReceiptLineItems>;
  customerDtosList: Array<any>
}
export interface ReceiptLineItems {
  productNumber: string;
  productDescription: string;
  cost: number;
}
export interface ReceiptTotalDetails {
  subTotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  paidAmountCash: number;
  paidAmountCredit: number;
  paidAmountCheck: number;
  paidAmountDebit: number;

}
