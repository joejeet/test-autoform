Schema={}

SimpleSchema.debug = true;

SimpleSchema.messages({
  passwordMismatch: "Passwords do not match",
  emailNotUnique: "Email is already in used",
  emailNotFound: "Email doesn't exist"
});

Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
    regEx: /^[a-zA-Z-]{2,25}$/,
    optional: true
  },
  lastName: {
    type: String,
    regEx: /^[a-zA-Z]{2,25}$/,
    optional: true
  },
  phone: {
    type: String,
    optional: true
  },
  role: {
    type: String,
    optional: true
  }
})

Schema.User = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Email",
    custom: function() {
      if (Meteor.isClient && this.isSet) {
        return Meteor.call('/accounts/is_email_uniq', this.value, function(error, result) {
          if (!result) {
            console.log('emailNotFound')
            return 'emailNotFound';
          }
        });
      }
    }
  },
  password: {
    type: String,
    label: "Password",
    min: 6
  },
  passwordConfirmation: {
    type: String,
    min: 6,
    label: "Password Confirmation",
    custom: function() {
      if (this.value !== this.field('password').value) {
        return "passwordMissmatch";
      }
    }
  },
  profile: {
      type: Schema.UserProfile
  },
  services: {
      type: Object,
      optional: true,
      blackbox: false
  }
});

/* Attach schema to Meteor.users collection */
Meteor.users.attachSchema(Schema.User);
