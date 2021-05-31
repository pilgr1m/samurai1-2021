import React from "react"
import { create } from "react-test-renderer"
import ProfileStatus from "./ProfileStatus"

describe("ProfileStatus component", () => {
	test("status must be in the state", () => {
		const component = create(<ProfileStatus status="samurai" />)
		const testInstance = component.root
		expect(testInstance.props).toStrictEqual({ status: "samurai" })
	})
})
