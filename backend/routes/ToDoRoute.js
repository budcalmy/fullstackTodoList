const {Router} = require('express');
const { getToDo, saveToDo, deleteToDo, updateToDo } = require('../controllers/ToDoController');

const router = Router();

router.get('/todos', getToDo);

router.post('/todos', saveToDo);

router.delete('/todos', deleteToDo);

module.exports = router;