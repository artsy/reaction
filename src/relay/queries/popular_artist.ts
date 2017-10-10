import * as Relay from 'react-relay';

class PopularArtistQueryConfig extends Relay.Route {
  public static queries = {
    artists: (component, params) => Relay.QL`
      query {
        ${component.getFragment("artists", params)}
      }
    `,
  }

  public static routeName = "PopularQueryConfig"
}

export default PopularArtistQueryConfig
