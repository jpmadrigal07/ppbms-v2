const Excel = require('exceljs');

const extractExcelFile = async (filePath) => {
    try {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(filePath);
        return workbook;
    } catch (error) {
        return error.message;
    }
}

module.exports = { extractExcelFile };