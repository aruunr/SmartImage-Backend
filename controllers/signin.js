const handleUserSignin = (req, res,pg, bcrypt) => {
    pg.select('email','hash')
        .from('login')
    .where('email', '=',req.body.email)
        .then(data => {
          const isLoginSuccess = 
               bcrypt.compareSync(req.body.password, data[0].hash);
    if(isLoginSuccess){
    return pg.select('*').from('users')
        .where('email','=',req.body.email).then(user => {
            res.json(user[0])
        })
        .catch(err => res.json.status(400).json('Thereis an error'))
    }else{
        res.status(400).json('Wrong password')
    }
    }).catch(err => res.status(400).json('Check signin credentials'))

  
}

module.exports = {handleUserSignin};