const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema(
  {
    reactions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reaction'
    }],
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
    }
  },
  { // This is the correct place for the toJSON configuration and the id option
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
