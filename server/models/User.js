import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    registered: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    confirmEmail: {
        type: String,
    },
    language: {
        type: String,
        default: 'en'
    }
})

export default mongoose.model("User", UserSchema)