/// <reference types="vitest" />

import { expect } from "vitest"
import { sum } from "../sum"


test("function should calculate sum of two function",()=>{
    
    const result = sum(3,6);

    expect(result).toBe(9)
})