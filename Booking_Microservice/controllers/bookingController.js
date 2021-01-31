const {
  timeslot
} = require('../models/mysql');
const {
  booking
} = require('../models/mongodb');
const axios = require('axios'); // Import axios
const https = require('https'); // Import https

const passportJWT = require("passport-jwt");
const jwt = require('jsonwebtoken'); // import jsonwebtoken

//  const jwttoken=require ('../middlewares/auth/index.js')


class BookingController {
  // async getBookedTimeslotPersonal(req, res) {
  //   var coba = []
  //   var coba1 = []
  //   var coba2 = []
  //   var coba3 = []
  //   var cobalagi = []
  //   var cobalagi2 = []
  //   var bookedtimeslot = []
  //   var bookedtimeslot1 = []
  //   var bookedtimeslot2 = []
  //   var object = {};
  //   var result = [];
  //   var object2 = {};
  //   var result2 = [];

  //   var alltime = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
  //   var alltimeslot = []

  //   const data = await booking.find({
  //     date: new Date(req.body.date)
  //   })

  //   var fieldbooked = data.filter(function (slot) {
  //     return slot.id_field == req.params.id_field
  //   })
  //   console.log(fieldbooked);

  //   if (fieldbooked.length !== 0) {


  
  //     for (var i = 0; i < fieldbooked.length; i++) {
  //       if (fieldbooked[i].booked == 'field') {
  //         coba.push(fieldbooked[i].id_timeslot)
  //       }
  //       if (fieldbooked[i].booked == 'team') {
  //         coba1.push(fieldbooked[i].id_timeslot)
  //       }
  //       if (fieldbooked[i].booked == 'personal') {
  //         cobalagi.push(fieldbooked[i].id_timeslot)
  //       }
  //     }


  //     //field
  //     for (var i = 0; i < coba.length; i++) {
  //       for (let j = 0; j < coba.length; j++) {
  //         coba2.push(coba[i][j])
  //       }
  //       var bookedidtimeslot = coba2.filter(function (slot) {
  //         return slot !== undefined
  //       })
  //     }

  //     //semua team ada di bookedidtimeslot1-setelah difilter result butuh di filter lagi
  //     for (var i = 0; i < coba1.length; i++) {
  //       for (let j = 0; j < coba1.length; j++) {
  //         coba3.push(coba1[i][j])
  //       }
  //       var bookedidtimeslot1 = coba3.filter(function (slot) {
  //         return slot !== undefined
  //       })
  //     }

  //     //personal
  //     for (var i = 0; i < cobalagi.length; i++) {
  //       for (let j = 0; j < cobalagi.length; j++) {
  //         cobalagi2.push(cobalagi[i][j])
  //       }
  //       var bookedidtimeslot2 = cobalagi2.filter(function (slot) {
  //         return slot !== undefined
  //       })
  //     }

  //     bookedidtimeslot1.forEach(function (item) {
  //       if (!object[item])
  //         object[item] = 0;
  //       object[item] += 1;
  //     })

  //     for (var prop in object) {
  //       if (object[prop] >= 2) {
  //         result.push(prop);
  //       }
  //     }
  //     var filtered = bookedidtimeslot1.filter(
  //       function (e) {
  //         return this.indexOf(e) < 0;
  //       },
  //       result
  //     );
  //     //filtered adalah timeslot isi team yang masih bisa dibook

  //     var combined = filtered.concat(bookedidtimeslot2)//isinya team yang masih bisa dibook + personal

  //     for (let i = 0; i < combined.length; i++) {
  //       for (let j = 0; j < bookedtimeslot2.length; j++) {
  //         if (bookedidtimeslot2[i] == combined[j]) {
  //           combined.forEach(function (item) {
  //             if (!object2[item])
  //               object2[item] = 0;
  //             object2[item] += 1;
  //           })

  //           for (var prop in object) {
  //             if (object2[prop] >= 7) {
  //               result2.push(prop);
  //             }
  //           }


