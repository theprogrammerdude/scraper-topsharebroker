const puppeteer = require("puppeteer");
const fs = require("fs");
const excelJS = require("exceljs");

const workbook = new excelJS.Workbook();
const worksheet = workbook.addWorksheet("Sheet 1");
const path = "/Users/virender/Desktop";

worksheet.columns = [
  { header: "Broker", key: "broker", width: 10 },
  { header: "Office", key: "office", width: 10 },
  { header: "Address", key: "address", width: 10 },
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  var n = [];

  for (let p = 1; p <= 2; p++) {
    await page.goto(
      `https://www.topsharebrokers.com/city/pushkar/rajasthan/3140-${p}/`
    );

    const d = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll("tbody tr td"));
      return tds.map((td) => td.innerText);
    });

    d.shift();

    for (let i = 0; i < d.length; i += 4) {
      var a = [];

      for (let j = 0; j < 3; j++) {
        // a.push({
        //   Broker: d[i + 0],
        //   Office: d[i + 1],
        //   Address: d[i + 2],
        // });
        a.push(d[i + j]);
      }
      worksheet.addRow(a);

      //   n.push(a);
    }
  }

  //   console.log(n.length);

  await workbook.xlsx.writeFile(`${path}/pushkar.xlsx`);

  await browser.close();
})();
