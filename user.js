const express = require('express');
const router = express.Router();
var bcrypt = require('bcrypt');
const db = require('./db.js');
const { response } = require('express');
const e = require('express');
router.route('/register').post((req,res)=>{
  var name = req.body.name ;
  var email = req.body.email ;
  var mobile = req.body.mobile ;
  var address = req.body.address ;
  var gst_no = req.body.gst_no ;
  var password = req.body.password ;
 
  var sql_email = "SELECT * FROM user WHERE email=?";
  db.query(sql_email,[email],function(err,data,fields){

    
      bcrypt.hash(password,10,function(err,hash){
        var sqlquery = "INSERT INTO user(name,email,mobile,address,gst_no,password) VALUES (?,?,?,?,?,?)" ;
  db.query(sqlquery,[name,email,mobile,address,gst_no,hash],function(error,data,fields){
    if(error){
      res.send(JSON.stringify({success:false,message:error}));
    }else{
      res.send(JSON.stringify({success:true,message:'register'}));
    }
      });
      
  });
    }
  
  );

  
});
var id ;
router.route('/login').post((req,res)=>{
  var email = req.body.email ;
  var password = req.body.password ;
  bcrypt.hash(password,10,function(err,hash){
    var sql = "SELECT * FROM user WHERE email=?" ;
  db.query(sql,[email],function(err,data,fields){
    
    if(err){
      res.send(JSON.stringify({success:false,message:error}));
    }else{
      if(data.length > 0){
          const hh = data[0].password ;
           id = data[0]['Id'] ;
          console.log(data[0]['Id']);
          console.log(hh);
          
          bcrypt.compare(password,hh ,function(err,re){
            if(err){
              res.send(JSON.stringify({success:false,message:error}));
            }
            if(re){
              res.send(JSON.stringify({success:true,message:data}));
            }else{
              res.send(JSON.stringify({success:false,message:"Password Not match"}));
            }
          })
      
      }else{
        res.send(JSON.stringify({success:false,message:'empty Data'})); 
      }
    }
  });
  });
})
router.route('/orderitem').post((req,res)=>{
  var PersonID = req.body.PersonID ;
  var hsn_number = req.body.hsn_number ;
  var Product_name = req.body.Product_name;
  var price = req.body.price;
  var mrp_price = req.body.mrp_price ;
  var quantity = req.body.quantity ;
  if(quantity == null){
    quantity = 0 ;
  }
  // console.log(PersonID);
  // console.log(Product_name);
  var q = "SELECT quantity FROM item_master WHERE Product_name = '"+Product_name+"' and PersonID ="+PersonID ;
  //console.log(q);
  // check quantity and null condition of data 
  db.query(q,function(err,data,fields){
    if(err){
      
      res.send(JSON.stringify({success:false,message:"that product is not in stock"}));
    }
    else {
      console.log("ok");
      // if(typeof(data[0]['quantity']) == 'undefined' ){
      //   console.log("okk");
      //   res.send(JSON.stringify({success:false,message:"This product is"}));
      // }
      if(data[0]['quantity']==0 || data[0]['quantity']<=quantity){
      console.log("not available");
      res.send(JSON.stringify({success:false,message:"not available"}));
    }else{
      console.log("ordered"+data[0]['quantity']);
      res.send(JSON.stringify({success:true,message:'success'+data[0]['quantity']}));
    }
    
  }
   
  });
  // if quantity not equal to zero than
  // add that item in array list . 
  
})