  //         } else {
  //           bookedidtimeslot2.forEach(function (item) {
  //             if (!object2[item])
  //               object2[item] = 0;
  //             object2[item] += 1;
  //           })

  //           for (var prop in object) {
  //             if (object2[prop] >= 11) {
  //               result2.push(prop);
  //             }
  //           }
  //         }

  //       }
  //     }

  //     var combined1 = result.concat(bookedidtimeslot, result2) //isinya semua yang pasti udah di-booked
  //     console.log(combined1);

  //     var filteredall = alltime.filter(
  //       function (e) {
  //         return this.indexOf(e) < 0;
  //       },
  //       combined1
  //     );

  //     for (let i = 0; i < filteredall.length; i++) {
  //       var datatimeslot = await timeslot.findOne({
  //         where: {
  //           id: filteredall[i]
  //         }
  //       });
  //       bookedtimeslot.push(datatimeslot.dataValues.timeslot)
  //     }
  //     res.json({
  //       status: 'success',
  //       available_timeslot: bookedtimeslot
  //     })
  //   }

  //   else {
  //     res.json({
  //       status: 'All time slot are available'
  //     })
  //   }

  // }


  async getAvailableTeam(req, res) {
    var coba = []
  
    var coba2 = []

    var allteam = ['A','B']
    var alltimeslot = []
    const data = await booking.find({
      date: new Date(req.body.date)
    })

    var fieldbooked = data.filter(function (slot) {
      return slot.id_field == req.params.id_field
    })
    console.log(fieldbooked);

    if (fieldbooked.length !== 0) {

      var coba = []
      const data = await booking.find({
        date: new Date(req.body.date)
      })
      for (var i = 0; i < data.length; i++) {
        coba.push(data[i])
      }



      var fieldbooked = coba.filter(function (slot) {
        return slot.id_field == req.params.id_field
      })



      var filterbooked = fieldbooked.filter(function (slot) {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (req.body.id_timeslot[i] == slot.id_timeslot[j]) {
              return slot.id_timeslot[j];
            }
          }
        }

      })

      
      for (let i = 0; i < filterbooked.length; i++) {
        if (filterbooked[i].booked = 'team') {
          coba2.push(filterbooked[i].team)
        }
      }
      
