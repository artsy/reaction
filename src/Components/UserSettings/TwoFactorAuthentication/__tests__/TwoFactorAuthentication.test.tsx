import React from "react"
import { graphql } from "react-relay"

import { createTestEnv } from "DevTools/createTestEnv"

import { TwoFactorAuthenticationQueryResponse } from "__generated__/TwoFactorAuthenticationQuery.graphql"
import { createMockFetchQuery } from "DevTools"
import { TwoFactorAuthenticationFragmentContainer } from ".."
import {
  AppEnabledWithBackupCodesQueryResponse,
  BackupSecondFactors,
  BackupSecondFactorsMutationResponse,
} from "../Components/BackupSecondFactor/__tests__/fixtures"
import { TwoFactorAuthenticationTestPage } from "./Utils/TwoFactorAuthenticationTestPage"

jest.unmock("react-relay")
HTMLCanvasElement.prototype.getContext = jest.fn()

const setupTestEnv = () => {
  return createTestEnv({
    TestPage: TwoFactorAuthenticationTestPage,
    Component: (props: TwoFactorAuthenticationQueryResponse) => (
      <TwoFactorAuthenticationFragmentContainer {...props} />
    ),
    query: graphql`
      query TwoFactorAuthenticationTestQuery {
        me {
          ...TwoFactorAuthentication_me
        }
      }
    `,
    defaultMutationResults: {
      createBackupSecondFactors: {},
    },
    defaultData: {
      me: {
        hasSecondFactorEnabled: false,
        appSecondFactors: [],
        smsSecondFactors: [],
        backupSecondFactors: [],
      },
    },
  })
}

describe("TwoFactorAuthentication ", () => {
  it("shows current 2FA enrollment status", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    expect(page.text()).toContain("Two-factor Authentication")
    expect(page.text()).toContain("Set up")
  })

  describe("BackupSecondFactor", () => {
    it("prompts to setup if no codes are available", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      expect(page.backupSetupButton.exists).toBeTruthy
    })

    it("creates backup codes and displays codes in a modal", async done => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      expect(page.backupSetupButton.exists).toBeTruthy

      env.mutations.useResultsOnce(BackupSecondFactorsMutationResponse)
      env.mockQuery.mockImplementation(
        createMockFetchQuery({
          mockData: AppEnabledWithBackupCodesQueryResponse,
        })
      )

      await page.clickBackupSetupButton()

      setTimeout(() => {
        const modalText = page.backupModal.text()

        BackupSecondFactors.forEach(factor => {
          expect(modalText).toContain(factor.code)
        })

        done()
      })
    })

    it("shows current backup codes in a modal", async done => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: AppEnabledWithBackupCodesQueryResponse,
      })

      expect(page.find("BackupSecondFactor").text()).toContain("10 remaining")

      await page.clickBackupShowButton()

      setTimeout(() => {
        const modalText = page.backupModal.text()

        BackupSecondFactors.forEach(factor => {
          expect(modalText).toContain(factor.code)
        })

        done()
      })
    })

    it("regenerates backup codes and displays codes in a modal", async done => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: AppEnabledWithBackupCodesQueryResponse,
      })

      expect(page.backupRegenerateButton.exists).toBeTruthy

      env.mutations.useResultsOnce(BackupSecondFactorsMutationResponse)

      await page.clickBackupRegenerateButton()

      setTimeout(() => {
        const modalText = page.backupModal.text()

        BackupSecondFactors.forEach(factor => {
          expect(modalText).toContain(factor.code)
        })

        done()
      })
    })
  })
})
