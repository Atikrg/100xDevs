import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const MESSAGES_FILE_PATH = path.join(process.cwd(), 'app/data/messages.json');

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const newMessage = {
            id: Date.now().toString(),
            name,
            email,
            message,
            date: new Date().toISOString(),
        };

        let messages = [];
        try {
            const data = await fs.readFile(MESSAGES_FILE_PATH, 'utf8');
            messages = JSON.parse(data);
        } catch (error) {
            // File doesn't exist or is empty, start fresh
            messages = [];
        }

        messages.push(newMessage);

        await fs.writeFile(MESSAGES_FILE_PATH, JSON.stringify(messages, null, 4), 'utf8');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
