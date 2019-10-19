import {Schema ,model} from 'mongoose';

const bookSchema = new mongoose.Schema()({

    title:{
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
    },
    noteIds :{
        type : [Number] 
    }

});

const NoteBook = model('NoteBook', bookSchema);

export default NoteBook;