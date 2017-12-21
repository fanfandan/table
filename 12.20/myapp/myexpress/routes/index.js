var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'GjIULTfvnLdoykFblbfd',
    user     : '237d7b1cbbf94315ba84ac907ae09bf8',
    password : '3096aec557e94f7dafcdfb353d9d1d22',
    database : 'node'
});

connection.connect();
/* GET home page. */
router.get('/', function(req, res,next) {
    connection.query("select * from demo",function(err,result){
        if(err){
            res.end();
        }else{
            res.render('index',{result:result});
            res.end();
        }
    })
})
router.get('/addCon',function (req,res,next) {
    res.render('addCon');
    res.end();

})
router.post('/addCon',function (req,res,next) {
     var name=req.body.name;
     var age=req.body.age;
     var sex=req.body.sex;
 connection.query(`insert into demo (name,age,sex) values ("${name}","${age}","${sex}")`,function (err,result) {
     if(err){
         res.end('error');
     }
     else{
         res.render('message',{message:"添加成功",url:'/'});
         res.end();
     }
 })
})
router.get('/del/:id',function (req,res,next) {
    var id=req.params.id;
    var ids=id.slice(3);
    console.log(ids);
    connection.query(`delete from demo where id=${ids}`,function (err,result) {
        if(err){
            res.render("message",{message:'删除失败',url:'/'});
            res.end();
        }
        else{
            res.render("message",{message:"删除成功",url:'/'});
            res.end();
        }
    })


})

router.get('/Toupdate/:id',function (req,res,next) {
    var id=req.params.id;
    ids=id.slice(3);
    connection.query(`select * from demo where id="${ids}"`,function (err,result) {
        if(err){
            res.end("页面跳转失败");
        }
        else{
            res.render('update',{result:result});
            res.end();
        }
    })
})

router.post('/Toupdate/update',function (req,res,next) {
    var sex=req.body.sex;
    var age=req.body.age;
    var name=req.body.name;
    var id1=req.body.id;
    var id=req.query.id;
    var ids=req.params.id;
    console.log(sex,age,name,id,ids,id1);
    connection.query(`update demo set name="${name}",sex="${sex}",age="${age}" where id="${id1}" `,function (err,result) {
        if(err){
            res.render('message',{message:'修改失败',url:'update'});
            res.end();
        }
        else{
            res.render('message',{message:'修改成功',url:'/'});
            res.end();
        }
    })
})

/*router.get('/update/:id',function (req,res,next) {
    var id=req.params.id;
    var ids=id.slice(3);
    connection.query(`select * from demo where id="${ids}"`,function (err,result) {
        if(err){
            res.end("页面跳转失败");
        }
        else{
            res.render('update',{result:result});
            res.end();
        }
    })
})
router.post('/update/updateCon/:id',function (req,res,next) {
    var sex=req.query.sex;
    var age=req.query.age;
    var name=req.query.name;
    var id=req.query.id;
    var id1=id.slice(3);
    console.log(id);
    console.log(sex);
    console.log(name);
    connection.query(`update demo set name="${name}",sex="${sex}",age="${age}" where id="${id}" `,function (err,result) {
        if(err){
            res.render('message',{message:'修改失败'});
            res.end();
        }
        else{
            res.render('message',{message:'修改成功'});
        // ,url:"/update"+id
            res.end();
        }
    })
})*/

module.exports = router;
