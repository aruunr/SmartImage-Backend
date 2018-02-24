const handleUserRegistration = (req,res,pg, bcrypt, saltRounds) => {
    
      console.log('In register');
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    
    pg.transaction(trx => {
        trx.insert({
            hash: hash,
            email : req.body.email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {              
            trx('users')
                .returning('*')
                .insert({
                email: loginEmail[0],
                name : req.body.name,
                joined : new Date()
            }).then(user => {

                res.json(user[0]);
            })
            .then(trx.commit)
            .catch(trx.rollback)
            .catch(err =>
             res.status(400).json('Error in registering')
            );
        })
    })
}

module.exports = {handleUserRegistration};