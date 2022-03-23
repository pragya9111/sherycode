var express = require('express');
var router = express.Router();
const fs = require('fs')
router.get('/', function(req, res) {
  fs.readdir('./public/files', function(err, files){
    if(err) console.log(err)
    else res.render('index', {files,data:"",filename:"" })
  });
});
router.post('/createfile', function(req, res) {
  fs.writeFile(`./public/files/${req.body.filename}`,"", function(err){
    if(err) res.send(err)
    else res.redirect('/')
  })
});
router.get('/delete/:id',function(req,res){
  fs.unlink(`./public/files/${req.params.id}`, function(err){
    if(err)  res.send(err)
    else   res.redirect('/')
  })
})
router.get('/openfile/:id', function(req,res){
  fs.readFile(`./public/files/${req.params.id}`, 'utf8', function(err, data){
    var a = req.params.id;
    if(err){
      res.send(err)
    } 
    else{
      fs.readdir('./public/files', function(err, files){
        if(err) console.log(err)
        else res.render('filepage', {a,files,data})
      });
    }
  })
})
router.post('/update/:id', function(req,res){
  fs.appendFile(`./public/files/${req.params.id}`, `${req.body.updatedata}`, function(err){
    if(err){
      res.send(err)
    }
    else{
      res.redirect('/')
    }
  })
})
module.exports = router;
