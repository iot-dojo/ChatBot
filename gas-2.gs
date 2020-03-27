function doPost(e) {
  if (e.parameter.token != "<Outcoming Webhookのtoken>") {
    return;
  }
  array = e.parameter.text.split(" ");  
  if (array.length > 1) {
      // 一旦おうむ返しで投稿する
      postSlack(array[1], e.parameter.user_id);
      appendRow(array[1]);
  }
}

function appendRow(text) {
  var spreadsheetId = "<スプレッドシートID>";
  var sheetName = "<シート名>";
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(sheetName);
  sheet.appendRow([new Date(),text]);
  return text;  
}

function postSlack(text, userId) {
  var url = "<Incoming WebhooksのURL>";  
  var payload = {
    text: "<@"+ userId + "> " + text
  };
  var options = {
    "method" : "POST",
    "headers": {"Content-type": "application/json"},
    "payload": JSON.stringify(payload)
  };
  UrlFetchApp.fetch(url, options); 
}
