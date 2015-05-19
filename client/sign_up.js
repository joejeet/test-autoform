AutoForm.hooks({
  signUp: {
    onSubmit: function(doc) {
      var that;
      this.event.stopPropagation();
      that = this;
      doc = Schema.User.clean(doc);
      Meteor.call('/accounts/create', doc, function(error, result) {
        if (error) {
          that.done(new Error(error));
        } else {
          Meteor.loginWithPassword(doc.email, doc.password);
          that.done();
        }
      });
      return false;
    },
    onSuccess:function(operation, result, template){
      debugger;
      Router.go('/dashboard');
    },
    onError: function(operation, error, template) {
        debugger;
        console.log(operation,error)
    },
  }
});

Template.signUp.events({
  
});

Template.signUp.helpers({
   users: function () {
    return Meteor.users;
  },
  userSchema: function () {
    return Schema.User;
  }
});