router.route('/buyitem').post((req,res)=>{
   //console.log(req.body.items);
   var buyitems = req.body.items ;
   var name = req.body.name;
   var mobile = req.body.mobile ;
   var orderlist = buyitems ;
    var final_res = req.body.final_res ;
    var person = req.body.Person_ID ;
   console.log(name);
   console.log(mobile);
   console.log(person);
   let n_buyitems =[] ;
   var flage = 0 , f1 = 0 ;
   console.log(buyitems);
   console.log(final_res);
   for (const [key, value] of Object.entries(buyitems)) {
    console.log(key, value);
    var arr = key;
    
      var qq = "UPDATE item_master SET quantity = quantity - '"+value+"'WHERE Product_name= '"+arr+"' and personID = "+person ;
      db.query(qq,function(err) {
        if(err){
          res.send(JSON.stringify({success:false,message:error}));
          flage = 1 ;
        }else{
            
        }
     })
    // value-- ;
    // }
    
   }
  // console.log(orderlist);
  // console.log("orderlist :");
  var d ;
  d = new Date().toISOString().slice(0, 10);
   console.log(d);
   if(flage==0){
   final_res.forEach(element => {
    console.log(element[0]);
                  let table = "insert into ordered_item(Product_name ,name,mobile,date,quantity,shopkeeper_id,price,mrp) values (?,?,?,?,?,?,?,?)";
                       
                      db.query(table,[element[0],name,mobile,d,element[3],id,element[1],element[2]],function(err){
                      if(err){
                      console.log(err);
                      f1 = 1 ;
                      }else{
                      console.log("ordered completedd");    
                            
                      }
                  })
  });
  }
  if(f1 == 0 && flage==0){
    console.log("hi");
    res.send(JSON.stringify({success:true,message:"successfully buyproducts"}));
  }

  //console.log(n_buyitems);
})

router.route('/additem').post((req,res)=>{
  var PersonID = req.body.PersonID ;
  var hsn_number = req.body.hsn_number;
  var Product_name = req.body.Product_name;
  var price = req.body.price;
  var mrp_price = req.body.mrp_price ;
  var qu = req.body.quantity ;
  var quantity = 1 ;
  quantity = qu ;
  //console.log(quantity);
  //console.log(q);
  // exits check
  var q = "SELECT * FROM item_master WHERE Product_name = '"+Product_name+"' and PersonID ="+PersonID;
  
db.query(q,function(error,data,fields){
  console.log(data.length);
  if(data.length == 0){
    console.log("ok");
  var sqlquery = "INSERT INTO item_master(PersonID,hsn_number,Product_name,price,mrp_price,quantity) VALUES (?,?,?,?,?,?)" ;
  db.query(sqlquery,[PersonID , hsn_number,Product_name,price,mrp_price,quantity],function(error,data,fields){
    if(error){
      res.send(JSON.stringify({success:false,message:error}));
      console.log(error);
    }else{
      res.send(JSON.stringify({success:true,message:'successfull'}));
    }
      });
  }else{
    var qq = "UPDATE item_master SET quantity = quantity + 1 WHERE Product_name= '"+Product_name+"' and personID = "+PersonID;
    //console.log(qq);
    db.query(qq,function(err,data,f) {
      if(err){
        console.log(err);
      }else{
        console.log("successfull updated ");
        res.send(JSON.stringify({success:true,message:'successfull'}));
        //console.log(qq);
      }
    })

  }
  }
);
}
)
router.route('/showtable').post((req,res)=>{
      var result = "SELECT * FROM item_master WHERE PersonID ="+id ;
      db.query(result,function(err,data,f){
        if(err){
          console.log(err);
        }else{
          console.log(data);
          res.send(JSON.stringify({success:true,message:data}));

        }
      })
})

router.route('/profit').post((req,res)=>{
  var p_id = req.body.id ;
  var result = "SELECT sum(price) FROM ordered_item WHERE MONTH(DATE) = MONTH(CURRENT_TIMESTAMP) AND YEAR(DATE) = YEAR(CURRENT_TIMESTAMP) AND shopkeeper_id ="+p_id ;
  db.query(result,function(err,data,f){
    if(err){
      console.log(err);
    }else{
      res.send(JSON.stringify({success:true,message:data}));
    }
  })
})
module.exports = router ;
