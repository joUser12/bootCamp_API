const mongoose=require('mongoose');
const slugify=require('slugify');
const geocoder= require ('../utils/geocoder')

const bootCampSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:[true,'please add name'],
        // unique:true,
        // trim:true,
        maxlength:[50,'name can not more than 50 character']
    },
    slug:String,
    description:{
        type:String,
        // required:[true,'please add description'],
        maxlength:[500,'description can not more than 50 character']
    },
    website:{
        type:String,
        // match:[
        //     '^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$'

        // ]  
    },
    phone:{
        type:String,
        maxlength:[20,'phone number can be 10 nuber']
    },
    email:{
        type:String,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'plese add an email'
        ]
    },
    address:{
        type:String,
        // required:[true,'please add address']
    },
    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Polygon'],
    //         required: true
    //       },
    //       coordinates: {
    //         type: [[[Number]]], // Array of arrays of arrays of numbers
    //         required: true
    //       },
    //     formattedAddress:String,
    //     street:String,
    //     city:String,
    //     state:String,
    //     zipcode:String,
    //     country:String
    //   },
      careers:{
        type:[String],
        // required:true,
        enum:[
            'web dev',
            'ui'
      ]
      },
      averageRating:{
        type:Number,
        min:[1,'Rating must be al least 1'],
        max:[10,'Rating must can not be more than 10']
      },
      averageCost: Number,
      photo:{
        type:String,
        default:'no-poto.jpg'
      },
      housing:{
        type:Boolean,
        default:false
      },
      jobAssistance:{
        type:Boolean,
        default:true,
      },
      jobGuarantee:{
        type:Boolean,
        default:false
      },
      acceptGi:{
        type:Boolean,
        default:false
      },
      createdAt:{
        type:Date,
        default:Date.now
      }

},
{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
}
);

// Create user slug the name

// bootCampSchema.pre('save',function(){
//   this.slug=slugify(this.name,{lower:true});
//   // next();
// });

// Geocode & create location field

// bootCampSchema.pre('save',async function(next){
//   const loc =await geocoder.geocode(this.address);

//   this.location = {
//     types:'point',
//     coordinates:[loc[0].longitude,loc[0].latitude],
//     formattedAddress : loc[0].formattedAddress,
//     street:loc[0].streetName,
//     city:loc[0].city,
//     state:loc[0].state,
//     zipcode:loc[0].zipcode,
//     country:loc[0].country
//   }

//   // don not save address
//   this.address= undefined;
//   next();

// })



module.exports=mongoose.model('bootcamp',bootCampSchema)