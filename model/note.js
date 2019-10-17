import {Schema ,model} from 'mongoose';
import userSchema from '../model/user';

const noteSchema = new mongoose.Schema({
	title:{
		type : String,
		required : true,
		unique : true
	},
	content : {
		type : String,
		required : true 
	},
	dateCreated : {
		type : Date,
		default : Date.now
	},
	createdBy : {
		type : Number ,
		required : true
	}
	
}); 

const Note = model('Note', noteSchema);

export default Note;