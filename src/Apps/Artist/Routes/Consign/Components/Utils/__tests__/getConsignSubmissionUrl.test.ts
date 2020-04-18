import { getConsignSubmissionUrl } from "../getConsignSubmissionUrl"

describe("getConsignSubmissionUrl", () => {
  it("encodes correct query parameters", () => {
    expect(
      getConsignSubmissionUrl({
        contextPath: "/foo/bar",
        subject: "baz",
      })
    ).toEqual("/consign/submission?contextPath=/foo/bar&subject=baz")
  })
})
