import mongoose from 'mongoose'

const TrLngSchema = mongoose.Schema({
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
	fallback: {
		type: String,
		required: true,
	},
})

const ProjectSchema = mongoose.Schema({
   
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
	otherTrLngs: [{
		type: [TrLngSchema],
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