import {Schema ,model} from 'mongoose';
import userSchema from '../model/user';

const noteSchema = new mongoose.Schema({
	title:{
		type : String,
		required : true,
		unique : true
	},
	content : {
		type : String
	},
	comments:[{body : String , date : Date}],
	
	dateCreated : {
		type : Date,
		default : Date.now
	},
	createdBy : {
		type : mongoose.Schema.Types.ObjectId , ref : 'User',
		required : true
	}
	
}); 

const Note = model('Note', noteSchema);