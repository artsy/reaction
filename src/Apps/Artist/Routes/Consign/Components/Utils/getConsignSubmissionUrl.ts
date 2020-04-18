/**
 * Construct a url that encodes various tracking parameters needed to be sent to
 * segment from the force side of the app.
 */
export function getConsignSubmissionUrl(props: {
  contextPath: string
  subject: string
}) {
  return `/consign/submission?contextPath=${props.contextPath}/consign&subject=${props.subject}`
}
