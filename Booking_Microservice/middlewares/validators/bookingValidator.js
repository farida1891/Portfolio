const axios = require('axios'); // import axios
const https = require('https'); // Import https
const { check, validationResult, matchedData, sanitize } = require('express-validator'); //form validation & sanitize form params
const {booking} = require('../../models/mongodb')
const {timeslot} = require('../../models/mysql')

const axiosRequest = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false // Pass SSL certificate
  })
});



module.exports = {

  getBookedTimeslot:[
    check('id_field').custom(async(value,{req
    }) => {
      try{
      let getFieldAPI = {
        method: 'get',
        url: `https://soka.kuyrek.com:3001/field/${req.params.id_field}`,
        headers: {
          'Authorization': req.header('Authorization')
        }
      }

         
      let responseGetField = await axios(getFieldAPI);
      let getField = responseGetField.data;
     
      if (!getField) {
        throw new Error("Field does not exist!");
      }
    }catch (e) {
      console.log(e);
      // If error it will make a message of error
      //throw new Error("Field does not exist!");
    }
  }),
 
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    } 
    ],

  
  getOne: [
    check('id').custom(value => {
      return booking.findOne({
        _id: value

    }).then(result => {
        if (!result) {
          throw new Error('booking ID doesn\'t exist!')
        }
      })
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    },
  ],

  BookedAsPerson: [
    check('id_timeslot').custom(async(value,{req}) => {
      return timeslot.findOne({
        where:{
        id: value
        }
      }).then(result => {
        if (!result) {
          throw new Error('timeslot does not exist!')
        }
      })
    }),


  
    check('id_field').custom(async(value,{req
    }) => {
      try{
      let getFieldAPI = {
        method: 'get',
        url: `https://soka.kuyrek.com:3001/field/${req.params.id_field}`,
        headers: {
          'Authorization': req.header('Authorization')
        }
      }
         
      let responseGetField = await axios(getFieldAPI);
      let getField = responseGetField.data;
      console.log(getField);
      if (!getField) {
        throw new Error("Field does not exist!");
      }
    }catch (e) {
      // If error it will make a message of error
      throw new Error("Field does not exist!");
    }
  }),
  check('date').custom(async (value, {
    req
  }) => {
    var coba =[]
    
    const data = await booking.find({
        date: new Date(req.body.date)
      })
    for (var i = 0; i < data.length; i++) {
      coba.push(data[i])
    }



    var fieldbooked = coba.filter(function(slot){
      return slot.id_field==req.params.id_field
    })
   
            
    
    var filterbooked = fieldbooked.filter(function(slot){
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (req.body.id_timeslot[i]==slot.id_timeslot[j]){
             return slot.id_timeslot[j];
            }
        }          
    }
    
    })


      for (var i = 0; i < filterbooked.length; i++) {
        if(req.body.player_position=="FW"){
          var play=filterbooked.filter(function(slot){
            return slot.player_position=="FW"
          })

          if (play.length>=3){
            throw new Error ('You cannot book this position')
          }

        }
        else if(req.body.player_position == filterbooked[i].player_position||filterbooked[i].team==req.body.team||filterbooked[i].booked=='field') {
          throw new Error('You cannot book this position' )
          break;
        }
      }}),


    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    }
    ],


  BookedAsTeam: [

    check('id_field').custom(async(value,{req
    }) => {
      try{
      let getFieldAPI = {
        method: 'get',
        url: `https://soka.kuyrek.com:3001/field/${req.params.id_field}`,
        headers: {
          'Authorization': req.header('Authorization')
        }
      }
         
      let responseGetField = await axios(getFieldAPI);
      let getField = responseGetField.data;
      console.log(getField);
      if (!getField) {
        throw new Error("Field does not exist!");
      }
    }catch (e) {
      // If error it will make a message of error
      throw new Error("Field does not exist!");
    }
  }),

    check('id_timeslot').custom(async(value,{req}) => {
      return timeslot.findOne({
        where:{
        id: value
        }
      }).then(result => {
        if (!result) {
          throw new Error('timeslot does not exist!')
        }
      })
    }),

    check('date').custom(async (value, {
      req
    }) => {
      var coba =[]
      const data = await booking.find({
          date: new Date(req.body.date)
        })
      for (var i = 0; i < data.length; i++) {
        coba.push(data[i])
      }



      var fieldbooked = coba.filter(function(slot){
        return slot.id_field==req.params.id_field
      })
     
              
      
      var filterbooked = fieldbooked.filter(function(slot){
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
              if (req.body.id_timeslot[i]==slot.id_timeslot[j]){
               return slot.id_timeslot[j];
              }
          }          
      }
      
      })

      for (var i = 0; i < filterbooked.length; i++) {

        if (req.body.team == filterbooked[i].team || filterbooked[i].booked=='field') {
          throw new Error('You cannot book as team '+ req.body.team )
          break;
        }
      }
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    }
    ],


    BookedAsField: [
      check('id_field').custom(async(value,{req
      }) => {
        try{
        let getFieldAPI = {
          method: 'get',
          url: `https://soka.kuyrek.com:3001/field/${req.params.id_field}`,
          headers: {
            'Authorization': req.header('Authorization')
          }
        }
           
        let responseGetField = await axios(getFieldAPI);
        let getField = responseGetField.data;
        console.log(getField);
        if (!getField) {
          throw new Error("Field does not exist!");
        }
      }catch (e) {
        // If error it will make a message of error
        throw new Error("Field does not exist!");
      }
    }),
    check('id_timeslot').custom(async(value,{req}) => {
      return timeslot.findOne({
        where:{
        id: value
        }
      }).then(result => {
        if (!result) {
          throw new Error('timeslot does not exist!')
        }
      })
    }),

      check('date').custom(async (value, {
        req
      }) => {
        var coba =[]
        const data = await booking.find({
            date: new Date(req.body.date)
          })
        for (var i = 0; i < data.length; i++) {
          coba.push(data[i])
        }


        var fieldbooked = coba.filter(function(slot){
          return slot.id_field==req.params.id_field
        })
      
                
        var filterbooked = fieldbooked.filter(function(slot){
          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (req.body.id_timeslot[i]==slot.id_timeslot[j]){
                 return slot.id_timeslot[j];
                }
            }          
        }
        
        })
     
      
        for (var i = 0; i < filterbooked.length; i++) {
          if (filterbooked) {
            throw new Error('You cannot book this field ')
            break;
          }
        }
      }),



    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    }
  ],


  delete: [
    check('id').custom(value => {
      return booking.findOne({
        where:{
        id: value
      }
      }).then(result => {
        if (!result) {
          throw new Error('booking ID does not exist!')
        }
      })
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    },
  ],
};
