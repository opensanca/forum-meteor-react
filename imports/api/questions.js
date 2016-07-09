import { Mongo } from 'meteor/mongo';

export const Questions = new Mongo.Collection('questions');

Questions.allow({
  update: function(userId, doc, fieldNames, modifier) {
    return false;
  },
  insert: function(userId, doc) {
    return false;
  },
  remove: function(userId, doc) {
    return false;
  }
});

Meteor.methods({
  "questions.like": function(questionId) {
    Questions.update({_id: questionId}, {
      $inc: {
        likes: 1
      }
    });
  },
  "questions.create": function(text) {
    Questions.insert({
      text,
      createdAt: new Date(), // current time
    });
  }

});

if (Meteor.isServer) {
  Meteor.publish("questions", function () {
    return Questions.find({}, {});
  });
}
