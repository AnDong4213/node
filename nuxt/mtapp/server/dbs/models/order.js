import mongoose from 'mongoose'

const Order = mongoose.model('Order', new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  user: {
    type:String,
    require:true
  },
  time: {
    type:String,
    require:true
  },
  total: {
    type:Number,
    require:true
  },
  imgs: {
    type:Array,
    require:true
  },
  name: {
    type:String,
    require:true
  },
  status: {
    type:Number,
    require:true
  }
}))

export default Order

