const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector(".btn_solid");

const container = document.querySelector(".container");

sign_up_btn.addEventListener('click',()=>{
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click',()=>{
  container.classList.remove("sign-up-mode");
});

///////////-------------GET USER REQUEST-------------//////////////////////////

function validateGetFormData() {
  const userId = $("#User-roll").val();
  const username = $("#User-SignUp").val();
  const userclass = $("#User-class").val();
  const userbirth = $("#User-birth").val();
  const useraddress = $("#User-address").val();
  const userenroll = $("#User-enroll").val();
  var jsonStrObj = {
    roll_no: userId,
    class: userclass,
    birth_date: userbirth,
    address: useraddress,
    enrollment_date: userenroll,
    full_name: username,
  };
  return JSON.stringify(jsonStrObj);
}

function createGETRequest(token, dbname, relationName, jsonObjStr) {
  const value1 = "{\n"
          + "\"token\" : \""
          + token
          + "\",\n" + "\"cmd\" : \"GET\",\n"
          + "\"dbName\": \""
          + dbname
          + "\",\n"
          + "\"rel\" : \""
          + relationName
          + "\",\n"
          + "\"jsonStr\":\n"
          + jsonObjStr
          + "\n"
          + "}";
  return value1;
}

function executeGetCommand(reqString, dbBaseUrl, apiEndPointUrl) {
  var url = dbBaseUrl + apiEndPointUrl;
  var jsonObj;
  $.post(url, reqString, function (result) {
  jsonObj = JSON.parse(result);
  }).fail(function (result) {
  var dataJsonObj = result.responseText;
  jsonObj = JSON.parse(dataJsonObj);
  });
  return jsonObj;
}

function resetSignInForm() {
  $("#User-SignUp").val("")
  $('#User-class').val('')
  $('#User-birth').val('')
  $('#User-address').val('')
  $('#User-enroll').val('')
  $('#User-roll').val('').focus()
}
  

function getUser() {
  var jsonStr = validateGetFormData();
  if (jsonStr === "") {
    return;
  }
  var getReqStr = createGETRequest("90931934|-31949300223197400|90960852","college_db", "stud", jsonStr);
  jQuery.ajaxSetup({async: false});
  var resultObj = executeGetCommand(getReqStr,"http://api.login2explore.com:5577", "/api/irl");
  
  if(resultObj["status"]==200){
    var data = JSON.stringify(resultObj);
    var details = JSON.parse(data);
    var user = JSON.parse(details["data"]);
    alert(user);
    swal("Info !", stringuser, "info");
  }else{
    swal("Error !","Please Try Again , User Not Found    ( Case Sensitive ).","error");
  }

  jQuery.ajaxSetup({async: true});
  resetSignInForm();
}



///////////-------------SignUp USER REQUEST-------------//////////////////////////

function validateSaveFormData() {
  //no need to validate input has been passed with required attribute
  
  const userId = $("#User-roll").val();
  const username = $("#User-SignUp").val();
  const userclass = $("#User-class").val();
  const userbirth = $("#User-birth").val();
  const useraddress = $("#User-address").val();
  const userenroll = $("#User-enroll").val();
  var jsonStrObj = {
    roll_no: userId,
    class: userclass,
    birth_date: userbirth,
    address: useraddress,
    enrollment_date: userenroll,
    full_name: username,
  };
  alert(JSON.stringify(jsonStrObj));
  return JSON.stringify(jsonStrObj);
}


function resetSignUpForm() {
  $("#User-SignUp").val("")
  $('#User-class').val('')
  $('#User-birth').val('')
  $('#User-address').val('')
  $('#User-enroll').val('')
  $('#User-roll').val('').focus()
}

// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonObj, dbName, relName) {
  var putRequest = "{\n"
          + "\"token\" : \""
          + connToken
          + "\","
          + "\"dbName\": \""
          + dbName
          + "\",\n" + "\"cmd\" : \"PUT\",\n"
          + "\"rel\" : \""
          + relName + "\","
          + "\"jsonStr\": \n"
          + jsonObj
          + "\n"
          + "}";
  return putRequest;
}

function executePutCommand(reqString, dbBaseUrl, apiEndPointUrl) {
  var url = dbBaseUrl + apiEndPointUrl;
  var jsonObj;
  $.post(url, reqString, function (result) {
  jsonObj = JSON.parse(result);
  }).fail(function (result) {
  var dataJsonObj = result.responseText;
  jsonObj = JSON.parse(dataJsonObj);
  });
  return jsonObj;
}

function saveUser() {
  var jsonStr = validateSaveFormData();
  if (jsonStr === "") {
    return;
  }
  var putReqStr = createPUTRequest("90931934|-31949300223197400|90960852",jsonStr, "college_db", "stud");
  // alert("PUT Request: "+putReqStr);
  jQuery.ajaxSetup({async: false});
  var resultObj = executePutCommand(putReqStr,"http://api.login2explore.com:5577", "/api/iml");
  alert("entered");
  jQuery.ajaxSetup({async: true});
  resetSignUpForm();
}