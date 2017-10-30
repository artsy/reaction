import Relay from 'react-relay';

class PopularArtistQueryConfig extends Relay.Route {
  public static queries = {
    popular_artists: (component, params) => Relay.QL`
      query {
        popular_artists {
          ${component.getFragment("popular_artists", params)}
        }
      }
    `,
  }

  public static routeName = "PopularQueryConfig"
}

export default PopularArtistQueryConfig
