const mongoose = require('mongoose');
const { reactionSchema } = require('./reaction');


const thoughtSchema = new mongoose.Schema(
  {
    reactions: [reactionSchema],
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});


// function dateFormat(timestamp) {
//   return formattedTimestamp;
// }

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
