/**
Functions in Sequential Task
**/

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomElement (list){
  return list[Math.floor(Math.random()*list.length)];
}

function loadFacePool(start,end) { //the start and ending index of the images
  var pool = [];
  for(i = start; i < (end+1); i++){
     //pool.push( 'img/A' + i + '.jpg');
     pool.push( 'img/B' + i + '.jpg');
     pool.push( 'img/C' + i + '.jpg'); pool.push( 'img/D' + i + '.jpg');
     pool.push( 'img/E' + i + '.jpg'); pool.push( 'img/F' + i + '.jpg');
     //pool.push( 'img/G' + i + '.jpg');
     pool.push( 'img/H' + i + '.jpg');
   }
  return pool;
}


function loadStimulus(end) { //the start and ending index of the images
  var list = [];
  for(i = 1; i < (end+1); i++){
    list.push( 'stimulus/' + i + '.jpg');}
  return list;
}


function check_consent (){
  if ($('#consent_checkbox').is(':checked')) {
    return true;
  }else {
    alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
    return false;}
}

function checkID (){
  var lasttrialdata = jsPsych.data.getLastTrialData().select('responses').values[0];
  var textInput = JSON.parse(lasttrialdata).Q0;
  var patt = new RegExp("^[a-zA-Z_0-9]{1,}$"); //the first and last character (this doesn't allow punctuations)
    if (!patt.test(textInput)){      //test if first/last character in response exist
      alert("Please, enter your participant id");
      return true; }
    else{ return false;}
}


function checkPhone (){
  var choice = jsPsych.data.getLastTrialData().select('button_pressed').values[0];
  if(choice == 0){
    alert('As mentioned in the study description, this study can only be done a computer and would not work on a smartphone. Your experiment will be terminated and the window will be closed.');
    window.close();
    return true;
  } else { return false;}
}

  function getWord (){ //get a word for attention check from the word list
    Face.word = Face.wordList.shift();
    return Face.word;
  }


  function checkTyping(){  //test if type correctly
    var inputText = jsPsych.data.getLastTrialData().select('responses').values[0];
    var text = JSON.parse(inputText).Q0;
    if (Face.word !== text){
      falseAnswer += 1;
      alert("Attention! Please type the word correctly. If the alert shows up 4 times, the experiment will be automatically terminated.");
      Face.wordList.unshift(Face.word);
      if (falseAnswer == falseAllowance){ //if participant gets alert this number of times
        alert("Hi! You've made too much errors in typing the word suggesting that you are not paying attention to the task. The task will be terminated");
        window.close();
      }else{return true;} }
    else {falseAnswer = 0; return false} //reset falseAnswer
  }

  function getTrialSetting (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
    Face.fixationTime = getRandomElement([400, 500, 600]);

    Face.facePool = [ ] // Reset the array that keeps track of the items that were shown
    
    //choose face_itive or negative valence before displaying faces
    Face.emotionX = 100; //set to choose from negative valence faces
    //choose the identity of the face
    Face.personX = getRandomElement(['B','C','D','E','F','H']); //randomally choose from ['A','B','C','D'] -- select person

    return Face.fixationTime;
  }

  function getFixationTime (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
    Face.fixationTime = getRandomElement([400, 500, 600]);
    return Face.fixationTime;
  }

  function getFaceSample (){  //get the sample of faces in each trial
    Face.singleFace = getRandomInt(1, 50);
    Face.image = ('img/'+ Face.personX +(Face.emotionX + Face.singleFace)+'.jpg')
    return Face.image;
  }

  function memoryFace(){ //Select face for memory task
    var correctFace = getRandomElement(Face.facePool); //selects a random picture of the ones that have been shown in the trial
    var wrongFace = ImageToNumber(Face.facePool); //Before we can get a false picture, we need to transform picture array into number array (which starts from lowest number)
    wrongFace = falseFace(wrongFace); // getting a false picture. That is located between the real pictures that had the biggest distance to each other.
    var leftPicture = []; //
    var rightPicture = [];
    order = shuffle();
    if (order == 1){
      leftPicture = correctFace;
      rightPicture = wrongFace;
    } else {
      leftPicture = wrongFace;
      rightPicture = correctFace;
    }
    var stimulus_iamages = "<div id='myDiv' style='height: 200px; width: 560px'>" + "<div style='float: left;'><img src=" + "'" + leftPicture + "'" +  "></img>" + "</div>" + "<div style='float: right;'><img src=" + "'" + rightPicture + "'" + "></img>" + "</div>"; //if you want to change the left pictures position go to jspsych css and change #myDiv to change right position picture change widht of first div
    return stimulus_iamages;
  }

  function memoryFace1(){ //Select face for memory task
    var correctFace = getRandomElement(Face.facePool); //selects a random picture of the ones that have been shown in the trial
    var wrongFace = ImageToNumber(Face.facePool); //Before we can get a false picture, we need to transform picture array into number array (which starts from lowest number)
    wrongFace = falseFace(wrongFace); // getting a false picture. That is located between the real pictures that had the biggest distance to each other.
    var leftPicture = []; //
    var rightPicture = [];
    order = shuffle();
    if (order == 1){
      leftPicture = correctFace;
      rightPicture = wrongFace;
    } else {
      leftPicture = wrongFace;
      rightPicture = correctFace;
    }
    var stimulus_iamages = "<p> Indicate which of the target faces had the <strong> same expression </strong> as one in the sequence </p>" + "<div style='height: 200px; width: 700px'>" + "<div style='float: left;'><img src=" + "'" + leftPicture + "'" +  "></img>" + "</div>" + "<div style='float: right;'><img src=" + "'" + rightPicture + "'" + "></img>" + "</div>"; //if you want to change the left pictures position go to jspsych css and change #myDiv to change right position picture change widht of first div
    return stimulus_iamages;
  }


  function ImageToNumber (facePool) { // This function transforms the image array into a number array that starts from the lowest number for further processing
    var imageToNumb = facePool;
    imageNumb = imageToNumb.toString().replace(/[^0-9,]/g, '');
    imageNumb = imageNumb.split(',');
    imageNumb = imageNumb.sort(function(a, b){return a-b});
    return imageNumb;
  }

  function falseFace(imageNumb){ //This function returnes a fasle picture that is in the middle of 2 real images that have the biggest distance between them.
    var imageDiff = diff(imageNumb); //this line returnes an array representing the distances between two real pictures
    var middle = Math.round(imageDiff/2); // variable that will be used to construct the false picture. This is the distance to the middle between two real pictures, where we want to create the wrong picture.
    var index = PicHighestIndex(imageNumb); // This function locates the position of the lower real face that has the highest distance to the next real face, which we will use to construct the wrong picture.
    var PictureBase = imageNumb[index]; // Selects the value of  of the lower real face. By adding the middle variable we will have the correct valence for the wrong picture
    var FalsePicture = ('img/' + Face.personX+ (+PictureBase + +middle)+'.jpg'); // creating the picture name with correct valence etc.
    return FalsePicture;
  }

  function diff(ary) { //This function returns the biggest difference between neighboors of right (presented in sequence) pictures
    var newA = []; // temp array
    for (var i = 1; i < ary.length; i++) // calculates the difference between the neighbours and returns this into the temp variable
        newA.push(ary[i] - ary[i - 1]);
    newA = Math.max.apply(null, newA) // selects the biggest difference value
    return newA;
}

