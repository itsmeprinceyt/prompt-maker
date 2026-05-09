import { NextRequest, NextResponse } from "next/server";
import { DOC_TYPES, getPromptByType, type DocType } from "@/lib/prompts";

/**
 * Generates a complete AI-ready documentation prompt from user-provided
 * source code and selected documentation template type.
 *
 * @async
 * @function POST
 * @description Handles incoming POST requests for documentation prompt generation.
 *              This API route validates the incoming code payload, determines the
 *              requested documentation generation mode, retrieves the matching
 *              system prompt template, and combines both into a final formatted
 *              prompt string for downstream AI processing.
 *
 * @param {NextRequest} request - Incoming Next.js request object containing JSON payload
 *
 * @body {string} code - Raw JavaScript/TypeScript source code to analyze and document
 * @body {DocType} [docType] - Optional documentation generation type/template selector
 *
 * @returns {Promise<NextResponse>} JSON response with generated prompt data
 *
 * @throws {400} Validation error - Missing or invalid code input
 * @throws {500} Server error - Failed to generate documentation prompt
 *
 * @description Workflow:
 *   1. Receive POST request from frontend/client
 *   2. Parse JSON request body asynchronously
 *   3. Extract source code and optional documentation type
 *   4. Validate that code input exists and is a valid string
 *   5. Determine selected documentation type or fallback to default JS docs mode
 *   6. Retrieve system prompt template using documentation type
 *   7. Combine system prompt with provided source code
 *   8. Return generated prompt payload to client
 *   9. Log internal errors if generation fails
 *   10. Return appropriate error response on failure
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, docType } = body as { code: string; docType?: DocType };

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Code input is required" },
        { status: 400 }
      );
    }

    const selectedDocType = docType || DOC_TYPES.JS_DOCS;

    const systemPrompt = getPromptByType(selectedDocType);

    const combinedPrompt = `${systemPrompt}\n\nBelow is the code:\n\n${code}`;

    return NextResponse.json({
      prompt: combinedPrompt,
      docType: selectedDocType,
      success: true,
    });
  } catch (error) {
    console.error("Error generating documentation:", error);
    return NextResponse.json(
      { error: "Failed to generate documentation" },
      { status: 500 }
    );
  }
}
