import { Container } from "unstated"

interface OrderFormState {
  count: number
  done: string[]
}

export class State extends Container<OrderFormState> {
  state = {
    count: 0,
    done: [],
  }

  markDone(route) {
    const done = this.state.done.concat([route])

    this.setState({
      done,
    })
  }
}
