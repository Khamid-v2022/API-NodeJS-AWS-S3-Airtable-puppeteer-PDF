const puppeteer = require('puppeteer');
const ejs = require('ejs');

const take_screenshot = async(pdf_url) => {
    const browser = await puppeteer.launch({
        args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials'
        ]
    });
    const page = await browser.newPage();

    const url = pdf_url;

    const html = await ejs.renderFile('./src/template.ejs', { data: { url } });

    await page.setContent(html);
    await page.waitForNetworkIdle();
    await waitforme(5000);

    // const image = await page.screenshot({ encoding: 'base64' });

    let file_name = new Date().getTime() + '.png';
    await page.screenshot({ path: './screenshots/' + file_name });

    await browser.close();
    return __dirname + '/../screenshots/' + file_name;
};

function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}

module.exports = take_screenshot;