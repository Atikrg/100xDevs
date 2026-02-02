import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'app/data/portfolio.json');

export async function GET() {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newData = await request.json();
        // Basic validation: check if it's a valid object
        if (!newData || typeof newData !== 'object') {
            return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
        }

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(newData, null, 4), 'utf8');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
