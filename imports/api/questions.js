import { Mongo } from 'meteor/mongo';

export const Questions = new Mongo.Collection('questions');
export const QuestionComments = new Mongo.Collection('question_comments');

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
  "questions.create": function(text) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Questions.insert({
      text,
      userId: this.userId,
      createdAt: new Date(), // current time
    });
  },
  "questions.like": function(questionId) {
    Questions.update({_id: questionId}, {
      $inc: {
        likes: 1
      }
    });
  },
  "questions.solve": function(questionId) {
    Questions.update({_id: questionId}, {
      $set: {
        solvedAt: new Date()
      }
    });
  },
  "questions.comment": function(questionId, text) {
    QuestionComments.insert({
      questionId,
      text,
      createdAt: new Date(), // current time
    });
    Questions.update({_id: questionId}, {
      $inc: {
        commentsCount: 1
      }
    });
    // Questions.update({_id: questionId}, {
    // });
  }

});

if (Meteor.isServer) {
  Meteor.publishComposite("questions", function () {
    return {
      find: function() {
        return Questions.find({}, {
          fields: {
            userId: 1,
            text: 1,
            likes: 1,
            commentsCount: 1,
            solvedAt: 1
          }
        });
      },
      children: [
        {
          find: function(question) {
            return Meteor.users.find({_id: question.userId}, {
              fields: {
                profile: 1
              }
            });
          }
        }
      ]
    }
  });
  Meteor.publishComposite("question", function (questionId) {
    return {
      find: function() {
        return Questions.find({_id: questionId}, {});
      },
      children: [
        {
          find: function(question) {
            return QuestionComments.find({questionId: question._id}, {});
          }
        }
      ]
    }
  });
}
