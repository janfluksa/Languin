import mongoose from 'mongoose'

const ProjectSchema = mongoose.Schema({
   
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	defaultLocale: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Language",
	},
	locales: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Language",
	}],
	admins: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	}],
	copywriters: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	}],
	developers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	}],
	created: {
		type: Date,
		default: Date.now()
	}
    
})

export default mongoose.model("Project", ProjectSchema)