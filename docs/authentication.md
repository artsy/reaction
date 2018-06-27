# Authentication

## Form Types
There are four types of forms related to authentication. The only one not located in Reaction is Reset Password, which currently exists as a coffeescript template in Force.

### Login
There are three ways users can login to Artsy.
  1. Email
  2. Facebook
  3. Twitter (signups deprecated)

### Signup
There are two ways users can signup to Artsy. Twitter signups have been deprecated for a while and we intend to convert existing Twitter users to email users eventually.
  1. Email
  2. Facebook

New signups require a name, email, 8 character password minimum, and they must accept our terms, policies and to receive emails.

### Forgot Password
If a user forgets their password, they are able to reset it using the Forgot Password form. This form only accepts an email address. Reset instructions will be sent to the user along with a reset token which is used to verify the user.

Note: In Reaction, we incorrectly use the name ResetPassword.

### Reset Password
This is the only form that exists as a coffeescript template in Force. To successfully reset your password, the form must be submitted with a valid token (typically taken from a query param). Below are the allowed query params for /reset_password:

- reset_password_token: the token which authorizes you to change your password
- reset_password_redirect_to: where the user should go after resetting their password
- set_password: flag to change copy to distinguish between setting a new password entirely and changing the existing password

## Entry Points
There are three ways a user can see authentication forms. Note that each of these are using the same underlying form infrastructure which includes validation, form submission, and analytics events.

### Modal
Authentication modals can only be triggered with the `mediator`. The `mediator` is a global event emitter/listener in Force that is responsible for various event handling. Below is an example of how a modal might be triggered.

```js
mediator.trigger("open:auth", {
  mode: "signup",
  copy: "Sign up to receive alerts when new works are available by artists you follow.",
  signupIntent: "follow artist"
})
```

### URL Route
We can also go to `/login`, `/signup`, and `/forgot` directly to access authentication forms.

### Embed
Similar to the above, authentication forms can be embedded anywhere on the site. (TODO: Add Artist CTA example once implemented)

## Implementation
### Basics
We use [Formik](https://github.com/jaredpalmer/formik) to handle form entries and [Yup](https://github.com/jquense/yup) for form validation. Mobile uses the `Wizard` component to handle the multi-step flow. The form submission is handled in Force, and the authentication backend is handled in [artsy-passport](https://github.com/artsy/artsy-passport).

### Component Responsibilities
**Desktop**
- `ModalContainer` (Force): Listens for changes to Force's mediator and triggers opens to ModalManager. It is also responsible for setting Cookies like `destination` and `afterAuthAction`.
- [`ModalManager`](https://github.com/artsy/reaction/blob/master/src/Components/Authentication/Desktop/ModalManager.tsx) (Reaction): Manages the state of the modal (open/close).
- [`FormSwitcher`](https://github.com/artsy/reaction/blob/master/src/Components/Authentication/Desktop/FormSwitcher.tsx) (Reaction): Responsible for switching between form types.
- [`LoginForm`](https://github.com/artsy/reaction/blob/master/src/Components/Authentication/Desktop/LoginForm.tsx)/[`SignUpForm`](https://github.com/artsy/reaction/blob/master/src/Components/Authentication/Desktop/SignUpForm.tsx)/[`ResetPasswordForm`](https://github.com/artsy/reaction/blob/master/src/Components/Authentication/Desktop/ResetPasswordForm.tsx) (Reaction): The Formik forms for handling inputs.

- `AuthStatic` (Force): Wrapper for authentication via url route (desktop).

[Desktop Storybooks](https://artsy.github.io/reaction/?selectedKind=Components%2FAuthentication%2FDesktop&selectedStory=Login&full=0&addons=1&stories=1&panelRight=0&addonPanel=PeterPanen%2Fstorybook-addon-scissors%2Fpanel)

[**Mobile**](https://artsy.github.io/reaction/?selectedKind=Components%2FAuthentication%2FMobile&selectedStory=Login&full=0&addons=1&stories=1&panelRight=0&addonPanel=PeterPanen%2Fstorybook-addon-scissors%2Fpanel)
- `MobileAuthStatic` (Force): Wrapper for authentication via url route (mobile).
- [`FormSwitcher`](https://github.com/artsy/reaction/blob/master/src/Components/Authentication/Mobile/FormSwitcher.tsx) (Reaction): See above.
- [`LoginForm`](https://github.com/artsy/reaction/blob/master/src/Components/Authentication/Mobile/LoginForm.tsx)/[`SignUpForm`](https://github.com/artsy/reaction/blob/master/src/Components/Authentication/Mobile/SignUpForm.tsx)/[`ResetPasswordForm`](https://github.com/artsy/reaction/blob/master/src/Components/Authentication/Mobile/ResetPasswordForm.tsx)

[Mobile Storybooks](https://artsy.github.io/reaction/?selectedKind=Components%2FAuthentication%2FMobile&selectedStory=Login&full=0&addons=1&stories=1&panelRight=0&addonPanel=PeterPanen%2Fstorybook-addon-scissors%2Fpanel)

### Configuration
This `ModalOptions` interface is used to configure the modal's look and behavior. For example, `mode` determines which form type to display and `copy` changes the subtitle of the form. These properties are also used for analytics. [See the full list of options here.](https://github.com/artsy/reaction/blob/master/src/Components/Authentication/Types.ts#L34)

#### Query params vs `mediator`
There are two ways that options can be configured -- query params and via `mediator`.
The authentication modal (currently only Desktop) passes its options via `mediator`. For authentication that happens via a url route (mobile), we can pass query params into the url as options.

Example configuration with query params:
```
https://artsy.net/signup?redirectTo=foobar&intent=follow+artist
```

One caveat is Facebook/Twitter, or Social authentication. Since the user is redirected outside of Artsy, we need to pass query params to those places explicitly so that `artsy-passport` knows how to handle redirects (and other options) once a user is authenticated.

### Redirects
Redirects are slightly complicated because we want to provide the option for new users to go through onboarding, but in some instances we want to avoid onboarding entirely. Therefore, we have two options called `redirectTo` and `destination`.

`redirectTo`: This option is used to redirect a user after authentication and ignores all defaults. If a value is passed, the user will skip all default redirects and go to this link directly. **For signups, we use this field to skip onboarding.**
`destination`: This option is used to redirect a user after onboarding. Be default, this is the current location or path that the user first initiated authentication but in some cases, we want to point users elsewhere.

For signups, the default redirect is Onboarding (/personalize).
For logins, the default redirect is the path the user was on when authentication was initiated. Note that for url route-based authentication, we _must_ pass a destination since the current location will be an authentication path.

### Submission
Submission is handled by passing in a function to the `handleSubmit` prop in `ModalManager`. If no `handleSubmit` is passed, there is a default implementation in Reaction but this isn't ready for production. We currently override this in Force by passing in an implementation based on [`logged_out_user.coffee`](https://github.com/artsy/force/blob/master/src/desktop/models/logged_out_user.coffee)

### Analytics
TKTK