      if (coba2.length==1){
        var availableTeam= allteam.filter(function(item){
          return item!==coba2[0]
        })
        res.json({
          status:'success',
          available_team : availableTeam
        })
      }
      else{
        res.json({
          status:'success',
          available_team : 'no team available'
        })
      }
      
    }

    else {
      res.json({
        status: 'success',
        available_timeslot: allteam
      })
    }



  }


  async getBookedTimeslotTeam(req, res) {
    var coba = []
    var coba1 = []
    var coba2 = []
    var coba3 = []
    var cobalagi = []
    var cobalagi2 = []
    var bookedtimeslot = []
    var bookedtimeslot1 = []
    var bookedtimeslot2 = []
    var object = {};
    var result = [];
    var alltime = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
    var alltimeslot = []
    const data = await booking.find({
      date: new Date(req.body.date)
    })

    var fieldbooked = data.filter(function (slot) {
      return slot.id_field == req.params.id_field
    })
    console.log(fieldbooked);

    if (fieldbooked.length !== 0) {

      for (var i = 0; i < fieldbooked.length; i++) {
        if (fieldbooked[i].booked == 'field') {
          coba.push(fieldbooked[i].id_timeslot)
        }
        if (fieldbooked[i].booked == 'team') {
          coba1.push(fieldbooked[i].id_timeslot)
        }
        if (fieldbooked[i].booked == 'personal') {
          cobalagi.push(fieldbooked[i].id_timeslot)
        }
      }

      for (var i = 0; i < coba.length; i++) {
        for (let j = 0; j < coba.length; j++) {
          coba2.push(coba[i][j])
        }
        var bookedidtimeslot = coba2.filter(function (slot) {
          return slot !== undefined
        })
      }


      for (var i = 0; i < coba1.length; i++) {
        for (let j = 0; j < coba1.length; j++) {
          coba3.push(coba1[i][j])
        }
        var bookedidtimeslot1 = coba3.filter(function (slot) {
          return slot !== undefined
        })
      }

      for (var i = 0; i < cobalagi.length; i++) {
        for (let j = 0; j < cobalagi.length; j++) {
          cobalagi2.push(cobalagi[i][j])
        }
        var bookedidtimeslot2 = cobalagi2.filter(function (slot) {
          return slot !== undefined
        })
      }


      bookedidtimeslot1.forEach(function (item) {
        if (!object[item])
          object[item] = 0;
        object[item] += 1;
      })

      for (var prop in object) {
        if (object[prop] >= 2) {
          result.push(prop);
        }
      }


      var combined = result.concat(bookedidtimeslot, bookedidtimeslot2)

      var filtered = alltime.filter(
        function (e) {
          return this.indexOf(e) < 0;
        },
        combined
      );

      for (let i = 0; i < filtered.length; i++) {
        var datatimeslot = await timeslot.findOne({
          where: {
            id: filtered[i]
          }
        });
        bookedtimeslot.push(datatimeslot.dataValues.timeslot)
      }
      res.json({
        status: 'success',
        available_timeslot: bookedtimeslot
      })
    }

    else {
      for (let i = 0; i < alltime.length; i++) {
        var datatimeslot = await timeslot.findOne({
          where: {
            id: alltime[i]
          }
        });
        alltimeslot.push(datatimeslot.dataValues.timeslot)
      }
      res.json({
        status: 'success',
        available_timeslot: alltimeslot
      })
    }



  }

  async getBookedTimeslotField(req, res) {
    var coba = []
    var coba2 = []
    var bookedtimeslot = []
    var alltime = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
    var alltimeslot = []
    const data = await booking.find({
      date: new Date(req.body.date)
    })
    var fieldbooked = data.filter(function (slot) {
      return slot.id_field == req.params.id_field
    })
    console.log(fieldbooked);

    if (fieldbooked.length !== 0) {
      for (var i = 0; i < fieldbooked.length; i++) {
        coba.push(fieldbooked[i].id_timeslot)

      }


      for (var i = 0; i < coba.length; i++) {
        for (let j = 0; j < coba.length; j++) {
          coba2.push(coba[i][j])
        }

        var bookedidtimeslot = coba2.filter(function (slot) {
          return slot !== undefined
        })
      }

      var filtered = alltime.filter(
        function (e) {
          return this.indexOf(e) < 0;
        },
        bookedidtimeslot
      );



      for (let i = 0; i < filtered.length; i++) {
        var datatimeslot = await timeslot.findOne({
          where: {
            id: filtered[i]
          }
        });
        bookedtimeslot.push(datatimeslot.dataValues.timeslot)
      }


      res.json({
        status: 'success',
        available_timeslot: bookedtimeslot
      })


    } else {
      for (let i = 0; i < alltime.length; i++) {
        var datatimeslot = await timeslot.findOne({
          where: {
            id: alltime[i]
          }
        });
        alltimeslot.push(datatimeslot.dataValues.timeslot)
      }
      res.json({
        status: 'success',
        available_timeslot: alltimeslot
      })
    }
  }

  async getAll(req, res) {

    booking.find({}).then(result => {
      res.json({
        status: 'success',
        data: result
      })
    })
  }

  async getOne(req, res) {
    booking.findOne({

      _id: req.params.id

    }).then(result => {
      res.json({
        status: "success",
        data: result
      })
    })
  }


  async getByUser(req, res) {
    booking.find({

      email: req.body.email

    }).then(result => {
      res.json({
        status: "Success",
        data: result
      })
    })
  }
  //

  async BookedAsPerson(req, res) {

    const agent = new https.Agent({
      rejectUnauthorized: false
    });

    let getFieldAPI = {
      method: 'get',
      url: `https://soka.kuyrek.com:3001/field/${req.params.id_field}`,
      headers: {
        'Authorization': req.header('Authorization')
      },
      httpsAgent: agent
    };

    let responseGetField = await axios(getFieldAPI);
    let getField = responseGetField.data;

    let coba = [];

    for (let i = 0; i < req.body.id_timeslot.length; i++) {
      var data = await timeslot.findOne({
        where: {
          id: req.body.id_timeslot[i]
        }
      });

      coba.push(data.dataValues.timeslot)

    }


    booking.create({
      email: req.user.email,
      fullname: req.user.fullname,
      id_field: getField.data._id,
      field: getField.data.fieldName,
      location: getField.data.location,
      paymentstatus: false,
      paymentconfirmation: 'false',
      transaction: false,
      team: req.body.team,
      player_position: req.body.player_position,
      date: new Date(req.body.date),
      id_timeslot: req.body.id_timeslot,
      timeslot: coba.map((x) => x),
      booked: 'personal'
    })
      .then(result => {
        res.json({
          status: "success",
          result: result
        })
      })

  }

  async BookedAsTeam(req, res) {

    const agent = new https.Agent({
      rejectUnauthorized: false
    });

    let getFieldAPI = {
      method: 'get',
      url: `https://soka.kuyrek.com:3001/field/${req.params.id_field}`,
      headers: {
        'Authorization': req.header('Authorization')
      },
      httpsAgent: agent
    };

    let responseGetField = await axios(getFieldAPI);
    let getField = responseGetField.data;


    let coba = [];

    for (let i = 0; i < req.body.id_timeslot.length; i++) {
      var data = await timeslot.findOne({
        where: {
          id: req.body.id_timeslot[i]
        }
      });

      coba.push(data.dataValues.timeslot)

    }

    booking.create({
      email: req.user.email,
      fullname: req.user.fullname,
      id_field: getField.data._id,
      field: getField.data.fieldName,
      location: getField.data.location,
      paymentstatus: false,
      paymentconfirmation: 'false',
      transaction: false,
      team: req.body.team,
      player_position: 'team',
      date: new Date(req.body.date),
      id_timeslot: req.body.id_timeslot,
      timeslot: coba.map((x) => x),
      booked: 'team'
    })
      .then(result => {
        res.json({
          status: "success",
          result: result
        })
      })

  }


  async BookedAsField(req, res) {

    const agent = new https.Agent({
      rejectUnauthorized: false
    });

    let getFieldAPI = {
      method: 'get',
      url: `https://soka.kuyrek.com:3001/field/${req.params.id_field}`,
      headers: {
        'Authorization': req.header('Authorization')
      },
      httpsAgent: agent
    };

    let responseGetField = await axios(getFieldAPI);
    let getField = responseGetField.data;


    console.log(getField);

    let coba = [];

    for (let i = 0; i < req.body.id_timeslot.length; i++) {
      var data = await timeslot.findOne({
        where: {
          id: req.body.id_timeslot[i]
        }
      });
      coba.push(data.dataValues.timeslot)

    }



    booking.create({
      email: req.user.email,
      fullname: req.user.fullname,
      id_field: getField.data._id,
      field: getField.data.fieldName,
      location: getField.data.location,
      paymentstatus: false,
      paymentconfirmation: 'false',
      transaction: false,
      team: 'field',
      player_position: 'field',
      date: new Date(req.body.date),
      id_timeslot: req.body.id_timeslot,
      timeslot: coba.map((x) => x),
      booked: 'field'
    })
      .then(result => {
        res.json({
          status: "success",
          result: result
        })
      })

  }


  //
  //
  async delete(req, res) {
    booking.delete({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.json({
        status: "success",
        data: null
      })
    })
  }



}

module.exports = new BookingController;