function PicHighestIndex(ary) { //This function finds index of array that has the biggest distance to its neigbour
  var newB = []; // the first 2 lines are identical to the diff(), and return an array of difference scores
  for (var i = 1; i < ary.length; i++)
      newB.push(ary[i] - ary[i - 1]);
  var highestDiffIndex = indexOfMax(newB); // calls a function that finds the index biggest value in an arrays
  return highestDiffIndex;

}

function indexOfMax(arr) { //This function finds the index of the value in an array that has the higest value
    if (arr.length === 0) { // In case for some reason an array is 0, which shouldnt happen
        return -1;
    }

    var max = arr[0]; // starts by selecting the first element in an array
    var maxIndex = 0; // this variable will rememeber the index of the highest index

    for (var i = 1; i < arr.length; i++) { // loops through the array and checks if the current highest value and its index is smaller than its neigbhour. If so the index and its value shifts to the next element in the array.
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

    /*
     * You must use this cognitoIdentityPool string value and
     * the "task-data-raw" value for DATA_BUCKET. The DIRECTORY value
     * will change based on the task.
     */

    const cognitoIdentityPool = "us-east-1:0f699842-4091-432f-8b93-a2d4b7bb5f20";
    const DATA_BUCKET = "task-data-raw";
    const DIRECTORY = "amplification-sequential-gender-megan-oct-1-2021-production";

    /*
     * Save data at any point to S3 using this function.
     * It takes as arguments the string identifier of a participant
     * and the data in CSV form from the jsPsych data getter.
     */

     function saveDataToS3() {


     id = Face.ID
     csv = jsPsych.data.get().csv()

     AWS.config.update({
       region: "us-east-1",
       credentials: new AWS.CognitoIdentityCredentials({
         IdentityPoolId: cognitoIdentityPool
       }),
     });

     const filename = `${DIRECTORY}/${id}.csv`;

     const bucket = new AWS.S3({
       params: { Bucket: DATA_BUCKET },
       apiVersion: "2006-03-01",
     })

     const objParams = {
       Key: filename,
       Body: csv
     }

     bucket.putObject(objParams, function(err, data) {
       if (err) {
         console.log("Error: ", err.message);
       } else {
         console.log("Data: ", data);
       }
     });
   }
   // For randomizing order //
   function shuffle() {
     var a = [];
     var order = [];
     order = getRandomElement([1, 2]);
     return order;
   }
