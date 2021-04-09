const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req,res, next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'Get, POST, PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();});

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    let db = client.db('locations');
  
 /*connexion d'un utilisateur*/
 app.post("/membre/connexion", (req,res) => {
    try{
        db.collection("membres").find(req.body).toArray((err, documents) => {
        if (documents.length == 1){
            res.end(JSON.stringify({"resultat":1,"message":"Authentification reussie "}));
         }
         else res.end(JSON.stringify({"resultat":0,"message": "Email et/ou mot de pass incorrect"}));
         
        });
    }catch (e) {
        res.end(JSON.stringify({"resultat": 0, "message": e}));
    }

});




// Modification d'un profil
app.put("/update", (req,res)=>{
    try{
        db.collection("membres").updateOne( { "email": req.body.email},
            {$set: {"age": req.body.age,"nom":req.body.nom,"famille":req.body.famille,"race":req.body.race,"nourriture":req.body.nourriture,
            photo:req.body.photo
        }},
            {upsert: true});
           res.end(JSON.stringify({"resultat": 1, "message": "Compte créé avec succés"}));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }

    });

  
// Récupération de mon profil
app.get("/profile/:email", (req,res) => {
    try{
         db.collection("membres").find({email:req.params.email} ).toArray((err, documents) => {
            res.end(JSON.stringify(documents));
           });
        }catch(e){
            res.end(JSON.stringify([]));
        }
     });

// Récupération de tous les profils
 app.get("/Allprofils", (req,res) => {
        
    try{
        db.collection("membres").find().toArray((err, documents) => {
         res.end(JSON.stringify(documents));
           });
        }catch(e){
            res.end(JSON.stringify([]));
        }
     });

 // Ajouter un ami
app.post("/addfriend", (req, res) => {
    try{ 
        db.collection("friends").insertOne(req.body);
        res.end(JSON.stringify({ "message": "ami ajouté" })); 
    }catch(e){
    res.end(JSON.stringify([]));
    }
    });

// Récuperation de tous mes amis
app.get("/myfriends/:email", (req,res) => {
        
    try{
        db.collection("friends").find({email:req.params.email} ).toArray((err, documents) => {
            res.end(JSON.stringify(documents));
           });
        }catch(e){
           res.end(JSON.stringify([]));
        }
     });
// Récuperation de tous mes amis
app.get("/mesamis/:mail", (req,res) => {
        
    try{
        db.collection("friends").find({mail:req.params.mail} ).toArray((err, documents) => {
            res.end(JSON.stringify(documents));
           });
        }catch(e){
           res.end(JSON.stringify([]));
        }
     });
//récuperation d'un ami    
app.get("/friend/:id", (req,res) => {
    try{
        db.collection("friends").find({id:req.params.id} ).toArray((err, documents) => {
        res.end(JSON.stringify(documents));
        });
    }catch(e){
        res.end(JSON.stringify([]));
    }
    });

/*supprimer un ami*/
app.delete("/deletefriend/:id", (req, res) => {
      try{
        db.collection("friends").remove({id:req.params.id} )  
        res.end(JSON.stringify({" resultat":1,"message":"Ami supprimé avec succés"}));
    } catch(e){
      res.end(JSON.stringify([]));
    }
 });
// Inscription d'un nouveau utilisateur
 app.post("/membre", (req, res) => {
   
    db.collection("membres").count({email: req.body.email}) 
    .then((count) => { 
      if (count > 0) { 
        console.log('User exists.'); 
        res.end(JSON.stringify({"resultat": 1, "messages": "Utilisateur existe déja"}));
      } else { 
        console.log('User does not exist.'); 
        db.collection("membres").insert(req.body);
           res.end(JSON.stringify({"resultat": 0, "messages": "Compte créé avec succés"}));
      } 
    });
    
        
      
      
    
  });
















     });
app.listen(8888);