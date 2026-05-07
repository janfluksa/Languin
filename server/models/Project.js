import mongoose from 'mongoose'

const TrLngSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
}, { _id: false })

const ProjectSchema = new mongoose.Schema({
   
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	defaultTrLng: {
		type: TrLngSchema,
	},
	otherTrLngs: [TrLngSchema],
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
		default: Date.now
	}
	    
})

export default mongoose.model("Project", ProjectSchema)
