import { metaphysics } from "Utils/metaphysics"
import { checkEmail } from "../helpers"

jest.mock("Utils/metaphysics", () => ({
  metaphysics: jest.fn(),
}))

describe("Authentication Helpers", () => {
  describe("checkEmail", () => {
    it("return true if it should exist and it does exist", done => {
      ;(metaphysics as any).mockImplementationOnce(() =>
        Promise.resolve({
          data: { user: { userAlreadyExists: true } },
        })
      )
      checkEmail({
        values: {
          email: "kana@lalamail.com",
        },
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        shouldExist: true,
      }).then(result => {
        expect(result).toBeTruthy()
        done()
      })
    })

    it("return false if it should exist and it doesnt exist", done => {
      ;(metaphysics as any).mockImplementationOnce(() =>
        Promise.resolve({
          data: { user: { userAlreadyExists: false } },
        })
      )
      checkEmail({
        values: {
          email: "kana@lalamail.com",
        },
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        shouldExist: true,
      }).then(result => {
        expect(result).toBeFalsy()
        done()
      })
    })

    it("return true if it shouldnt exist and it doesnt exist", done => {
      ;(metaphysics as any).mockImplementationOnce(() =>
        Promise.resolve({
          data: { user: { userAlreadyExists: false } },
        })
      )
      checkEmail({
        values: {
          email: "kana@lalamail.com",
        },
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        shouldExist: false,
      }).then(result => {
        expect(result).toBeTruthy()
        done()
      })
    })

    it("return false if it shouldnt exist and it does exist", done => {
      ;(metaphysics as any).mockImplementationOnce(() =>
        Promise.resolve({
          data: { user: { userAlreadyExists: true } },
        })
      )
      checkEmail({
        values: {
          email: "kana@lalamail.com",
        },
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        shouldExist: false,
      }).then(result => {
        expect(result).toBeFalsy()
        done()
      })
    })
  })
})
