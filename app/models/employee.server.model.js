'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
  relationship = require('mongoose-relationship');

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'Please fill Employee First Name',
		trim: true
	},
  lastName: {
    type: String,
    default: '',
    required: 'Please fill Employee Last Name',
    trim: true
  },
  skills:[
    {
      name:String
    }
  ],
  belongsTo:{
    type:Schema.ObjectId,
    ref:'Organization',
    childPath:'members'
  },
  worksFor:[{
    type:Schema.ObjectId,
    ref:'Project',
    childPath:'members'
  }],
  role:{
    type:String,
    enum:['Junior Software Developer','Software Developer','Senior Software Developer','Junior QA Engineer','QA Engineer','Senior QA Engineer','Tech Lead','QA Lead','Engineering Manager','QA Manager','Architect','BU Head']
  },
  billable:{
    type:Boolean
  },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});
EmployeeSchema.set('toJSON', {  virtuals: true });

EmployeeSchema.post('init',function(doc){
  //console.log('===> Post --> Init');
  this._original = JSON.parse(JSON.stringify(this));
  console.log(this._original);
  //console.log('    '+this);
});


EmployeeSchema.pre('save',function(next){
  //console.log('===> Pre --> Save');
  //console.log('    '+this);
  next();
});

EmployeeSchema.post('save',function(doc){
  console.log('===> Post --> Save');
  console.log("Before==>");
  console.log('    '+this._original.belongsTo);
  console.log("After==>");
  console.log('    '+this);
});

EmployeeSchema.set
EmployeeSchema.plugin(relationship, { relationshipPathName:['belongsTo','worksFor'] });

mongoose.model('Employee', EmployeeSchema);