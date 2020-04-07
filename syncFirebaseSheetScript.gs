/*
---------------------------------------
This is a Google Apps Script
to sync a google sheet
with a firebase project
---------------------------------------
*/

var secret = 'pIn5rwss5umzO8td2OMNcue8Uc28dyc7mcPD7ALj'

function getFirebaseUrl(jsonPath) {
  return (
    'https://the-facemask-project.firebaseio.com/' +
    jsonPath +
    '.json?auth=' +
    secret
  )
}

// https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app
function syncSheet(sheet, excelData) {
  var fireBaseUrl = getFirebaseUrl(sheet)
  var options = {
    method: 'put',
    contentType: 'application/json',
    payload: JSON.stringify(excelData)
  }

  Logger.log(fireBaseUrl, options)

  UrlFetchApp.fetch(fireBaseUrl, options)
}

function convertSheet2JsonText(sheet) {
  // first line(title)
  var colStartIndex = 1
  var rowNum = 1
  var firstRange = sheet.getRange(1, 1, 1, sheet.getLastColumn())
  var firstRowValues = firstRange.getValues()
  var titleColumns = firstRowValues[0]

  // after the second line(data)
  var lastRow = sheet.getLastRow()
  var rowValues = []
  for(var rowIndex = 2; rowIndex <= lastRow; rowIndex++) {
    var colStartIndex = 1
    var rowNum = 1
    var range = sheet.getRange(rowIndex, colStartIndex, rowNum, sheet.getLastColumn())
    var values = range.getValues()
    rowValues.push(values[0])
  }

  // create json
  var jsonArray = [];
  for(var i = 0 ; i < rowValues.length; i++) {
    var line = rowValues[i]
    var json = new Object()

    for(var j = 0; j < titleColumns.length; j++) {
      json[titleColumns[j]] = line[j]
    }

    jsonArray.push(json);
  }

  return jsonArray;
}

// https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app
function startSync() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets()

  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i]
    var json = convertSheet2JsonText(sheet)
    var name = sheet.getName()

    syncSheet(name, json)
  }
}
