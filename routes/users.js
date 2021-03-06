const router = require('express').Router();
const usersRepo = require('../repositories/users')

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const users = await usersRepo.getAllUsers()//(parseInt(req.query.offset),parseInt(req.query.limit)) ;
    return res.send(users);
  } catch (err) { console.log(err.message) };
});

router.get('/:id', async (req,res) => {
  try {
    const user = await usersRepo.getUser(req.params.id);
    if (user)
      res.send(user);
    else
     res.send({});
  } catch (err) { console.log(err.message) };
});

router.post('/', async (req,res) => {
  try {
    const {email} = req.body
    const isEmailValid = await usersRepo.getUserByEmail(email);
    if ( isEmailValid ) {
      res.send("Email invalid !");
    } else {
      usersRepo.addUser(req.body);
      res.send("User Added !");
    }
  } catch (err) { console.log(err.message) };
});

router.put('/:id', async (req,res) => {
  try {
    const id = req.params.id ;
    const {email} = req.body
    const isEmailValid = await usersRepo.getUserByEmail(email);
    if ( isEmailValid && isEmailValid.id!=id ) {
      res.send("Email invalid !");
    } else {
      const [updated] = await usersRepo.updateUser(id,req.body);
      if (updated) {
        res.send('User updated !');
      }
      else {
        res.send('User not found !');
      }
    }
  } catch (err) { console.log(err.message) };
});

router.delete('/:id', async (req,res) => {
  try {
    const id = req.params.id ;
    const deleted = await usersRepo.deleteUser(id);
    if (deleted) {
      res.send("User deleted !");
    }
    else {
      res.send('User not found !');
    }
  } catch (err) { console.log(err.message) };
});

module.exports = router;
