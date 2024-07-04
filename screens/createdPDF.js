import { PDFDocument, Page, Text, StyleSheet } from 'react-native-pdf-lib';
import RNFS from 'react-native-fs';

const createPDF = async (data) => {
  const { title, content } = data;

  // Define styles
  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 10,
    },
    content: {
      fontSize: 12,
      color: '#000000',
      marginBottom: 10,
    },
  });

  // Create a page with text content
  const page = Page.create()
    .setMediaBox(612, 792) // Standard A4 size
    .drawText(title, {
      x: 30,
      y: 750,
      fontSize: styles.title.fontSize,
      color: styles.title.color,
    })
    .drawText(content, {
      x: 30,
      y: 730,
      fontSize: styles.content.fontSize,
      color: styles.content.color,
    });

  // Define the PDF file path
  const pdfPath = `${RNFS.DocumentDirectoryPath}/data.pdf`;

  // Create the PDF document
  const pdfDoc = PDFDocument.create(pdfPath)
    .addPages(page)
    .write() // Returns a promise that resolves with the PDF's path

  return pdfDoc;
};

export default createPDF;