import { Container } from "unstated"

interface State {
  isLoggedIn: boolean
}

export class ArtistAppState extends Container<State> {
  state = {
    isLoggedIn: false,
  }

  logIn() {
    this.setState({
      isLoggedIn: true,
    })
  }

  logOut() {
    this.setState({
      isLoggedIn: false,
    })
  }
}
