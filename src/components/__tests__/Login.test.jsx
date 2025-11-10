
import { render } from "@testing-library/react"
import {describe, test} from "vitest"
import Login from "../Login.jsx"

describe("login component functionalities",()=>{
    test("renders login button", ()=>{
        render(<Login/>);
        
    })
})