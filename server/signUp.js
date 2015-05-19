if (Meteor.isServer) {
  Meteor.methods({
    "/accounts/is_email_uniq": function(email) {
      if (Meteor.users.findOne({"emails.address": email})) {
        return false;
      } else {
        return true;
      }
    },

    "/accounts/create": function(data) {
      var userId;
      check(data, Schema.User);
      console.log(data);
      console.log("data data data data data data data");
      userId = Accounts.createUser({
        email: data.email,
        password: data.password,
        profile: data.profile
      });
      return userId;
    }
  });
}