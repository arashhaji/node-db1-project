const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

module.exports = server;

server.get('/', (req,res)=>{
    db
    .select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error=>{
        res.status(500).json({error:'failed to retrieve accoutns', error});
    });

});

server.get('/:id', (req,res)=>{
    db 
    .select('*')
    .from('accounts')
    .where('id','=', req.params.id)
    .first()
    .then(account =>{
        res.status(200).json(account);
    })
    .catch(error =>{
        res.status(500).json({
            error:`failed to retrieve post with the id of ${id}`
        , error});
    });
});

server.post('/', (req,res)=>{
    db
    .insert(req.body, 'id')
    .into('accounts')
    .then(ids => {
        res.status(200).json(ids);
    })
    .catch(error=>{
        res.status(500).json({
            error:'cannot update the account', error
        });
    });
});

server.put('/:id', (req,res)=>{
    db('accounts')
    .where({id: req.params.id})
    .update(req.body)
    .then(count =>{
        res.status(200).json(count)
    })
    .catch(error=>{
        res.status(500).json({
            error:'failed to update the account', error
        });
    });
});

server.delete('/:id', (req,res)=>{
    db('accounts')
    .where({id:res.params.id})
    .del()
    .then(count=>{
        res.status(200).json(count)
    })
    .catch(error=>{
        res.status(500).json({
            error:'failed to delete the account',error
        });
    });
});