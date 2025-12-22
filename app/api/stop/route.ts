import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const response = await fetch('http://127.0.0.1:3000/stop', {
            method: 'POST',
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to stop' }, { status: response.status });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}