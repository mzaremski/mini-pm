app.get('/api/getprojects', (req, res) => {
    let sql = 'SELECT * FROM projects';
    db.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in the query");
        }else{
            res.json(rows)
            console.log("Successful query")
        }
    })
});
app.get('/api/getproject/:id', (req, res) => {
    let sql = `SELECT * FROM projects WHERE idproject = ${req.params.id}`;
    db.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in the query");
        }else{
            res.json(rows)
            console.log("Successful query")
        }
    })
});
app.get('/api/task/:parentId', (req, res) => {
    let sql = `SELECT * FROM tasks WHERE parentId = ${req.params.parentId}`;
    db.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in the query");
        }else{
            res.json(rows)
            console.log("Successful query")
        }
    })
});
