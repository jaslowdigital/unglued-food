import { containsLinksOrCode } from './reviewValidation';

// Test cases for validation
const testCases = [
  // Valid reviews (should return false - no links or code)
  { text: "This recipe is amazing! So delicious.", expected: false, description: "Normal review" },
  { text: "Great recipe, my family loved it", expected: false, description: "Simple review" },
  { text: "Perfect for dinner parties!", expected: false, description: "Exclamation review" },
  
  // Link patterns (should return true)
  { text: "Check out http://example.com for more recipes", expected: true, description: "http link" },
  { text: "Visit https://mysite.com", expected: true, description: "https link" },
  { text: "Go to www.example.com", expected: true, description: "www link" },
  { text: "Check example.com for more", expected: true, description: ".com domain" },
  { text: "Visit bit.ly/recipe", expected: true, description: "URL shortener" },
  
  // Code patterns (should return true)
  { text: "Use function() to make this", expected: true, description: "function declaration" },
  { text: "const myVar = 5", expected: true, description: "const declaration" },
  { text: "let x = 10", expected: true, description: "let declaration" },
  { text: "var oldStyle = true", expected: true, description: "var declaration" },
  { text: "Click <button>here</button>", expected: true, description: "HTML tags" },
  { text: "Use <script>alert('hi')</script>", expected: true, description: "Script tag" },
  { text: "The arrow => goes here", expected: false, description: "Arrow text (not code)" },
  { text: "const fn = () => { return true; }", expected: true, description: "Arrow function" },
  { text: "Use `backticks` for code", expected: true, description: "Backticks" },
  { text: "const obj = { key: value };", expected: true, description: "Code with semicolon" },
  { text: "import React from 'react'", expected: true, description: "Import statement" },
  
  // Edge cases
  { text: "", expected: false, description: "Empty string" },
  { text: "   ", expected: false, description: "Whitespace only" },
];

console.log("\n🧪 Testing Review Validation\n");
console.log("=".repeat(60));

let passed = 0;
let failed = 0;

testCases.forEach((test) => {
  const result = containsLinksOrCode(test.text);
  const status = result === test.expected ? "✅ PASS" : "❌ FAIL";
  
  if (result === test.expected) {
    passed++;
  } else {
    failed++;
  }
  
  console.log(`${status} - ${test.description}`);
  if (result !== test.expected) {
    console.log(`   Expected: ${test.expected}, Got: ${result}`);
    console.log(`   Text: "${test.text}"`);
  }
});

console.log("=".repeat(60));
console.log(`\nResults: ${passed} passed, ${failed} failed out of ${testCases.length} tests\n`);

if (failed === 0) {
  console.log("🎉 All tests passed!\n");
} else {
  console.log("⚠️  Some tests failed. Review the validation logic.\n");
  process.exit(1);
}
