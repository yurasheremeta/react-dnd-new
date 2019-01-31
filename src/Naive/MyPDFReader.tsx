

import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
// import pdfFile from 'document.pdf';
import { any } from 'prop-types';

interface MyAppState  {
    file: any
    numPages: any
    pageNumber: number
}
class MyPDFReader extends Component {
  state: MyAppState = {
      file: 'document.pdf',
    numPages: null,
    pageNumber: 1,
  }
 
  onDocumentLoadSuccess = ({ numPages } : any) => {
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages, file} = this.state;
 
    return (
      <div>
        <Document
          file={file}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}
export default MyPDFReader;