const express = require('express');
const app = express();
const PORT=process.env.PORT || 5000;
const mongoose=require('mongoose');
const {MONGOURI}=require('./config/keys');

mongoose.connect(MONGOURI,{
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
	console.log("connected to mongo yeahh");
})
mongoose.connection.on('error',(err)=>{
	console.log("error connecting",err);
})


require('./models/user');  
require('./models/dealer');  
require('./models/medicine');  
require('./models/employee');  
require('./models/customer');  
require('./models/purchase');  

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));



if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  const path=require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}


app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

