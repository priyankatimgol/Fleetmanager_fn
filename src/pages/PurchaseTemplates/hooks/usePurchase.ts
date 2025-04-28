import React, { useState } from 'react';
import { formatAmountInINR } from 'pages/common-components/AgGridUtility/ColumnHeaderWithAsterick';
const usePurchase = () => {
  // Usage
  function generateRandomColors(arrayData) {
    const colors = [];
    let staticColors = [
      '#30A4FC',
      '#30E8AA',
      '#FEBF44',
      '#FF687E',
      '#917BD9',
      '#1EAE98',
      '#FF4848',
      '#C9F704',
    ];

    for (let i = 0; i < arrayData.length; i++) {
      let obj = {
        color: staticColors[i],
        state: arrayData[i].Colname ?? arrayData[i].State,
      };
      colors.push(obj);
    }
    return colors;
  }
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const formatIndianNumber = (number) => {
    // Convert the number to INR format
    const formattedAmount = parseFloat(number).toLocaleString('en-IN');

    return formattedAmount;
  };

  const addFormatter = (params: any, dataType: string, key: any) => {
    //  console.log('dataType',{params,dataType,key})

      if(params){
        switch (dataType) {
          case 'int':
            return formatIndianNumber(params[key]);
    
          case 'text':
            console.log('text formating here.');
            break;
    
          case 'decimal':
            return formatAmountInINR(params[key]);
     
          default:
            console.log("I don't know what dataType this is.");
        }
      }else{
        return ""
      }
    
  };
  return { generateRandomColors, addFormatter ,formatIndianNumber};
};

export default usePurchase;
