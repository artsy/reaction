<!-- Add screenshots of different types -->
# Authentication

## Form Types
### Login
Ways to login
  - Email
  - Facebook
  - Twitter

### Signup
Ways to signup
- Email
- Facebook
### Forgot Password
(In Reaction, we currently use the name ResetPassword here)
### Reset Password

## Entry points
### Modal
How do modals get triggered?
Our usage of mediator
#### Standard Authentication
#### Marketing
### Static
Directly access authentication from a route

## Implementation
Desktop
ModalContainer (Force) - hooks up Force's mediator to ModalManager
ModalManager (Reaction) - manages the state of the modal (open/close)
FormSwitcher (Reaction) - responsible for switching between form types
LoginForm/SignUpForm/ResetPasswordForm (Reaction) - Formik forms for handling inputs

AuthStatic (Force) - wrapper for authentication via url route (desktop)

Mobile
MobileAuthStatic (Force) - wrapper for authentication via url route (mobile)
FormSwitcher (Reaction)

### Configuration
This `ModalOptions` interface is used to configure the modal's look and behavior. For example, `mode` determines which form type to display and `copy` changes the subtitle of the form. These properties are also used for analytics.

[See the full list of options here.](https://github.com/artsy/reaction/blob/master/src/Components/Authentication/Types.ts#L34)

Query params vs `mediator`
Desktop passes options from `mediator`.
Mobile, Facebook and Twitter use query params to pass in the options above.

### Artsy Passport
Backend for authentication. Handles auth endpoints and data related to auth.

### Redirects
There are two ways to redirect a user after authentication.
For signups, the default redirect is Onboarding (/personalize).
For logins, the default redirect is the path the user was on.

redirectTo - this option is used to redirect a user after authentication. If used, the user will skip all default redirects and go to this link directly.
destination - this option is used to redirect a user after onboarding.

### Submission
Submission is handled by passing in a function to the `handleSubmit` prop in `ModalManager`. If no `handleSubmit` is passed, there is a default implementation in Reaction but this isn't ready for production. We currently override this in Force by passing in an implementation based on `logged_out_user.coffee`(link this)

### Analytics
