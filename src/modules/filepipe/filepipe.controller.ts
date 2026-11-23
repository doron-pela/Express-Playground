import type { Request, Response } from 'express';

import filepipeService from './filepipe.service';

function escapeHtml(value: string): string {
    const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };
    return value.replace(/[&<>"']/g, (character) => entities[character]!);
}

async function getFilepipe(_req: Request, res: Response): Promise<void> {
    const contents = await filepipeService.writeAndReadFile();
    res.type('html').send(`<h1>${escapeHtml(contents)}</h1>`);
}

export default { getFilepipe };
