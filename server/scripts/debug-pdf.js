/* Used to DEBUG PDF templates */
const pdfFormFill = require('pdf-form-fill')

const srcPdf = `./scripts/pdf-template.pdf`
pdfFormFill.fields(srcPdf).then(console.log).catch(console.error)
