export interface ClaudeResponse {
  content: Array<{
    text: string;
    type: string;
  }>;
  [key: string]: any;
}

export async function callClaude(prompt: string): Promise<string> {
  try {
    const response = await fetch("http://localhost:3001/api/claude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          errorData.error ||
          `Error ${response.status}: ${response.statusText}`,
      );
    }

    const data: ClaudeResponse = await response.json();

    // Extract text from the first content block
    const textContent = data.content?.find((c) => c.type === "text")?.text;

    if (!textContent) {
      throw new Error("No text content received from Claude");
    }

    return textContent;
  } catch (error) {
    console.error("Failed to call Claude:", error);
    throw error;
  }
}

export async function analyzeProject(
  type: "full-audit" | "security" | "performance" | "refactor",
): Promise<string> {
  try {
    const response = await fetch("http://localhost:3001/api/claude/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          errorData.error ||
          `Error ${response.status}: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data.analysis;
  } catch (error) {
    console.error("Failed to analyze project:", error);
    throw error;
  }
}
