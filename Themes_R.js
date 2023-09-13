const express = require('express');
const router = express.Router()
module.exports = router;

router.get("/",(req, res) => {

    res.render("mainPage");

});

router.post("/Add",(req, res) => {

    let ThemesObj = {};
    ThemesObj.themeName  = req.body.themeName;
    ThemesObj.BackroundColor = req.body.BackroundColor;
    ThemesObj.TextColor = req.body.TextColor;

    const addQuery = `INSERT INTO themes(themeName,BackroundColor,TextColor) VALUES('${ThemesObj.themeName}','${ThemesObj.BackroundColor}','${ThemesObj.TextColor}')`;
    db_pool.query(addQuery,function (err,rows,fields,){
        if (err){
            res.status(500).json({message:err});
        }else{
            res.status(200).json({message:"Theme Added",Last_Id:rows.insertId});
        }
    })
    console.log(ThemesObj);
});

router.patch("/Edit",(req, res) => {

    //let themeName = req.body.themeName;
    let newAnswerObj = {};
    newAnswerObj.id = Number(req.body.idx);
    newAnswerObj.themeName = req.body.themeName;
    newAnswerObj.BackroundColor = req.body.BackroundColor;
    newAnswerObj.TextColor = req.body.TextColor;

    const UpdateQuery = `UPDATE themes SET themeName = '${newAnswerObj.themeName}',BackroundColor = '${newAnswerObj.BackroundColor}',TextColor = '${newAnswerObj.TextColor}' WHERE id = ${newAnswerObj.id}`;

    //let q=`UPDATE \`answers_tbl\`  SET \`Category_Text\`='${cat_Text}' WHERE id=${id} `;

    db_pool.query(UpdateQuery,function (err,rows,fields,){
        if (err){
            res.status(500).json({message:err});
        }else{
            res.status(200).json({message:"Theme Updated"});
        }
    })
    console.log(newAnswerObj);
});

router.delete("/Delete",(req, res) => {

    let id= Number(req.body.idx);
    //let id= Number(req.body.idx) ;
    //let id= Number(req.body.idx);

    let q=`DELETE FROM \`themes\` WHERE id =${id}`;

    //let q=`DELETE FROM \`themes\` WHERE id='${id}' `;
    //let q = `DELETE FROM \`themes`\ WHERE id = ${id}`;

    // let q=`DELETE FROM \`themes\` WHERE id = ${id}`;


    db_pool.query(q, function(err, rows, fields){

        if(err){
            res.status(500).json({message: err})
            // throw err;
        }else{
            res.status(200).json({message: "Deleted Theme"});
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }
    });
    // res.send("good morning");
});

router.get("/List",(req, res) => {

    let q="SELECT * FROM `themes`";

    db_pool.query(q, function(err, rows, fields){

        if(err)
        {
            res.status(500).json({message: err})
            // throw err;
        }
        else
        {
            res.status(200).json(rows);
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }
    });

});
