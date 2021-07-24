const express=require('express');
const app=express();
var db=require('mysql');
const cors=require('cors')

var data=db.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'anime_review'
})
data.connect((err)=>{
    if(err) throw err;
    console.log('connected')
})
/* const sqlTable="CREATE TABLE a_review (an_id int,anime VARCHAR(255),review VARCHAR(255)) "
data.query(sqlTable,(err,res)=>{
    if(err) throw err;
    console.log('table created')
}) */

app.use(cors())
app.use(express.json())
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('Server started')
})
app.post('/api/insert',(req,res)=>{
    const anime_id=req.body.user_id;
    const name=req.body.Anime_Name;
    const rev=req.body.Anime_Review;
    const sqlAdd='INSERT INTO a_review (an_id,anime,review) VALUES (?,?,?)';
    data.query(sqlAdd,[anime_id,name,rev],(error,result)=>{
        if(error) throw error;
        console.log('inserted')
    })

})
app.get('/api/get',(req,res)=>{
    const sqlGet='SELECT an_id,anime,review FROM a_review'
    data.query(sqlGet,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
app.delete('/api/delete/:id',(request,resp)=>{
    const anime_id=request.params.id;
    const sqlDel='DELETE FROM a_review WHERE an_id=?';
    data.query(sqlDel,anime_id,(er,res)=>{
        if(er) throw er;
        console.log('deleted an element')
    })
})
app.put('/api/update/:ide',(requ,respo)=>{
    const newid=requ.params.ide;
    const newrev=requ.body.review;
    const sqlUpdate='UPDATE a_review SET review=? WHERE an_id=?';
    data.query(sqlUpdate,[newrev,newid],(erro,respon)=>{
        if(erro) throw erro;
        console.log('updated')
    })

})