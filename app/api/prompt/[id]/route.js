import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET request to fetch a prompt by ID
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");
        if (!prompt) {
            return new Response(JSON.stringify({ error: "Prompt Not Found" }), { status: 404 });
        }

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error("Error fetching prompt:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};

// PATCH request to update a prompt by ID
export const PATCH = async (request, { params }) => {
    try {
        const { prompt, tag } = await request.json();

        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response(JSON.stringify({ error: "Prompt not found" }), { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify({ message: "Successfully updated the prompt" }), { status: 200 });
    } catch (error) {
        console.error("Error updating prompt:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};

// DELETE request to delete a prompt by ID
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

        if (!deletedPrompt) {
            return new Response(JSON.stringify({ error: "Prompt not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Prompt deleted successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};