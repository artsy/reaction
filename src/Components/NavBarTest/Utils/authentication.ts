import { Mediator } from "Artsy/SystemContext"

export function login(mediator: Mediator) {
  mediator.trigger("open:auth", {
    mode: "login",
    intent: "login",
    signupIntent: "login",
    trigger: "click",
    contextModule: "Header",
    destination: window.location.href,
  })
}

export function logout(mediator: Mediator) {
  mediator.trigger("auth:logout")
}

export function signup(mediator: Mediator) {
  mediator.trigger("open:auth", {
    mode: "signup",
    intent: "signup",
    signupIntent: "signup",
    trigger: "click",
    contextModule: "Header",
    destination: window.location.href,
  })
}
