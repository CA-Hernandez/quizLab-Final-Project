/**
 * This is where you will create routes for our
 * questions API
 * Base url: /api/questions
 * We have imported express and router and
 * exported the router. 
 * 
 * Your task is to fill in the router with appropriate
 * routes and implement the functionality of getting
 * data from mongodb and return appropriate results
 */

const express = require('express');
const router = express.Router();
router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// Question Data
const Questions = require('../../models/questions-data.json')
// Hint: get a bonus task here
const shuffleArray = require('../../utils/shuffle');


/**
 * Route details
 * api GET /api/questions
 * Description: Get all questions in the database
 * IMPORTANT: remove the answers from it's data
 * we don't want the client to know the answer.
 * 
 * Structure of the return JSON:
 * [
 *    {
 *      question: 'sample question',
 *      options: [
 *        'option1',
 *        'option2'
 *      ],
 *      id: '1234'
 *    }
 * ]
 * 
 */


router.get('/', (req, res) => {
  try{
  let remAnswer = [...Questions];
  questionsUpdated = remAnswer.map(question => ({question:question.question, options:question.options,id: question.id}))
   return res.send(questionsUpdated)  
  } 
  catch(error){
  return res.status(500).send({"error": error})
}
})

/**
 * Route details
 * api GET /api/questions/count
 * Description: This will get the count of the questions
 * from the database and return it 
 * Structure of the return JSON:
 * {
 *  count: 4
 * }
 */
router.get('/count', (req, res) => {
  // Remove the lines below and write your implementation
  try{
    let remAnswer = [...Questions];
    let count = remAnswer.length

     return res.json({count: count})  
    } 
    catch(error){
    return res.status(500).send({"error": error})
  }
  
})

/**
 * Route details
 * api GET /api/questions/:qId
 * Description: This will get one question given the question ID
 * Structure of the return JSON:
 * {
 *    question: 'sample question',
 *    options: [
 *      'option1',
 *      'option2'
 *    ],
 *    id: '1234'
 * }
 */
router.get('/:qId', (req, res) => {
  try{
     const _id = req.params.qId
     let remAnswer = [...Questions]; 
     questionsUpdated = remAnswer.map(question => ({question:question.question, options:question.options,id: question.id}))
     const index = questionsUpdated.findIndex(x => x.id === _id)
     return res.send(questionsUpdated[index])  
    } 
    catch(error){
    return res.status(500).send({"error": error})
  }
  
})


/**
 * Route details
 * api POST /api/questions/result
 * Description: This will receive a body with user
 * entered answers and will return the results. 
 * Calculation of the result will happen here and you
 * would only send the results.
 * 
 * Structure of body JSON:
 * {
 *    'questionID': 'user-answer',
 *    'questionID': 'user-answer'
 * }
 * 
 * Structure of the return JSON:
 * {
 *    summary: 'passed OR failed',
 *    score: (how many answers were correct),
 *    total: (how many questions were there)
 * }
 */
  router.post('/result', (req, res) => {
  try{
    let answerList = [];    //declare empty answer list
    let userList = [];      
    for(let i = 0; i < Questions.length; i++){
      answerList.push(Questions[i].answer);
    }

   // let userList= Object.entries(req.body)
   for (const [key,value] of Object.entries(req.body)) {
      userList.push(`${value}`);
  }
    let score = 0;
    console.log(answerList);
    console.log(userList)
    count = Questions.length;

    for (let i = 0; i<count; i++)
    {
      if (answerList[i] == userList[i])
      {
        score++;
      }

    } 

    result = null;
    scorePercent = (score/count)*100;
    if(scorePercent >50)
    {
      result="passed";
    }
    else 
    {
      result="failed"
    }
  
    res.send({summary: result, score: score, total: Questions.length});
   } 
   catch(error){
   return res.status(500).send({"error": error})
 }
 
})


module.exports = router;
