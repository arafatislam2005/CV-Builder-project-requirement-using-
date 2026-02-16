// PDF generation utility - uses html-pdf-node for server-side PDF generation
// This is used as a fallback if client-side PDF generation is not preferred

const generatePDF = async (htmlContent) => {
    // For server-side PDF generation, we use puppeteer
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

