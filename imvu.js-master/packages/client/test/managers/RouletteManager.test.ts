// FIX: Import Jest global functions to resolve TypeScript errors.
import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import { Client } from '../../src';

const { IMVU_USERNAME, IMVU_PASSWORD } = process.env;

if (!IMVU_USERNAME || !IMVU_PASSWORD) {
	throw new Error('IMVU_USERNAME and IMVU_PASSWORD are required');
}

describe('RouletteManager.test.ts', () => {
	const client = new Client();

	beforeAll(() => client.login(IMVU_USERNAME, IMVU_PASSWORD, { socket: false }));
	afterAll(() => client.logout());

	it('should fetch the current roulette status', async () => {
		const roulette = client.account.roulette.status();

		await expect(roulette).resolves.toHaveProperty('next_available_datetime');
	});

	it('should spin the wheel if available', async () => {
		const roulette = await client.account.roulette.status();

		if (roulette.status === 'available') {
			await expect(client.account.roulette.spin()).resolves.toHaveProperty('status');
		} else {
			await expect(client.account.roulette.spin()).rejects.toThrow();
		}
	});
});